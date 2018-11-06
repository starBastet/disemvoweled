import React, {Component} from 'react';
import './CompleteScreen.css';


class CompleteScreen extends Component
{
	constructor(props,context)
	{
		super(props,context);
		
		this.state={
			isShown:this.props.isShown,
			className:''
		};
		
		this.categoryTitle = this.props.categoryTitle;
		this.callback = this.props.callback;
		
		this.timeout = null;
		
		this.show = this.show.bind(this);
		this.hide = this.hide.bind(this);
		this.compileJsx = this.compileJsx.bind(this);
	}
	
	componentWillMount()
	{
		
	}
	
	componentDidMount()
	{
		//this.timeout = setInterval(this.show,10);
	}
	
	componentWillReceiveProps(newProps)
	{
		this.categoryTitle = newProps.categoryTitle;
		
		if (newProps.isShown !== this.state.isShown)
		{
			if (newProps.isShown === true)
			{
				this.show();
			}
		}
		else
		{
			this.hide();
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
	
	hide()
	{
		this.setState(
		{
			className:''
		});
	}
	
	compileJsx()
	{
		var jsx = <div>
					<p id={'completeHeader'}>
						COMPLETE!
					</p>
					<p id={'completeCategory'}>
						{this.categoryTitle}
					</p>
					<p 
						id={'completeButton'}
						onClick={this.callback}
					>
						
					</p>
				  </div>
		
		return jsx;
	}
	
	shouldComponentUpdate(newProps,newState)
	{
		return newState.className != this.state.className;
	}
	
	render()
	{
		var jsx = this.compileJsx();
		
		return(
			<div 
				id={'completeScreenContainer'}
				className={this.state.className}
			>
				{jsx}
			</div>
		);
	}
}

export default CompleteScreen;