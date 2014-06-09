# socket.io-jstrace

jstrace middleware for socket.io

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
- `socket.io:connection:end` socket disconnected
