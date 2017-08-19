var AdlibSubmit = React.createClass({
  getInitialState: function(){
    return {
      person_you_know: "John",
      noun1: 'fox',
      noun2: 'dog',
      adjective: 'lazy'
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
          <input type="hidden" value={this.state.person_you_know} name="person_you_know" />
          <input type="hidden" value={this.state.noun1} name="noun1" />
          <input type="hidden" value={this.state.noun2} name="noun2" />
          <input type="hidden" value={this.state.adjective} name="adjective" />
        </form>
        <form onSubmit={this.getUserInput}>
          <input type='submit' className='submit-button' value='Submit' />
        </form>
      </div>
    );
  }
});
ReactDOM.render(<AdlibSubmit />,document.getElementById('submit'));