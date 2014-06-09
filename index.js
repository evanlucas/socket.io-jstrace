var assert = require('assert')

module.exports = function(opts) {
  assert(opts, 'settings required')
  assert(opts.trace, '.trace function required')
  var trace = opts.trace

  return function(socket, next) {
    var nsp = socket.nsp || '/'
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
