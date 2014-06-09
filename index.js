var assert = require('assert')

module.exports = function(opts) {
  assert(opts, 'opts required')
  assert(opts.trace,
    'opts.trace is required and should be an instance of jstrace')
  var trace = opts.trace

  return function(socket, next) {
    var nsp = socket.nsp
      ? socket.nsp.name || '/'
      : '/'
      , id = socket.id
    trace('socket.io:connection:start', {
      id: id
    , nsp: nsp
    })

    socket.on('disconnect', function() {
      trace('socket.io:connection:end', {
        id: id
      , nsp: nsp
      })
    })

    next()
  }
}
