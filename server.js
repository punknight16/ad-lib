var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes');
var app = express();

app
  .use(bodyParser.json())
  .get('/', routes.entry)
  .get('/viewOne/:id', routes.viewOne)
  .get('/viewAll', routes.viewAll)
  .post('/createOne', routes.createOne)
  .post('/editOne/:id', routes.editOne)
  .get('/destroyOne/:id', routes.destroyOne)
  .use(error)
  .listen(3000)


function error(req, res){
  //console.log(req);
  res.end('error');
}

//Tests
if (require.main.filename == '/usr/local/lib/node_modules/mocha/bin/_mocha') {
  var assert = require('assert');
  describe('server', function(){
  	it('should return all of the .use functions, in this case error', function(done){
  		var req = { 
        method: 'POST',
        url: '/'
      };
  		var res = { 
    		end: function(string){

          //console.log('string', string);
          assert(true);
    			done();
    		},
        setHeader: function(){

        }
    	};
  		//test starts here
      
      app(req, res);
  	});
  });
}