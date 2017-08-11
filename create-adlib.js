function createAdlib(data, args, fn){
	var templates = data.templates;
	
	var adjective = args.adjective;
	var noun1 = args.noun1;
	var noun2 = args.noun2;
	var person_you_know = args.person_you_know;
	
	
	var template_arr_pos = Math.floor(Math.random() * templates.length);
	var adlib = templates[template_arr_pos].adlib(adjective, noun1, noun2, person_you_know);
	return fn(null, adlib);
}




module.exports = createAdlib;

if (require.main.filename == '/usr/local/lib/node_modules/mocha/bin/_mocha') {
  //Tests
  var assert = require('assert');
  describe('createAdlib', function(){
  	data = {};
  	args = {
  		adjective: 'colorful',
  		noun1: 'coffee',
  		noun2: 'baseball',
  		person_you_know: 'Angela'
  	};

  	it('should create a random adlib', function(done){
  		createAdlib(data, args, function(err, adlib){
  			if(err) throw err;
  			console.log(adlib);
  			assert(adlib!==null);
  			done();	
  		});
  	});
  });
 }