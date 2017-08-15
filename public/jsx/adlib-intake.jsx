var AdlibTextinput = React.createClass({
	getInitialState: function(){
		return {
			textinput: 'John watched as the quick, brown fox jumped over the lazy dog'
		}
	},
	handleInput: function(e){
		return console.log(e.target.innerHTML);
	},
	handleFocus: function(e){
		//could also use the onInput event
		return console.log('hi: ', this.adlib_textinput.innerHTML);
	},
	handleBlur: function(e){
		var html_tags_removed = this.adlib_textinput.innerHTML.replace(/<\/?\w+>/gi, '');
		this.setState({textinput: html_tags_removed});
		return console.log('goodbye: ', html_tags_removed);
	},
	render: function (){
		return (
			<div contentEditable 
				ref={(ref) => this.adlib_textinput = ref} 
				onInput={this.handleInput} 
				onBlur={this.handleBlur} 
				onFocus={this.handleFocus}
				dangerouslySetInnerHTML={{__html: this.state.textinput}} />
		);
	}
});


ReactDOM.render(<AdlibTextinput />, document.getElementById('adlib-textinput'));