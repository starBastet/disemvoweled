import React, {Component} from 'react';
import './BackButton.css';


class BackButton extends Component
{
	constructor(props,context)
	{
		super(props,context);
		
		this.state={
			
		};
		
		this.menuCallback = this.props.menuCallback;
		
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
				id={'backButtonContainer'}
				onClick={this.menuCallback}
			>
				{jsx}
			</div>
		);
	}
}

export default BackButton;