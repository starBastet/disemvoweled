import React, {Component} from 'react';
import './Instructions.css';


class Instructions extends Component
{
	constructor(props,context)
	{
		super(props,context);
		
		this.state={
			
		};
		
		this.instructionsA = this.props.instructionsA;
		
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
					<p id={'instructionsTitle'}>
						{this.instructionsA.HEADER_TEXT}
					</p>
					<p id={'instructionsBlurb'}>
						{this.instructionsA.BLURB}
					</p>
				  </div>
		
		return jsx;
	}
	
	render()
	{
		var jsx = this.compileJsx();
		
		return(
			<div id={'instructionsContainer'}>
				{jsx}
			</div>
		);
	}
}

export default Instructions;