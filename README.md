# socket.io-jstrace

jstrace middleware for socket.io

[![build status](https://circleci.com/gh/evanlucas/socket.io-jstrace.png?circle-token=bde54886a8d80959ef6394d3caa14bcf66e4f124)](https://circleci.com/gh/evanlucas/socket.io-jstrace)

## Install

```bash
$ npm install --save socket.io-jstrace
```

## Usage

```js
var io = require('socket.io')()
  , trace = require('jstrace')
  , siotrace = require('socket.io-jstrace')
  
io.use(siotrace({
  trace: trace
}))

io.on('connection', function(socket) {
    
})
```

## Probes

- `socket.io:connection:start` socket connected
  - `nsp` the namespace
  - `id` the socket id
- `socket.io:connection:end` socket disconnected
  - `nsp` the namespace
  - `id` the socket id

## Tests

```bash
$ npm test
```

## Coverage

```bash
$ npm run cover
```

## License

MIT
