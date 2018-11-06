import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import Base from './Base';


var container = document.getElementById('reactContainer');

var xhttpR = new XMLHttpRequest();
var jDataA = {};

xhttpR.onreadystatechange = function()
{
	if (this.readyState === 4 && this.status === 200)
	{
		jDataA = JSON.parse(xhttpR.responseText);
		//console.log(data);
		
		ReactDOM.render(
			<Base jDataA={jDataA}/>,
			container
		);
	}
}

xhttpR.open('GET','./data/json.json',true);
xhttpR.send();