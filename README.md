## dota2-api-wrapper
NodeJS Wrapper for the OpenDota API for Dota2 written in ES6<br>
https://docs.opendota.com/#

## Usage
If you want more than 50.000 free calls every motnh and 60/requests per minute, then you can grab an api key [from here](https://www.opendota.com/api-keys).

From terminal:
`npm install --save dota2-api-wrapper`
In source file:
```js
const dotaWebApi = require('dota2-api-wrapper');
const api = new dotaWebApi();
```

# Responses
Every request you make to the API will return a promise, which you need to take care off.

# Documentation

Documentation can be found [here](https://docs.magnusjensen.dk/dota-wrapper/DotaApi);