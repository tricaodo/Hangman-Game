import React, { Component } from 'react';
import './Hangman.css';
import img1 from './01.png';
import img2 from './02.png';
import img3 from './03.png';
import img4 from './04.png';
import img5 from './05.png';
import img6 from './06.png';
import img7 from './07.png';
import img8 from './08.png';

class Hangman extends Component {
    static defaultProps = {
        imgSrc: [img1, img2, img3, img4, img5, img6, img7, img8],
        maxGuess: 8
    }
    constructor(props) {
        super(props);
        this.state = {
            wrongGuess: 0,
            word: 'apple',
            guessed: new Set(),
            isWon: 0
        }
        this.createButtons = this.createButtons.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    render() {
        return (
            <div>
                <div className="image">
                    <img src={this.props.imgSrc[this.state.wrongGuess]} />
                </div>
                <p>{this.guessedWords()}</p>
                <div className="buttonWord">
                    <p display={this.state.isWon === this.state.word.length ? "none" : "block"}>{this.createButtons()}</p>
                </div>
            </div>
        )
    }

    guessedWords() {
        return this.state.word.split("").map(w => (
            (this.state.guessed.has(w) ? w : "_")
        ));
    }

    createButtons() {
        return "abcdefghijklmnopqrstuvwxyz".split("").map(w => (
            <button key={w} value={w}
                onClick={this.handleClick}
                disabled={this.state.guessed.has(w)}
            >{w}
            </button>
        ))
    }

    handleClick(e) {
        const word = e.target.value;
        const newState = this.state;
        if (!this.state.word.includes(word)) {
            newState.wrongGuess++;
        } else {
            newState.isWon++;
        }
        newState.guessed.add(word);
        this.setState(newState);
        console.log(newState);
    }
}


export default Hangman;