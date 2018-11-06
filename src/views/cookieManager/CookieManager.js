import React, {Component} from 'react';
import './CookieManager.css';


class CookieManager extends Component
{
	constructor(props,context)
	{
		super(props,context);
		
		this.state={
			completedDataA:this.props.completedDataA
		};
		
		this.reportCookieCallback = this.props.reportCookieCallback;
		
		this.getCookieA = this.getCookieA.bind(this);
		this.updateCookie = this.updateCookie.bind(this);
		this.deleteCookie = this.deleteCookie.bind(this);
		this.compileJsx = this.compileJsx.bind(this);
	}
	
	componentWillMount()
	{
		
	}
	
	componentDidMount()
	{
		if (document.cookie.length > 1)
		{
			this.getCookieA();
		}
	}
	
	componentWillReceiveProps(newProps)
	{
		if (newProps.completedDataA !== this.state.completedDataA)
		{
			this.updateCookie(newProps.completedDataA);
		}
	}
	
	getCookieA(key)
	{
		//var delimiterStr = '; ' + document.cookie;
		//var strA = delimiterStr.split('; ratings=');
		//var str = strA.pop().split(";").shift();
		var cookieA = document.cookie.match(new RegExp('(^| )completed=([^;]+)'));
		
		if (cookieA)
		{
			var arr = JSON.parse(cookieA[2]);
			//console.log("EXISTING: ",arr);
			this.reportCookieCallback(arr);
		}
	}
	
	updateCookie(arr)
	{
		var completedStr = JSON.stringify(arr);
		//console.log("UPDATE: ",completedStr);
		
		document.cookie = 'completed='+completedStr;
		
		this.setState(
		{
			completedDataA:arr
		});
	}
	
	deleteCookie()
	{
		var days = 3650;
		var d = new Date();
		d.setTime(d.getTime() + (days*1000*60*60*24)); // + was - ?
		var expires = "expires=" + d.toGMTString();
		document.cookie = 'completed=; '+ expires;
		
		var arr = [...this.state.completedDataA].map(function(){return 0});
		this.reportCookieCallback(arr);
	}
	
	shouldComponentUpdate(nextProps,nextState)
	{
		return nextState.currRatingsA !== this.state.currRatingsA;
	}
	
	compileJsx()
	{
		var jsx = <div>
					
				  </div>
		
		return jsx;
	}
	
	render()
	{
		var jsx = this.compileJsx();
		
		return(
			<div 
				id={'cookieManagerContainer'}
				onClick={this.deleteCookie}
			>
				{jsx}
			</div>
		);
	}
}

export default CookieManager;