import React, {Component} from 'react';
import './ScreenChange.css';


class ScreenChange extends Component
{
	constructor(props,context)
	{
		super(props,context);
		
		this.state={
			containerClassName:this.props.obscure
		};
		
		this.timeout = null;
		
		this.obscure = this.obscure.bind(this);
		this.hide = this.hide.bind(this);
		this.reveal = this.reveal.bind(this);
		this.compileJsx = this.compileJsx.bind(this);
	}
	
	componentWillMount()
	{
		
	}
	
	componentDidMount()
	{
		this.timeout = setTimeout(this.reveal,10);
	}
	
	obscure(e)
	{
		this.timeout = null;
		this.timeout = setTimeout(this.reveal,1000);
		
		this.setState(
		{
			containerClassName:'obscure'
		});
	}
	
	hide()
	{
		this.setState(
		{
			containerClassName:'obscure'
		});
	}
	
	reveal(e)
	{
		this.timeout = null;
		this.setState(
		{
			containerClassName:''
		});
	}
	
	componentWillReceiveProps(newProps)
	{
		if (newProps.obscure !== this.state.containerClassName)
		{
			if (newProps.obscure === 'obscure')
			{
				this.obscure();
			}
			else if (newProps.obscure === 'hide')
			{
				this.hide();
			}
			else if (newProps.obscure === 'reveal')
			{
				this.reveal();
			}
		}
	}
	
	/*shouldComponentUpdate(newProps,newState)
	{
		return newProps.obscure !== this.props.obscure;
	}*/
	
	compileJsx()
	{
		var jsx = <div>
					<div id={'screenChangeShade'}>
						<p id={'titleText'}>
							disemVOWELed
						</p>
					</div>
				  </div>
		
		return jsx;
	}
	
	render()
	{
		var jsx = this.compileJsx();
		
		return(
			<div 
				id={'screenChangeContainer'}
				className={this.state.containerClassName}
			>
				{jsx}
			</div>
		);
	}
}

export default ScreenChange;