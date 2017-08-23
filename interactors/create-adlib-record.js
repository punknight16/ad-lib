function createAdlibRecord(adlib_data, args, fn){
	var template_id = args.template_id;
	var indicator_values = args.indicator_values;

	var last_id = adlib_data.length-1;
  var adlib_id = adlib_data[last_id].id+1;
  var adlib_record = {id: adlib_id, indicator_values: indicator_values, template_ids: [template_id]};
 	fn(null, adlib_record);
}

module.exports = createAdlibRecord;

if (require.main.filename == '/usr/local/lib/node_modules/mocha/bin/_mocha') {
  //Tests
  var assert = require('assert');
  describe('createTemplate', function(){
  	var adlib_data = [
    	{id: 0, indicator_values: {person_you_know: 'Jon', noun1: 'fox', adjective: 'lazy', noun2: 'horseraddish'}},
    	{id: 1, indicator_values: {person_you_know: 'Ben', noun1: 'cat', adjective: 'squishy', noun2: 'pig'}},
    	{id: 2, indicator_values: {person_you_know: 'Erin', noun1: 'mouse', adjective: 'travelling', noun2: 'thumbtack'}}
  	];
  	var args = {
  		template_id: 0,
  		indicator_values: {noun1: 'ball', adjective: 'crazy', noun2: 'ice cream cone', person_you_know: 'Harry'}
  	}; 
  	it('should create an adlib_record', function(done){
  		createAdlibRecord(adlib_data, args, function(err, adlib_record){
  			if(err) throw err;
  			console.log('adlib_record: ', adlib_record);
  			assert(adlib_record!=null);
  			done();	
  		});
  	});
  });
}