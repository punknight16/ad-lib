function interpretAdlibRecord(template_data, adlib_record, fn){

  var adlib_story = adlib_record.template_ids.map(function(template_id, template_id_index){
    var found_record = template_data.find(template_record => template_record.id==template_id);
    var string = found_record.template_string;
    var indicator_positions = found_record.indicator_positions;
    Object.keys(indicator_positions).map(function(indicatorkey, indicatorindex){
      string = string.slice(0, indicator_positions[indicatorkey]) + adlib_record.indicator_values[indicatorkey] + string.slice(indicator_positions[indicatorkey], string.length);
    });
    return {id: found_record.id, string: string}
  });
  return fn(null, adlib_story);
}

module.exports = interpretAdlibRecord;

if (require.main.filename == '/usr/local/lib/node_modules/mocha/bin/_mocha') {
  //Tests
  var assert = require('assert');
  describe('interpretAdlibRecord', function(){
  	var template_data = [
      {
        id: 0,
        template_string: " went  shopping, but was interrupted by a  .",
        indicator_positions: {noun1: 43, adjective: 42, noun2: 6, person_you_know: 0}
      }
    ];
    var adlib_record = {id: 0, indicator_values: {person_you_know: 'Jon', noun1: 'fox', adjective: 'lazy', noun2: 'horseraddish'}, template_ids: [0]};
  	it('should create an adlib_record', function(done){
  		interpretAdlibRecord(template_data, adlib_record, function(err, adlibs_arr){
  			if(err) throw err;
  			console.log('adlibs_arr: ', adlibs_arr);
  			assert(adlibs_arr!=null);
  			done();	
  		});
  	});
  });
}