import React, {Component} from 'react';
import './CategoryListItem.css';


class CategoryListItem extends Component
{
	constructor(props,context)
	{
		super(props,context);
		
		this.state={
			className:'categoryListItem',
			isComplete:this.props.isComplete
		};
		
		this.categoryName = this.props.categoryName;
		this.callback = this.props.callback;
		
		this.elem = null;
		
		this.clicked = this.clicked.bind(this);
		this.compileJsx = this.compileJsx.bind(this);
	}
	
	componentWillMount()
	{
		//console.log('ITEM: ',this.props.isComplete);
	}
	
	componentDidMount()
	{
		/*
		if (this.state.isComplete === true)
		{
			this.setState(
			{
				className:'categoryListItem completed'
			});
		}
		*/
	}
	
	componentWillReceiveProps(newProps)
	{
		if (newProps.isComplete !== this.state.isComplete)
		{
			this.setState(
			{
				isComplete:newProps.isComplete
			});
		}
	}
	
	clicked()
	{
		/*this.setState(
		{
			className:'categoryListItem chosen'
		});*/
		
		this.callback(this.categoryName);
	}
	
	shouldComponentUpdate(newProps,newState)
	{
		return (newState.className !== this.state.className || newState.isComplete !== this.state.isComplete);
	}
	
	compileJsx()
	{
		var checkMark = null;
		if (this.state.isComplete === true)
		{
			checkMark = <div className={'completed'}></div>;
		}
		
		var jsx = <div>
					<p 
						className={this.state.className}
						ref={(elem)=>this.elem=elem}
						onClick={this.clicked}
					>
						{this.categoryName}
					</p>
					{this.state.isComplete ? checkMark : null}
				  </div>
		
		return jsx;
	}
	
	render()
	{
		var jsx = this.compileJsx();
		
		return(
			<div id={'categoryListItemContainer'}>
				{jsx}
			</div>
		);
	}
}

export default CategoryListItem;