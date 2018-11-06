import React, {Component} from 'react';
import './MenuScreen.css';
import CategoryList from './CategoryList';
import Instructions from './Instructions';


class MenuScreen extends Component
{
	constructor(props,context)
	{
		super(props,context);
		
		this.state={
			className:'',
			currCompletedA:this.props.currCompletedA,
			hideMenu:this.props.hideMenu
		};
		
		this.categoryListA = this.props.categoryListA;
		this.instructionsA = this.props.instructionsA;
		this.callback = this.props.callback;
		
		this.timeout = null;
		
		this.show = this.show.bind(this);
		this.removal = this.removal.bind(this);
		this.compileJsx = this.compileJsx.bind(this);
	}
	
	componentWillMount()
	{
		
	}
	
	componentDidMount()
	{
		this.timeout = setTimeout(this.show,10);
	}
	
	componentWillReceiveProps(newProps)
	{
		if (newProps.hideMenu !== this.state.hideMenu)
		{
			if (newProps.hideMenu === true)
			{
				this.removal();
			}
		}
		
		if (newProps.currCompletedA !== this.state.currCompletedA)
		{
			this.setState(
			{
				currCompletedA:newProps.currCompletedA
			});
		}
	}
	
	show(e)
	{
		this.timeout = null;
		this.setState(
		{
			className:'show'
		});
	}
	
	removal()
	{
		this.timeout = null;
		this.setState(
		{
			className:''
		});
	}
	
	compileJsx()
	{
		var jsx = <div>
					<Instructions
						instructionsA={this.instructionsA}
					/>
					<CategoryList
						categoryListA={this.categoryListA}
						currCompletedA={this.state.currCompletedA}
						callback={this.callback}
					/>
				  </div>
		
		return jsx;
	}
	
	render()
	{
		var jsx = this.compileJsx();
		
		return(
			<div 
				id={'menuScreenContainer'}
				className={this.state.className}
			>
				{jsx}
			</div>
		);
	}
}

export default MenuScreen;