import React, {Component} from 'react';
import './GameScreen.css';
import Puzzle from './Puzzle';
import PuzzleInput from './PuzzleInput';
import HUD from './hud/HUD';


class GameScreen extends Component
{
	constructor(props,context)
	{
		super(props,context);
		
		this.state={
			wordSolved:false,
			currWordNum:0,
			focusField:false,
			blurField:false,
			hintCount:0
		};
		
		this.menuCallback = this.props.menuCallback;
		this.completeCallback = this.props.completeCallback;
		
		this.categoryTitle = this.props.categoryTitle;
		this.wordListA = this.props.wordListA;
		this.timeout = null;
		
		this.makeCallback = this.makeCallback.bind(this);
		this.getHint = this.getHint.bind(this);
		this.correctInput = this.correctInput.bind(this);
		this.nextWord = this.nextWord.bind(this);
		this.compileJsx = this.compileJsx.bind(this);
	}
	
	componentWillMount()
	{
		
	}
	
	componentDidMount()
	{
		
	}
	
	getHint()
	{
		this.setState(
		{
			focusField:true,
			hintCount:this.state.hintCount+1
		});
	}
	
	correctInput()
	{
		this.setState(
		{
			wordSolved:true
		});
	}
	
	nextWord()
	{
		if (this.state.currWordNum+1 === this.wordListA.length)
		{
			this.timeout = setTimeout(this.makeCallback,10);
			
			this.setState(
			{
				blurField:true
			});
		}
		else
		{
			this.setState(
			{
				wordSolved:false,
				currWordNum:this.state.currWordNum+1,
				hintCount:0
			});
		}
	}
	
	makeCallback(e)
	{
		this.timeout = null;
		this.completeCallback();
	}
	
	compileJsx()
	{
		var jsx = <div>
					<HUD
						wordAmount={this.wordListA.length}
						currWordNum={this.state.currWordNum}
						categoryTitle={this.categoryTitle}
						hintCallback={this.getHint}
						menuCallback={this.menuCallback}
					/>
					<Puzzle
						word={this.wordListA[this.state.currWordNum]}
						hintCount={this.state.hintCount}
						solved={this.state.wordSolved}
						callback={this.nextWord}
					/>
					<PuzzleInput
						word={this.wordListA[this.state.currWordNum]}
						focusField={this.state.focusField}
						blurField={this.state.blurField}
						callback={this.correctInput}
					/>
				  </div>
		
		return jsx;
	}
	
	
	
	render()
	{
		var jsx = this.compileJsx();
		
		return(
			<div id={'gameScreenContainer'}>
				{jsx}
			</div>
		);
	}
}

export default GameScreen;