import React, {Component} from 'react';
import './ProgressMeter.css';


class ProgressMeter extends Component
{
	constructor(props,context)
	{
		super(props,context);
		
		this.state={
			currWordNum:this.props.currWordNum
		};
		
		this.WORD_AMOUNT = this.props.wordAmount;
		
		this.compileJsx = this.compileJsx.bind(this);
	}
	
	componentWillMount()
	{
		
	}
	
	componentDidMount()
	{
		
	}
	
	componentWillReceiveProps(newProps)
	{
		if (newProps.currWordNum !== this.props.currWordNum)
		{
			this.setState(
			{
				currWordNum:newProps.currWordNum
			});
		}
	}
	
	compileJsx()
	{
		var jsx = <div>
					<div id={'progressMeter'}>
						<p>
							{this.state.currWordNum + '/' + this.WORD_AMOUNT}
						</p>
					</div>
				  </div>
		
		return jsx;
	}
	
	shouldComponentUpdate(newProps,newState)
	{
		return newState.currWordNum != this.state.currWordNum;
	}
	
	render()
	{
		var jsx = this.compileJsx();
		
		return(
			<div id={'progressMeterContainer'}>
				{jsx}
			</div>
		);
	}
}

export default ProgressMeter;