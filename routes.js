var data = require('./data');
var createAdlib = require('./create-adlib');

const routes = {
	entry: function(req, res, next){
  	res.end('entry');
	},
	viewOne: function(req, res, next){
    //var adlib_arr_position = data.adlibs.findIndex(adlib => adlib.id==req.params.id);
		//res.json(data.adlibs[adlib_arr_position]);
    var test_data = [
      {id: 0, string: 'John watched on as the quick, brown fox jumped over the lazy dog.'},
      {id: 1, string: 'He couldn’t help but wonder at the brashness of the fox. Why did the dog ignore the fox?'},
      {id: 2, string: 'For the rest of the afternoon, John played with the lazy dog.'}
    ];
    res.json(test_data);
	},
	viewAll: function(req, res, next){
    res.json(data.adlibs);
	},
	createOne: function(req, res, next){
    //curl 'http://localhost:3000/createOne' -d '{"adjective":"cool", "noun1": "bottle", "noun2": "blanket", "person_you_know": "Justin"}' -H "Content-Type: application/json"
    var adlib_id = data.adlibs[data.adlibs.length-1].id+1;
    createAdlib(data, req.body, function(err, adlib){
      var record = {id: adlib_id, string: adlib};
      data.adlibs.push(record);
      res.redirect('/adlib-story.html');
    });
	},
	editOne: function(req, res, next){
    var adlib_arr_position = data.adlibs.findIndex(adlib => adlib.id==req.params.id);
		data.adlibs[adlib_arr_position] = {id: req.params.id, string: req.body["ad-lib"]};
		res.redirect('/viewOne/'+req.params.id);
	},
	destroyOne: function(req, res, next){
		var adlib_arr_position = data.adlibs.findIndex(adlib => adlib.id==req.params.id);
    if (adlib_arr_position > -1) {
    	data.adlibs.splice(adlib_arr_position, 1);
		}
		res.redirect('/viewAll');
	}
}

module.exports = routes;

if (require.main.filename == '/usr/local/lib/node_modules/mocha/bin/_mocha') {
  //Tests
  var assert = require('assert');
  describe('entry route', function(){
    it('should show the entry', function(done){
      var req = {};
      var res = { 
          end: function(string){
            //console.log(JSON.stringify(obj));
            assert(string=='entry');
            done();
          }
      };
      routes.entry(req, res, function(err){
        //assert==true works because of JSON function
        assert(false);
        done();
      });
    })
  });

  describe('viewOne route', function(){
    it('should show the viewOne page', function(done){
      var req = {
      	params: {id: 0}
      };
      var res = { 
          json: function(obj){
            assert(obj.id==0);
            assert(obj.string=='The quick sly fox jumped over the lazy dog');
            done();
          }
      };
      routes.viewOne(req, res, function(err){
        //assert==true works because of JSON function
        assert(false);
        done();
      });
    })
  });


  describe('viewAll route', function(){
    it('should show the viewOne page', function(done){
      var req = {};
      var res = { 
          json: function(arr){
          	//console.log(JSON.stringify(arr));
            assert(arr.length==1);
            done();
          }
      };
      routes.viewAll(req, res, function(err){
        //assert==true works because of JSON function
        assert(false);
        done();
      });
    })
  });

  describe('createOne route', function(){
    it('should process the createOne and redirect to the viewOne', function(done){
      var req = {
      	body: {adlib: 'A rat in the house may eat the ice cream'}
      };
      var res = { 
        json: function(arr){
          assert(arr.length==2);
          done();
        }
      };
      routes.createOne(req, res, function(err){
        //assert==true works because of JSON function
        assert(false);
        done();
      });
    })
  });

  describe('editOne route', function(){
    it('should process the editOne and redirect to the viewOne', function(done){
      var req = {
      	params: {id: 0},
      	body: {adlib: 'The quick sly fox jumped over the lazy doggo'}
      };
      var res = { 
        json: function(obj){
          assert(obj.id==0);
          assert(obj.string=='The quick sly fox jumped over the lazy doggo');
          done();
        }
      };
      routes.editOne(req, res, function(err){
        //assert==true works because of JSON function
        assert(false);
        done();
      });
    })
  });

  describe('destroyOne route', function(){
    it('should process the destroyOne and redirect to the viewAll', function(done){
      var req = {
      	params: {id: 0},
      };
      var res = { 
        json: function(arr){
          //console.log(JSON.stringify(arr));
          assert(arr.length==1);
          done();
        }
      };
      routes.destroyOne(req, res, function(err){
        //assert==true works because of JSON function
        assert(false);
        done();
      });
    })
  });

  describe('integration test', function(){
  	it('should create an adlib, edit the adlib, destroy the adlib', function(done){
  		assert(true);
  		done();	
  	})
  });
}