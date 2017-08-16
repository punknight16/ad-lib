var AdlibGhostinput = React.createClass({
	getInitialState: function(){
		return {
			ghostinput: 'John watched as the quick, brown fox jumped over the lazy dog'
		}
	},
	setGhostState: function(new_text){
		this.setState({ghostinput: new_text})
	},
	render: function (){
		var styles = {
			ghostinputItem: {'color': 'purple', 'position': 'relative', 'marginTop': '15px'}
		};
		return (
			<div  
				style={styles.ghostinputItem}
				ref={(ref) => this.adlib_ghostinput = ref} 
				dangerouslySetInnerHTML={{__html: this.state.ghostinput}} />
		);
	}
});

var AdlibTextinput = React.createClass({
	getInitialState: function(){
		return {
			textinput: 'John watched as the quick, brown fox jumped over the lazy dog'
		}
	},
	handleBlur: function(e){
		var html_tags_removed = this.adlib_textinput.innerHTML.replace(/<\/?\w+>/gi, '');
		this.setState({textinput: html_tags_removed});
		this.props.parent.adlib_ghostinput.setGhostState(html_tags_removed);
	},
	render: function (){
		return (
			<div contentEditable 
				ref={(ref) => this.adlib_textinput = ref}  
				onBlur={this.handleBlur}
				dangerouslySetInnerHTML={{__html: this.state.textinput}} />
		);
	}
});

var AdlibIntakeController = React.createClass({
	render: function (){
		var styles = {
			controller: {'color': 'red', 'position': 'relative'},
			textinputContainer: {'color': 'green', 'position': 'relative'},
			ghostinputContainer: {'color': 'blue', 'position': 'absolute'},
			ghostinputItem: {'color': 'purple', 'position': 'relative', 'marginTop': '15px'}
		};
		return (
			<div style={styles.controller}>
				<div id='adlib-ghostinput' style={styles.ghostinputContainer}>
					<AdlibGhostinput ref={(ref) => this.adlib_ghostinput = ref} style={styles.ghostinputItem}>
						John watched as the quick, brown fox jumped over the lazy dog
					</AdlibGhostinput>
				</div>
				<div id='adlib-textinput' style={styles.textinputContainer}>
					<AdlibTextinput parent={this} style={styles.textinputItem}>
						John watched as the quick, brown fox jumped over the lazy dog
					</AdlibTextinput>
				</div>
      </div>
		);
	}
});

ReactDOM.render(<AdlibIntakeController />, document.getElementById('adlib-intake'));

//view-handlers
//1 when the adlib_intake_controller is in-focus, the adlib_textinput moves to the front
//2 when the adlib_intake_controller is blurred, the adlib_ghostinput moves to the front
//3 when the adlib_textinput is blurred, the adlib_ghostinput and the adlib_textinput updates