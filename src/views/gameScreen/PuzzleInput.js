import React, {Component} from 'react';
import './PuzzleInput.css';


class PuzzleInput extends Component
{
	constructor(props,context)
	{
		super(props,context);
		
		this.state={
			solved:false,
			className:'',
			inputClassName:'',
			focusField:this.props.focusField,
			blurField:this.props.blurField
		};
		
		this.word = this.props.word;
		this.callback = this.props.callback;
		
		this.inputField = null;
		this.timeout = null;
		this.checkFocusTimer = null;
		
		this.show = this.show.bind(this);
		this.updateText = this.updateText.bind(this);
		this.checkFocus = this.checkFocus.bind(this);
		this.resetter = this.resetter.bind(this);
		this.compileJsx = this.compileJsx.bind(this);
	}
	
	componentWillMount()
	{
		
	}
	
	componentDidMount()
	{
		this.inputField.focus();
		this.timeout = setTimeout(this.show,10);
		this.checkFocusTimer = setInterval(this.checkFocus,20);
	}
	
	componentWillReceiveProps(newProps)
	{
		if (newProps.word !== this.props.word)
		{
			this.word = newProps.word;
			this.timeout = setTimeout(this.resetter,400);
		}
		
		if (newProps.blurField !== this.state.blurField)
		{
			this.inputField.blur();
		}
		else if (newProps.focusField === true)
		{
			this.inputField.focus();
			this.checkFocus();
			this.checkFocusTimer = setInterval(this.checkFocus,20);
		}
	}
	
	checkFocus(e)
	{
		if (document.activeElement === this.inputField)
		{
			var body = document.body;
			var html = document.documentElement;
			
			if (body.scrollTop)
			{
				body.scrollTop = 27;
			}
			else
			{
				html.scrollTop = 27;
			}
			
			if (body.scrollTop === 27 || html.scrollTop === 27)
			{
				clearInterval(this.checkFocusTimer);
				this.checkFocusTimer = null;
			}
		}
	}
	
	resetter(e)
	{
		this.inputField.focus();
		this.inputField.value = '';
		
		this.setState(
		{
			solved:false,
			inputClassName:''
		});
	}
	
	show(e)
	{
		this.timeout = null;
		//document.documentElement.scrollTop = 100;
		this.setState(
		{
			className:'show'
		});
	}
	
	updateText(e)
	{
		if (this.correct === true)
		{
			//e.preventDefault();
			e.target.value = this.word;
			return;
		}
		
		var input = e.target.value.toUpperCase();
		if (input === this.word)
		{
			//this.inputField.blur();
			this.callback();
			this.setState(
			{
				solved:true,
				inputClassName:'solved'
			});
		}
		
		e.target.value = input;
	}
	
	componentWillUnmount()
	{
		clearInterval(this.checkFocusTimer);
		this.checkFocusTimer = null;
	}
	
	compileJsx()
	{
		var jsx = <div>
					<form>
						<input
							id={'inputForm'}
							className={this.state.inputClassName}
							maxLength={15}
							onChange={this.updateText}
							placeholder={'YOUR ANSWER'}
							ref={(elem)=>this.inputField=elem}
						>
						</input>
					</form>
				  </div>
		
		return jsx;
	}
	
	render()
	{
		var jsx = this.compileJsx();
		
		return(
			<div 
				id={'puzzleInputContainer'}
				className={this.state.className}
			>
				{jsx}
			</div>
		);
	}
}

export default PuzzleInput;