var AdlibGhostinput = React.createClass({
	getInitialState: function(){
		return {
			ghostinput: 'John watched as the quick, brown fox jumped over the lazy dog'
		}
	},
	render: function (){
		var styles = {
			ghostinputItem: {'color': 'purple', 'position': 'relative', 'marginTop': '15px', 'width': '260px'}
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
		var action = {textinput: this.adlib_textinput.innerHTML};
		var state = {};
		var react = {
			adlib_textinput: {setState: this.setState.bind(this)},
			adlib_ghostinput: {setState: this.setState.bind(this.props.parent.adlib_ghostinput)}
		};
		var ext = {};
		handleBlur(action, state, react, ext);
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
	getInitialState: function(){
		return {is_infocus: false};
	},
	handleFocus: function(){
		this.setState({is_infocus: true});
	},
	handleBlur: function(){
		this.setState({is_infocus: false});
	},
	render: function (){
		var styles = {
			controller: {'color': 'red', 'position': 'relative'},
			textinputContainer: {'color': 'green', 'position': 'relative', 'width': '260px', 'zIndex': '0'},
			ghostinputContainer: {'color': 'blue', 'position': 'absolute', 'width': '260px', 'zIndex': '0'},
			ghostinputItem: {'color': 'purple', 'position': 'relative', 'marginTop': '15px', 'width': '260px'}
		};
		(this.state.is_infocus) ? styles.textinputContainer['zIndex'] =2 : styles.ghostinputContainer['zindex'] = 2;
		return (
			<div style={styles.controller} onFocus={this.handleFocus} onBlur={this.handleBlur}>
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

function handleBlur(action, state, react, ext){
	var textinput = action.textinput;
	var adlib_textinput = react.adlib_textinput;
	var adlib_ghostinput = react.adlib_ghostinput;

	var html_tags_removed = textinput.replace(/<\/?\w+>/gi, '');
	adlib_textinput.setState({textinput: html_tags_removed});
	

	var html_with_spantags= html_tags_removed.replace(/(\w+)(\s|.)/g, '<span ondrop="drop(event)" ondragover="allowDrop(event)">$&</span>');
	console.log(html_with_spantags);
	adlib_ghostinput.setState({ghostinput: html_with_spantags});
}
/*
//Tests
if (require.main.filename == '/usr/local/lib/node_modules/mocha/bin/_mocha') {
  var assert = require('assert');
  describe('handleBlur', function(){
  	var action = {
  		textinput: 'test again'
  	};
  	var state = {
  		adlib_textinput: {textinput: ''},
  		adlib_ghostinput: {ghostinput: ''}
  	};
  	var react = {
  		adlib_textinput: {
  			setState: function(obj){
      		for (var key in obj){
        		this[key] = obj[key];
      		}
    		}.bind(state.adlib_textinput)
    	},
    	adlib_ghostinput: {
    		setState: function(obj){
      		for (var key in obj){
        		this[key] = obj[key];
      		}
    		}.bind(state.adlib_ghostinput)
    	}
  	}
  	var ext = {};
  	it('should update two components', function(done){
  		handleBlur(action, state, react, ext);
  		assert(state.adlib_textinput.textinput=='test again');
  		assert(state.adlib_ghostinput.ghostinput=='test again');
  		done();
  	});
  });
}
*/
//view-handlers
//1 when the adlib_intake_controller is in-focus, the adlib_textinput moves to the front - done
//2 when the adlib_intake_controller is blurred, the adlib_ghostinput moves to the front - done
//3 when the adlib_textinput is blurred, the adlib_ghostinput and the adlib_textinput updates - done!
//4 get the span tag for each word