# dartboard
An anonymous social app. This is the code for the server and front-end. (API endpoints found elsewhere)

You're gonna need to use ```npm``` to get all of the dependencies. Just run
 ```npm install``` in the root directory to do this.

To actually start it up, run:

``` npm run start ```

To save any changes (to SCSS/JS/Node), run:

``` npm run build ```

To watch for changes and build automatically, run:

 ```npm run watch``` (this also starts up the server)

It requires a mongodb URI. This settings can be configured in ```src/server/config.js```.

It's setup to run on ```port:8080```. This can also be modified ```in src/server/config.js```.
