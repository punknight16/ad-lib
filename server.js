var http = require('http');
var parse = require('url').parse;
var entries = [];

var server = http.createServer(function(req, res){
	switch(req.method){
    case 'POST':
      if('/createOne'==parse(req.url).pathname){
        var item = '';
        req.setEncoding('utf8');
        req.on('data', function(chunk){
          item+=chunk;
        });
        req.on('end', function(){
          entries.push(item);
          show(req, res);  
        })
      } else {
        error(req, res);
      }
      break;
    case 'GET':
      show(req, res);
      break;
    default:
      error(req, res);
  }
}).listen(process.env.PORT || 3000);

function error(req, res){
  res.end('error');
}
function show(req, res){
  res.end(JSON.stringify(entries));
}

//Tests
if (require.main.filename == '/usr/local/lib/node_modules/mocha/bin/_mocha') {
  var assert = require('assert');
  describe('server', function(){
  	it('should return entries_arr with entry1', function(done){
  		var req = { 
        method: 'POST',
        url: '/createOne',
        setEncoding: function(){},
        on: function(event, cb){
          if(event=='data'){
            return cb('entry1');  // this is the post data
          } else {
            return cb();
          }
        }
      };
  		var res = { 
    		end: function(entries){ 
          //console.log(entries);
          console.log(entries)
    			assert(entries=='["entry1"]');
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