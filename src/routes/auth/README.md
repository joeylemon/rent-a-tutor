# User Authentication

The chosen design for rent-a-tutor authorization follows a JWT (JSON Web Token) pattern. This readme will explore how and why this scheme will work on the frontend.

- [Keeping Users Authenticated](#maintain-auth)
- [Example Implementation](#example)
- [Design Choice Rationale](#why)
- [How JWTs Work](#jwt)

<a id="maintain-auth"></a>
## Keeping Users Authenticated

Upon first logging in with `/auth/login`, you will receieve a JSON blob containing the following:
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRAdC5jb20iLCJpYXQiOjE2MTM0OTMwMDQsImV4cCI6MTYxMzQ5MzYwNH0.9FipAfM9IGJXE9j1BtwUrtdmkBHSXrpbQjx3PTwJXYw",
    "expiration": 1613493604977
}
```

The API token is used in all other requests to the API by putting it in the `Authorization` header. The token should be stored locally on the user's device to prevent logging in every time the application is opened. All API tokens expire 30 days after they are issued.

<a id="example"></a>
## Example Implementation

A good implementation would dedicate an API class to making calls to the rent-a-tutor endpoints. Therefore, you can abstract away the authentication process entirely and focus on the logic.

For example:
```js
class Auth {
  login(email, pass) {
    const token = await request.post("/auth/refresh").withParameters({email: email, password: pass})
    permanentStorage.set("token", token)
  }
  
  isTokenInvalid() {
    return !permanentStorage.get("token") || permanentStorage.get("token").expiration
  }
  
  post(endpointURL, parameters) {
    if (isTokenInvalid())
      return app.goToLoginPage()
      
    return request.post(endpointURL).withAuthorizationHeader(currentAPIToken.token).withParameters(parameters)
  }
}

class API {
  getCurrentUserProfile() {
    return Auth.post("https://jlemon.org/rat/api/v1/user/profile/me", {})
  }
  
  getUserProfile(id) {
    return Auth.post(`https://jlemon.org/rat/api/v1/user/profile/${id}`, {})
  }
}
```

<a id="why"></a>
## Why This Design Choice?

JSON Web Tokens have several benefits compared to other authentication schemes:
- We can authorize the user by storing a credential on their device without actually storing their email and password.
- They maintain a stateless REST API since the tokens contain all the information required to authenticate.
- They use JSON, which means easy encoding and decoding within Node.js


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
