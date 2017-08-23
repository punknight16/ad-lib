var AdlibSubmit = React.createClass({
  getInitialState: function(){
    return {
      template_string: " watched on as the quick, brown  jumped over the  .",
      indicator_positions: {noun1: 50, adjective: 49, noun2: 32, person_you_know: 0 },
      indicator_values: {noun1: 'fox', adjective: 'lazy', noun2: 'dog', person_you_know: 'John'}
    }
  },
  getUserInput: function(e){
    e.preventDefault();    
    var person_you_know = getData('drag1');
    var noun1 = getData('drag2');
    var noun2 = getData('drag3');
    var adjective = getData('drag4');

    var text = getText();
    var ghost_text = getGhostText();
    
    var person_pos = ghost_text.indexOf('Person'+person_you_know);
    var noun1_pos = ghost_text.indexOf('noun1'+noun1);
    var noun2_pos = ghost_text.indexOf('noun2'+noun2);
    var adjective_pos = ghost_text.indexOf('adject'+adjective);


    var position_arr = [
      {indicator_ref: 'noun1', indicator_name: 'noun1', indicator_value: noun1, indicator_position: noun1_pos}, 
      {indicator_ref: 'noun2', indicator_name: 'noun2', indicator_value: noun2, indicator_position: noun2_pos}, 
      {indicator_ref: 'adjective', indicator_name: 'adject', indicator_value: adjective, indicator_position: adjective_pos}, 
      {indicator_ref: 'person_you_know', indicator_name: 'Person', indicator_value: person_you_know, indicator_position: person_pos}
    ];
    position_arr.sort(function(a, b){
      return b.indicator_position-a.indicator_position
    });
    var indicator_positions = {};
    var indicator_values = {};
    position_arr.map(function(indicator_obj, indicator_obj_index){
      for(var key in indicator_positions) {
        indicator_positions[key] = indicator_positions[key]-indicator_obj.indicator_value.length-indicator_obj.indicator_name.length;
      }
      indicator_positions[indicator_obj.indicator_ref] = indicator_obj.indicator_position;
      indicator_values[indicator_obj.indicator_ref] = indicator_obj.indicator_value;
      ghost_text = ghost_text.slice(0, indicator_obj.indicator_position) 
        + ghost_text.slice(indicator_obj.indicator_position+indicator_obj.indicator_value.length+indicator_obj.indicator_name.length);
    });
    console.log(indicator_positions);
    this.setState({
     template_string: ghost_text,
     indicator_positions: indicator_positions,
     indicator_values: indicator_values
    }, ()=>{
      this.submit_ghost.submit();
    });
  },
  render: function (){
    return (
      <div>
        <form action='/createOne' method='POST' ref={(ref) => this.submit_ghost = ref}>
          <input type="hidden" value={JSON.stringify(this.state.indicator_values)} name="indicator_values" />
          <input type="hidden" value={JSON.stringify(this.state.indicator_positions)} name="indicator_positions" />
          <input type="hidden" value={this.state.template_string} name='template_string' />
        </form>
        <form onSubmit={this.getUserInput}>
          <input type='submit' className='submit-button' value='Submit' />
        </form>
      </div>
    );
  }
});
ReactDOM.render(<AdlibSubmit />,document.getElementById('submit'));