UID=rat

run:
	node main.js

# Run the server forever, listening for file changes and restarting accordingly
forever:
	forever start -o rat.log --uid=$(UID) --append -w main.js

stop:
	forever stop $(UID)

log:
	tail -fn 500 /home/dustin/.forever/$(UID).log