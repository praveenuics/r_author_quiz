import React, { Component } from "react";
import {Link} from 'react-router-dom';
import logo from "./logo.svg";
import "./App.css";
import "./bootstrap.min.css";

function Hero() {
  return (
    <div className="row">
      <div className="jumbotron col-10 offset-1">
        <h1>Author Quiz</h1>
        <p>Select the book writtern by the author shown</p>
      </div>
    </div>
  );
}

function Book({title, onClick}){
  return (
    <div className="answer" onClick={() => {onClick(title);}}>
      <h4>{title}</h4>
    </div>
  );
}

function Turn({author, books, highlight, onAnswerSelected}) {
  function highlightBgColor(highlight){
    const mapping = {
      'none': '',
      'correct': 'green',
      'wrong': 'red'
    };

    return mapping[highlight];
  }
  return (
    <div className="row turn" style={{backgroundColor: highlightBgColor(highlight)}}>
      <div className="col-3 offset-1">
        <img src={author.imageUrl} className="authorimage" alt="Author" />
      </div>
      <div className="col-7">
        {books.map((title) => <Book title={title} key={title} onClick={onAnswerSelected}/>)}
      </div>
    </div>
  );
}

function Continue({show, onContinue}) {
  return (
    <div className="row">
    {show ? 
      <div className="col-10 offset-1 text-right pt-3 pb-3">
        <button className="btn btn-primary" type="button" onClick={onContinue}>Continue</button>
      </div>:null}
    </div> 
  );
}

function Footer() {
  return (
    <div id="footer" className="row">
      <div className="col-12 offset-1">
        <p className="text-muted credit">
          All images are from different sources
        </p>
      </div>
    </div>
  );
}

function AuthorQuiz({turnData, highlight, onAnswerSelected, onContinue}) {
    return (
      <div className="container-fluid">
        <Hero />
        <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected}/>
        <Continue show={highlight==='correct'} onContinue={onContinue}/>
        <p><Link to="/add">Add an author</Link></p>
        <Footer />
      </div>
    );
}

export default AuthorQuiz;
