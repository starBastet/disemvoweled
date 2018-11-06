import React, {Component} from 'react';
import './CategoryList.css';
import CategoryListItem from './CategoryListItem';


class CategoryList extends Component
{
	constructor(props,context)
	{
		super(props,context);
		
		this.state={
			currCompletedA:this.props.currCompletedA
		};
		
		this.categoryListA = this.props.categoryListA;
		this.callback = this.props.callback;
		
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
		//console.log('CHANGED');
		if (newProps.currCompletedA !== this.state.currCompletedA)
		{
			this.setState(
			{
				currCompletedA:newProps.currCompletedA
			});
		}
	}
	
	compileJsx()
	{
		var jsxA = [];
		for (var i=0;i<this.categoryListA.length;i++)
		{
			var isComplete = false;
			if (Number(this.state.currCompletedA[i]) === 1)
			{
				isComplete = true;
				
			}
			//console.log('LIST: ',isComplete);
			var jsxSnip = <CategoryListItem
						  	categoryName={this.categoryListA[i]}
							categoryNum={i}
							isComplete={isComplete}
							callback={this.callback}
							key={'categoryListItem'+i}
						  />
						 
			jsxA.push(jsxSnip);
		}
		
		var jsx = <div>
					<p
						id={'categoryListTitle'}
					>
						CATEGORIES
					</p>
					{jsxA}
				  </div>
		
		return jsx;
	}
	
	render()
	{
		var jsx = this.compileJsx();
		
		return(
			<div id={'categoryListContainer'}>
				{jsx}
			</div>
		);
	}
}

export default CategoryList;