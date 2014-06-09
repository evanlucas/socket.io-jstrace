var server = require('http').Server()
  , io = require('socket.io')(server)
  , siotrace = require('./')
  , client = require('socket.io/node_modules/socket.io-client')
  , should = require('should')

var probes = [ 'socket.io:connection:start'
             , 'socket.io:connection:end']

var found = {
  '/': { start: false, end: false }
, '/chat': { start: false, end: false }
}

describe('socket.io-jstrace', function() {
  before(function(done) {
    io.use(siotrace({
      trace: function trace(event, obj) {
        if (~probes.indexOf(event)) {
          if (event === probes[0]) {
            found['/'].start = true
          } else {
            found['/'].end = true
          }
          obj.should.have.property('id')
          obj.should.have.property('nsp', '/')
        }
      }
    }))

    io.of('/chat').use(siotrace({
      trace: function trace(event, obj) {
        if (~probes.indexOf(event)) {
          if (event === probes[0]) {
            found['/chat'].start = true
          } else {
            found['/chat'].end = true
          }
          obj.should.have.property('id')
          obj.should.have.property('nsp', '/chat')
        }
      }
    }))

    server.listen(function() {
      this.port = server.address().port
      done()
    }.bind(this))
  })

  it('should expose socket.io:connection:{start|end} probes', function(done) {
    var port = this.port
    io.of('/').once('connection', function(socket) {
      var already = false
      socket.on('disconnect', function() {
        found['/'].start.should.be.true
        found['/'].end.should.be.true
        if (already) return
        already = true
        done()
      })
      socket.on('hahaha', function() {
        socket.emit('blah')
      })
    })

    var ioc = client.connect('http://localhost:'+port, {
      reconnection: false
    })
    ioc.on('connect', function() {
      ioc.emit('hahaha')
    })

    ioc.on('blah', function() {
      setTimeout(function() {
        ioc.disconnect()
      }, 300)
    })
  })

  it('should work with namespaces', function(done) {
    var port = this.port
    io.of('/chat').on('connection', function(socket) {
      socket.on('disconnect', function() {
        found['/chat'].start.should.be.true
        found['/chat'].end.should.be.true
        done()
      })
      socket.on('hahaha', function() {
        socket.emit('blah')
      })
    })

    var ioc = client.connect('http://localhost:'+port+'/chat', {
      reconnection: false
    })
    ioc.on('connect', function() {
      ioc.emit('hahaha')
    })

    ioc.on('blah', function() {
      setTimeout(function() {
        ioc.disconnect()
      }, 300)
    })
  })

  it('should throw error if no opts are passed', function() {
    (function() {
      siotrace()
    }).should.throw('opts required')
  })

  it('should throw error if opts.trace is not passed', function() {
    (function() {
      siotrace({})
    }).should.throw(
      'opts.trace is required and should be an instance of jstrace'
    )
  })
})
