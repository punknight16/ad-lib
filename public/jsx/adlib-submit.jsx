var AdlibSubmit = React.createClass({
  getInitialState: function(){
    return {
      template_string: " went  shopping, but was interrupted by a  .",
      indicator_positions: {noun1: 43, adjective: 42, noun2: 6, person_you_know: 0},
      indicator_values: {noun1: 'fox', adjective: 'lazy', noun2: 'dog', person_you_know: 'John'}
    }
  },
  getUserInput: function(e){
    e.preventDefault();    
    var person_you_know = getData('drag1');
    var noun1 = getData('drag2');
    var noun2 = getData('drag3');
    var adjective = getData('drag4');
    this.setState({
     person_you_know: person_you_know,
      noun1: noun1,
      noun2: noun2,
      adjective: adjective 
    }, ()=>{
      this.submit_ghost.submit();
    });
  },
  render: function (){
    return (
      <div>
        <form action='/createOne' method='POST' ref={(ref) => this.submit_ghost = ref}>
          <input type="hidden" value={this.state.indicator_values} name="indicator_values" />
          <input type="hidden" value={this.state.indicator_positions} name="indicator_positions" />
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