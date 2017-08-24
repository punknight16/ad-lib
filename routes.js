var path = require('path');
var fs = require('fs');
var data = require('./app_data.json');
/*
var data = {
  template_data: [
    {id: 0, template_string: " watched on as the quick, brown  jumped over the  .", indicator_positions: {noun1: 50, adjective: 49, noun2: 32, person_you_know: 0 }},
    {id: 1, template_string: " won the  contest by balancing a  on a .", indicator_positions: {noun2: 39, noun1: 33,  adjective: 9, person_you_know: 0}},
    {id: 2, template_string: " created a  by squeezing a   fiercly.", indicator_positions: {noun2: 28, adjective: 27, noun1: 11, person_you_know: 0}},
  ],
  adlib_data: [
    {id: 0, indicator_values: {person_you_know: 'Jon', noun1: 'fox', adjective: 'lazy', noun2: 'horseraddish'}, template_ids: [0, 2, 1]},
    {id: 1, indicator_values: {person_you_know: 'Ben', noun1: 'cat', adjective: 'squishy', noun2: 'pig'}, template_ids: [0, 1, 2]},
    {id: 2, indicator_values: {person_you_know: 'Erin', noun1: 'mouse', adjective: 'travelling', noun2: 'thumbtack'}, template_ids: [1, 2, 0]}
  ]
}
*/
createTemplateRecord = require('./interactors/create-template-record');
createAdlibRecord = require('./interactors/create-adlib-record');
interpretAdlibRecord = require('./interactors/interpret-adlib-record');

const routes = {
  entry: function(req, res, next){
    res.sendFile(path.join(__dirname+'/pages/index.html'));
  },
	intake: function(req, res, next){
  	res.sendFile(path.join(__dirname+'/pages/adlib-intake.html'));
  },
  story: function(req, res, next){
    res.sendFile(path.join(__dirname+'/pages/adlib-story.html'));
  },
	viewOne: function(req, res, next){
    
    var found_record = data.adlib_data.find(adlib => adlib.id==req.params.id);
		interpretAdlibRecord(data.template_data, found_record, function(err, adlib_story){
      res.json(adlib_story);
    });
    /*
    var test_data = [
      {id: 0, string: 'John watched on as the quick, brown fox jumped over the lazy dog.'},
      {id: 1, string: 'He couldn’t help but wonder at the brashness of the fox. Why did the dog ignore the fox?'},
      {id: 2, string: 'For the rest of the afternoon, John played with the lazy dog.'}
    ];
    res.json(test_data);
    */
    
	},
	viewAll: function(req, res, next){
    res.json(data.adlibs);
	},
	createOne: function(req, res, next){
    var template_string = req.body.template_string;
    var indicator_positions = JSON.parse(req.body.indicator_positions);
    var indicator_values = JSON.parse(req.body.indicator_values);
    var template_data = data.template_data;
    var adlib_data = data.adlib_data;

    var args = {
      template_string: template_string,
      indicator_positions: indicator_positions,
      indicator_values: indicator_values
    };
    
    createTemplateRecord(template_data, args, function(err, template_record){
      data.template_data.push(template_record);
      args.template_id = template_record.id;
      createAdlibRecord(adlib_data, args, function(err, adlib_record){
        adlib_record.template_ids.push(Math.floor(Math.random() * template_data.length));
        adlib_record.template_ids.push(Math.floor(Math.random() * template_data.length));
        data.adlib_data.push(adlib_record);
        interpretAdlibRecord(template_data, adlib_record, function(err, adlib_story){
          //res.json(adlib_story);
          
          fs.writeFile( "app_data.json", JSON.stringify( data ), "utf8", function(err){
            if(err) throw err;
            console.log('saved');
            res.redirect('/story/'+adlib_record.id);  
          });

          
        });
      });
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
  /*
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
  */
  describe('viewOne route', function(){
    it('should show the viewOne page', function(done){
      var req = {
      	params: {id: 0}
      };
      var res = { 
          json: function(arr){
            assert(arr.length==3);
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

  /*
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
  */
  describe('createOne route', function(){
    it('should process the createOne and redirect to the viewOne', function(done){
      var req = {
      	body: {
          template_string: " went  shopping, but was interrupted by a  .",
          indicator_positions: {noun1: 43, adjective: 42, noun2: 6, person_you_know: 0},
          indicator_values: {noun1: 'ball', adjective: 'crazy', noun2: 'ice cream cone', person_you_know: 'Harry'}
        }
      };
      var res = { 
        json: function(arr){
          assert(arr.length==3);
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
  /*
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
*/
}