import React, {Component} from 'react';
import './HUD.css';
import ProgressMeter from './ProgressMeter';
import BackButton from './BackButton';
import CategoryTitle from './CategoryTitle';
import Hint from './Hint';


class HUD extends Component
{
	constructor(props,context)
	{
		super(props,context);
		
		this.state={
			currWordNum:this.props.currWordNum
		};
		
		this.categoryTitle = this.props.categoryTitle;
		this.WORD_AMOUNT = this.props.wordAmount;
		this.hintCallback = this.props.hintCallback;
		this.menuCallback = this.props.menuCallback;
		
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
					<ProgressMeter
						currWordNum={this.state.currWordNum+1}
						wordAmount={this.WORD_AMOUNT}
					/>
					<div id={'hudButtons'}>
						<BackButton
							menuCallback={this.menuCallback}
						/>
						<Hint
							hintCallback={this.hintCallback}
						/>
					</div>
					<CategoryTitle
						categoryTitle={this.categoryTitle}
					/>
				  </div>
		
		return jsx;
	}
	
	shouldComponentUpdate(nextProps,nextState)
	{
		return nextState.currWordNum != this.state.currWordNum;
	}
	
	render()
	{
		var jsx = this.compileJsx();
		
		return(
			<div id={'hudContainer'}>
				{jsx}
			</div>
		);
	}
}

export default HUD;