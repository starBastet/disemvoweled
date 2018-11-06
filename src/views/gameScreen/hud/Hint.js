import React, {Component} from 'react';
import './Hint.css';


class Hint extends Component
{
	constructor(props,context)
	{
		super(props,context);
		
		this.state={
			
		};
		
		this.hintCallback = this.props.hintCallback;
		
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
					?
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
			<div 
				id={'hintContainer'}
				onClick={this.hintCallback}
			>
				{jsx}
			</div>
		);
	}
}

export default Hint;