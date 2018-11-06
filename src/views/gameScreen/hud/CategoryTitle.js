import React, {Component} from 'react';
import './CategoryTitle.css';


class CategoryTitle extends Component
{
	constructor(props,context)
	{
		super(props,context);
		
		this.state={
			categoryTitle:this.props.categoryTitle
		};
		
		this.compileJsx = this.compileJsx.bind(this);
	}
	
	componentWillMount()
	{
		
	}
	
	componentDidMount()
	{
		
	}
	
	compileJsx()
	{
		var jsx = <div>
					{this.state.categoryTitle}
				  </div>
		
		return jsx;
	}
	
	shouldComponentUpdate(nextProps,nextState)
	{
		return false;
	}
	
	render()
	{
		var jsx = this.compileJsx();
		
		return(
			<div id={'categoryTitle'}>
				{jsx}
			</div>
		);
	}
}

export default CategoryTitle;