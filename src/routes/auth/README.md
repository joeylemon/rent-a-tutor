# User Authentication

The chosen design for rent-a-tutor authorization follows a JWT (JSON Web Token) pattern. This readme will explore how and why this scheme will work on the frontend..

- [Keeping Users Authenticated](#maintain-auth)
- [Example Implementation](#example)
- [Design Choice Rationale](#why)
- [How JWTs Work](#jwt)

<a id="maintain-auth"></a>
## Keeping Users Authenticated

Upon first logging in with `/auth/login`, you will receieve a JSON blob containing the following:
```json
{
    "api": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRAdC5jb20iLCJpYXQiOjE2MTM0OTMwMDQsImV4cCI6MTYxMzQ5MzYwNH0.9FipAfM9IGJXE9j1BtwUrtdmkBHSXrpbQjx3PTwJXYw",
        "expiration": 1613493604977
    },
    "refresh": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRAdC5jb20iLCJpYXQiOjE2MTM0OTMwMDQsImV4cCI6MTYxNjA4NTAwNH0.3q_9vMuX2mZU-LfAVBvKmzUZ66PhMz5JwWX9GjapEpE",
        "expiration": 1616085004976
    }
}
```

The API token is used in all other requests to the API by putting it in the `Authorization` header. However, API tokens expire in 5 minutes after they are issued.

Therefore, we must use the refresh token to acquire a new API token every 5 minutes through the `/auth/refresh` endpoint. The refresh token expires in 30 days after it is issued.

<a id="example"></a>
## Example Implementation

A good implementation would dedicate an API class to making calls to the rent-a-tutor endpoints. Therefore, you can abstract away the authentication process entirely and focus on the logic.

For example:
```js
class API {
  // valid token looks like {"token": "eyJhbGciOiJIUzI.eyJlbWFpbCI6InRlc3RAdGVz._X_oyzQ9Lz-MedQeXUX7LdF", "expiration": 1600809341558}
  currentAPIToken = undefined
  
  getRefreshToken() {
    return permanentStorage.get("refresh_token")
  }
  
  isTokenExpired() {
    return !currentAPIToken || currentAPIToken.expired
  }
  
  refreshAPIToken() {
    currentAPIToken = request.post("/auth/refresh").withParameter({refresh_token: this.getRefreshToken()})
  }
  
  sendPostRequest(endpointURL, parameters) {
    // automatically refresh the api token before the post request
    if (isTokenExpired())
      refreshAPIToken()
      
    request.post(endpointURL).withAuthorizationHeader(currentAPIToken.token).withParameters(parameters)
  }
}
```

Now, elsewhere in the application, we can simply focus on the logic:

```js
function getProfile() {
  const profile = API.sendPostRequest(ENDPOINTS["profile"])
  /// ... perform actions with the profile
}
```

<a id="why"></a>
## Why This Design Choice?

JSON Web Tokens have several benefits compared to other authentication schemes:
- We can authorize the user by storing a credential on their device without actually storing their email and password.
- They maintain a stateless REST API since the tokens contain all the information required to authenticate.
- They use JSON, which means easy encoding and decoding within Node.js

We use a combination of API and refresh tokens because:
- API tokens should be stored in memory, not storage. Therefore, we place the refresh token in storage instead so we can grab a new API token upon closing the app.
- If an API token is leaked (via XSS attacks or similar), it will expire in 5 minutes and keep the attack window short. Constantly refreshing API tokens keeps attackers on their feet.


<a id="jwt"></a>
## How do JSON Web Tokens (JWT) Work?

JWTs follow the same pattern:

```
xxxxxxx.yyyyyyy.zzzzzzz
```

An example JWT from the rent-a-tutor /auth/login endpoint could look like:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRAdC5jb20iLCJpYXQiOjE2MTM0OTMwMDQsImV4cCI6MTYxMzQ5MzYwNH0.9FipAfM9IGJXE9j1BtwUrtdmkBHSXrpbQjx3PTwJXYw
```

### Header
`xxxxxxx` is the header of the JWT. It is a base64 encoded json blob containing information about the JWT. For example, if we base64 decode the above API token, we can see:

```js
atob("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9")
// returns
{
  "alg": "HS256",
  "typ": "JWT"
}
```

The algorithm `HS256` is used to sign the JWT using a secret key stored on the rent-a-tutor server. Therefore, we can verify JWTs by following the algorithm described within them.

### Payload
`yyyyyyy` is the payload of the JWT. It is also a base64 encoded json blob containing claims about the user. For example, the above API token's payload looks like:

```js
atob("eyJlbWFpbCI6InRAdC5jb20iLCJpYXQiOjE2MTM0OTMwMDQsImV4cCI6MTYxMzQ5MzYwNH0")
// returns
{
  "email": "t@t.com",
  "iat":1613493004,
  "exp":1613493604
}
```

The payloads of our tokens contain the user's email, the time at which the token was issued `iat`, and the time at which the token expires `exp`.

### Signature

`zzzzzzz` is the signature of the JWT. It is the signed combination of the header and the payload, using the algorithm defined in the header. This signature allows us to verify the user is actually the user.
For example, to create the signature, it would look like so:

```js
signature = HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```

Therefore, to finally create the entire token, we simply concatenate all three parts (header, payload, and signature):

```js
jwt = header + "." + payload + "." + signature
```
