var React = require('react');
var PropTypes = React.PropTypes;

var styles = {
	container:{
		position: 'fixed',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		fontsize: '55px'
	},
	content: {
		textAlign: 'center',
		position: 'absolute',
		width: '100px',
		marginTop: '30px',
	}
};

var Loading = React.createClass({
	propTypes: {
		text: PropTypes.string,
		speed:PropTypes.number
	},
	getDefaultProps: function () {
		return {
			text: 'Loading',
			speed: 300
		}
	},
	getInitialState: function () {
		this.originalText = this.props.text;
		return {
			text: this.originalText
		}
	},
	componentDidMount: function() {
		var stopper = this.originalText + '...';
		this.interval = setInterval(function () {
			if (this.state.text === stopper) {
				this.setState({
					text: this.originalText
				})
			} else {
				this.setState({
					text: this.state.text + '.'
				})
			}
		}.bind(this), this.props.speed)
	},
	componentWillUnmount: function () {
		clearInterval(this.interval);
	},	
	render: function() {
		return (
			<div>
				<p >{this.state.text}</p>
			</div>	
		);
	}

});

module.exports = Loading;



// var PropTypes = React.PropTypes;
// var styls = require('../styles');
// var ReactRouter = require('react-router');
// var Link = ReactRouter.Link
// var UserDetails = require('./UserDetails');
// var UserDetailsWrapper = require(./UserDetailsWrapper);
// var MainContainer = require(./MainContainer);

// function StartOver () {
// 	return (
// 		<div className='col-sm-12' style={styles.space}>
// 			<Link to='/playerOne'>
// 				<button type='button' className='btn btn-lg btn-danger'>Start Over</button>
// 			</Link>
// 		</div>	
// 	)
// }

// function Tie (props) {
// 	return (
// 		<MainContainer>
// 			<h1>It's a Tie!</h1>
// 			<StartOver />
// 		</MainContainer	
// 	)
// }
// function Results (props) {
// 	if (props.isLoading === true) {
// 		return<p> Loading </p>			
// 	}
// 	if (props.scores[0] === props.scores[1]) {
// 		return (
// 			<Tie scores={props.scores} playersInfo={props.playersInfo}/>
// 		)
// 	}
// 	var winningIndex = 
// }
