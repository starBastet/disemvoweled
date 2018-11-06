import React, {Component} from 'react';
import './Puzzle.css';


class Puzzle extends Component
{
	constructor(props,context)
	{
		super(props,context);
		
		this.state={
			hintCount:this.props.hintCount,
			solved:this.props.solved,
			containerClassName:'',
			wordClassName:''
		};
		
		this.VOWELS_A = ['A','E','I','O','U'];
		
		this.word = this.props.word;
		this.callback = this.props.callback;
		this.disenvoweledWord = '';
		this.hintCount = 0;
		this.timeout = null;
		this.containerElem = null;
		this.wordElem = null;
		
		this.show = this.show.bind(this);
		this.removal = this.removal.bind(this);
		this.resetter = this.resetter.bind(this);
		this.reinit = this.reinit.bind(this);
		this.disenvowelWord = this.disenvowelWord.bind(this);
		this.compileJsx = this.compileJsx.bind(this);
	}
	
	componentWillMount()
	{
		this.disenvowelWord();
	}
	
	componentDidMount()
	{
		this.timeout = setTimeout(this.show,10);
	}
	
	show(e)
	{
		this.setState(
		{
			containerClassName:'show'
		});
	}
	
	componentWillReceiveProps(newProps)
	{
		if (newProps.solved !== this.props.solved)
		{
			var wordClassName = '';
			var containerClassName = this.state.containerClassName;
			if (newProps.solved === true)
			{
				this.timeout = setTimeout(this.removal,1000);
				wordClassName = 'solved';
			}
			else
			{
				this.timeout = setTimeout(this.show,10);
				this.containerElem.style.transition = 'all 500ms';
				this.wordElem.style.transition = 'all 500ms';
				containerClassName = '';
				wordClassName = '';
				this.word = newProps.word;
				this.disenvowelWord(); //newProps.word
			}
			
			this.setState(
			{
				solved:newProps.solved,
				containerClassName:containerClassName,
				wordClassName:wordClassName
			});
		}
		
		if (newProps.hintCount !== this.state.hintCount)
		{
			this.hintCount = newProps.hintCount;
			this.disenvowelWord();
			
			this.setState(
			{
				hintCount:this.hintCount
			});
		}
	}
	
	removal(e)
	{
		this.timeout = null;
		this.timeout = setTimeout(this.resetter,505);
		this.setState(
		{
			containerClassName:'removal'
		});
	}
	
	resetter(e)
	{
		this.timeout = null;
		this.containerElem.style.transition = 'none';
		this.wordElem.style.transition = 'none';
		this.wordElem.style.transform = '(1,1)';
		this.setState(
		{
			containerClassName:'',
			wordClassName:''
		});
		this.timeout = setTimeout(this.reinit,20);
	}
	
	reinit(e)
	{
		this.timeout = null;
		this.callback();
	}
	
	disenvowelWord()
	{
		this.disenvoweledWord = '';
		var wordSplitA = this.word.split('');
		var vowelTally = 0;
		for (var i=0;i<wordSplitA.length;i++)
		{
			var keepLetter = true;
			for (var j=0;j<this.VOWELS_A.length;j++)
			{
				if (wordSplitA[i] === this.VOWELS_A[j])
				{
					vowelTally++;
					if (vowelTally > this.hintCount)
					{
						keepLetter = false;
					}
					break;
				}
			}
			if (keepLetter === true)
			{
				this.disenvoweledWord += wordSplitA[i];
			}
		}
	}
	
	compileJsx()
	{
		var jsx = <div>
					<div id={'puzzleWord'}
						 className={this.state.wordClassName}
						 ref={(elem)=>this.wordElem=elem}
					>
						<p>
							{this.state.solved ? this.word : this.disenvoweledWord}
						</p>
					</div>
				  </div>
		
		return jsx;
	}
	
	shouldComponentUpdate(newProps,newState)
	{
		return newState.solved != this.state.solved || newState.containerClassName != this.state.containerClassName || newState.wordClassName != this.state.wordClassName || newState.hintCount != this.state.hintCount;
	}
	
	render()
	{
		var jsx = this.compileJsx();
		
		return(
			<div 
				id={'puzzleContainer'}
				className={this.state.containerClassName}
				ref={(elem)=>this.containerElem=elem}
			>
				{jsx}
			</div>
		);
	}
}

export default Puzzle;