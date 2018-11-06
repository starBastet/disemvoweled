import React, {Component} from 'react';
import './Base.css';
import GameScreen from './views/gameScreen/GameScreen';
import ScreenChange from './views/screenChange/ScreenChange';
import MenuScreen from './views/menuScreen/MenuScreen';
import CompleteScreen from './views/completeScreen/CompleteScreen';
import CookieManager from './views/cookieManager/CookieManager';


class Base extends Component
{
	constructor(props,context)
	{
		super(props,context);
		
		this.state={
			jDataA:this.props.jDataA,
			categoryNum:1,
			gameComplete:false,
			phase:'MENU',
			obscure:'obscure',
			hideMenu:false,
			currCompletedA:this.seedCompleted()
		};
		
		this.categoryTitle = '';
		this.newCategoryNum = 0;
		this.timeout = null;
		
		this.seedCompleted = this.seedCompleted.bind(this);
		this.reportCookie = this.reportCookie.bind(this);
		this.getWordListA = this.getWordListA.bind(this);
		this.categoryChosen = this.categoryChosen.bind(this);
		this.showGame = this.showGame.bind(this);
		this.gameComplete = this.gameComplete.bind(this);
		this.backToMenu = this.backToMenu.bind(this);
		this.showMenu = this.showMenu.bind(this);
		this.compileJsx = this.compileJsx.bind(this);
	}
	
	componentWillMount()
	{
		
	}
	
	componentDidMount()
	{
		
	}
	
	seedCompleted()
	{
		var arr = [];
		
		for (var i=0;i<this.props.jDataA.CATEGORY_LIST_A.length;i++)
		{
			arr.push(0);
		}
		
		return arr;
	}
	
///////////////////////////////
//    COOKIE

	reportCookie(arr)
	{
		this.setState(
		{
			currCompletedA:arr
		});
	}
	
	getWordListA()
	{
		var categoryStr = this.state.jDataA.CATEGORY_LIST_A[this.state.categoryNum];
		var list = this.state.jDataA.WORD_LISTS_A[categoryStr];
		var listSplitA = list.split(' ');
		listSplitA = listSplitA.map(function(str){return str.toUpperCase()});
		
		this.categoryTitle = categoryStr;
		
		return listSplitA;
	}
	
	categoryChosen(categoryStr)
	{
		for (var i=0;i<this.state.jDataA.CATEGORY_LIST_A.length;i++)
		{
			if (categoryStr === this.state.jDataA.CATEGORY_LIST_A[i])
			{
				this.newCategoryNum = i;
				break;
			}
		}
		
		this.timeout = setTimeout(this.showGame,800);
		
		this.setState(
		{
			obscure:'obscure',
			hideMenu:true
		});
	}
	
	showGame(e)
	{
		this.timeout = null;
		this.setState(
		{
			categoryNum:this.newCategoryNum,
			phase:'GAME'
		});
	}
	
	backToMenu()
	{
		this.timeout = setTimeout(this.showMenu,800);
		
		this.setState(
		{
			obscure:'obscure'
		});
	}
	
	showMenu(e)
	{
		this.timeout = null;
		this.setState(
		{
			obscure:'reveal',
			gameComplete:false,
			phase:'MENU',
			hideMenu:false
		});
	}
	
	gameComplete()
	{
		var arr = [...this.state.currCompletedA];
		arr[this.state.categoryNum] = 1;
		
		
		this.setState(
		{
			gameComplete:true,
			currCompletedA:arr,
			obscure:'hide'
		});
	}
	
	compileJsx()
	{
		var wordListA = this.getWordListA();
		
		var screenJsx;
		if (this.state.phase === 'MENU')
		{
			screenJsx = <MenuScreen
							categoryListA={this.state.jDataA.CATEGORY_LIST_A}
							instructionsA={this.state.jDataA.INSTRUCTIONS_A}
							hideMenu={this.state.hideMenu}
							currCompletedA={this.state.currCompletedA}
							callback={this.categoryChosen}
						/>
		}
		else if (this.state.phase === 'GAME')
		{
			screenJsx = <GameScreen
							categoryTitle={this.categoryTitle}
							wordListA={wordListA}
							menuCallback={this.backToMenu}
							completeCallback={this.gameComplete}
						/>
		}
		
		var jsx = <div>
					<CompleteScreen
						categoryTitle={this.categoryTitle}
						isShown={this.state.gameComplete}
						callback={this.showMenu}
					/>
					<ScreenChange
						obscure={this.state.obscure}
					/>
					<CookieManager
						completedDataA={this.state.currCompletedA}
						reportCookieCallback={this.reportCookie}
					/>
					{screenJsx}
				  </div>
		
		return jsx;
	}
	
	render()
	{
		var jsx = this.compileJsx();
		
		return(
			<div id={'appContainer'}>
				{jsx}
			</div>
		);
	}
}

export default Base;