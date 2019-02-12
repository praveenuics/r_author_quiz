import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, withRouter } from "react-router-dom";
import "./index.css";
import AuthorQuiz from "./AuthorQuiz";
import AddAuthorForm from "./AddAuthorForm";
import * as serviceWorker from "./serviceWorker";
import { shuffle, sample } from "underscore";
import 'font-awesome/css/font-awesome.min.css';

const authors = [
  {
    name: "Gandhi",
    imageUrl: "Images/authors/gandhi.jpg",
    imageSource: "Wikimedia Common",
    books: ["Hind Swaraj"]
  },
  {
    name: "A.P.J Abdul Kalam",
    imageUrl: "Images/authors/abdulkalam.jpg",
    imageSource: "Wikimedia Common",
    books: ["Envisioning an Empowered Nation"]
  },
  {
    name: "Nehru",
    imageUrl: "Images/authors/jnehru.jpg",
    imageSource: "Wikimedia Common",
    books: ["The Discovery of India"]
  },
  {
    name: "Vivekananda",
    imageUrl: "Images/authors/vivekananda.jpg",
    imageSource: "Wikimedia Common",
    books: ["Inspired Talks"]
  }
];

function getTurnData(authors) {
  const allBooks = authors.reduce(function(p, c, i) {
    return p.concat(c.books);
  }, []);
  const fourRandomBooks = shuffle(allBooks).slice(0, 4);
  const answer = sample(fourRandomBooks);

  return {
    books: fourRandomBooks,
    author: authors.find(author => author.books.some(title => title === answer))
  };
}

function resetState() {
    return {
        turnData: getTurnData(authors),
        highlight: "none"
      };
}

let state = resetState();

function onAnswerSelected(answer) {
  const isCorrect = state.turnData.author.books.some(book => book === answer);
  state.highlight = isCorrect ? "correct" : "wrong";
  render();
}

function App() {
  return <AuthorQuiz {...state} onAnswerSelected={onAnswerSelected} onContinue={()=> {
      state = resetState();
      render();
  }}/>;
}

const AuthorWrapper = withRouter(({history})=>
    <AddAuthorForm onAddAuthor={(author) => {
        authors.push(author);
        history.push('/');
    }}/>
);

function render() {
  ReactDOM.render(
    <BrowserRouter>
      <React.Fragment>
        <Route exact path="/" component={App} />
        <Route path="/add" component={AuthorWrapper} />
      </React.Fragment>
    </BrowserRouter>,
    document.getElementById("root")
  );
}

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
