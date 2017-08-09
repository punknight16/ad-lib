var http = require('http');

var server = http.createServer(function(req, res){
	res.end('hello world');
}).listen(process.env.PORT || 3000);


//Tests
if (require.main.filename == '/usr/local/lib/node_modules/mocha/bin/_mocha') {
  var assert = require('assert');
  describe('server', function(){
  	it('should return hello world', function(done){
  		var req = {};
  		var res = { 
    		end: function(string){ 
    			assert(string=='hello world');
    			done();
    		}
    	};
  		//console.log(server._events.request.toString());
  		server._events.request(req, res);
  		assert(false);
  		done()
  	});
  });
}