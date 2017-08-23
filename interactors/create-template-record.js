function createTemplateRecord(template_data, args, fn){
	var template_string = args.template_string;
	var indicator_positions = args.indicator_positions;

	var last_id = template_data.length-1;
  var template_id = template_data[last_id].id+1;
  var template_record = {id: template_id, template_string: template_string, indicator_positions: indicator_positions};
 	fn(null, template_record);
}

module.exports = createTemplateRecord;

if (require.main.filename == '/usr/local/lib/node_modules/mocha/bin/_mocha') {
  //Tests
  var assert = require('assert');
  describe('createTemplate', function(){
  	var template_data = [
    	{id: 0, str: " went  shopping, but was interrupted by a  .", indicator_positions: {person_you_know: 0, noun2: 6, adjective: 42, noun1: 43}},
    	{id: 1, str: " won the contest by balancing a  on a .", indicator_positions: {person_you_know: 0, adjective: 9,  noun1: 33, noun2: 39}},
    	{id: 2, str: " created a  by squeezing a   fiercly.", indicator_positions: {person_you_know: 0, noun1: 11, adjective: 27, noun2: 28}},
  	];
  	var args = {
  		template_string: " went  shopping, but was interrupted by a  .",
  		indicator_positions: {noun1: 43, adjective: 42, noun2: 6, person_you_know: 0}
  	}; 
  	it('should create a template', function(done){
  		createTemplateRecord(template_data, args, function(err, template_record){
  			if(err) throw err;
  			console.log('template_record: ', template_record);
  			assert(template_record!=null);
  			done();	
  		});
  	});
  });
}