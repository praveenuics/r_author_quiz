import React from "react";
import { withRouter } from "react-router-dom";
import "./AddAuthorForm.css";

class AuthorForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            imageUrl: "Images/authors/male.jpg",
            books: [],
            bookTemp:''
        };
        this.onFieldChange = this.onFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddBook = this.handleAddBook.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }
    handleReset(e){
        this.setState({
            name: '',
            imageUrl: "Images/authors/male.jpg",
            books: [],
            bookTemp:''
        })
    }
    handleAddBook(e){
        this.setState({
            books: this.state.books.concat(this.state.bookTemp),
            bookTemp:''
        });
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.onAddAuthor(this.state)
    }
    onFieldChange(ev){
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }
    render(){
        
        return <form onSubmit={this.handleSubmit}>

        <div className="row">
            <div className="col-9">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.onFieldChange}/>
                </div>   
            </div>
            <div className="col-9">
                <div className="form-group">
                    <label htmlFor="imageUrl">Image URL</label>
                    <input type="text" className="form-control" name="imageUrl" value={this.state.imageUrl} onChange={this.onFieldChange} disabled={true} />
                </div>  
            </div>
            <div className="col-9">
                    <label htmlFor="bookTemp">Books</label>
                    {this.state.books.map((book) => <p key={book}>{book}</p>)}
                <div className="input-group mb-3">
                    <input type="text" className="form-control" name="bookTemp" value={this.state.bookTemp} onChange={this.onFieldChange}/>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" onClick={this.handleAddBook}>+</button>
                    </div>
                </div>
            </div>
            <div className="col-9">
                <button type="submit" className="btn btn-primary mr-2" value="Add">Add</button>
                <button type="button" className="btn btn-primary" value="reset" onClick={this.handleReset}>Reset</button>
            </div>
        </div>
        </form>
    }
}

const prevUrl = withRouter((history)=> {
    history.push('/');
})

function AddAuthorForm({onAddAuthor}) {
    return (
        
      <div className="container-fluid">
            <div className="row">
                <div className="col-8 offset-3">
                    <div className="row">
                        <div className="col-8">
                            <h1 className="pull-left">Add Author</h1></div>
                        <div className="col-1 mt-2">
                            <button type="button" className="btn btn-primary pull-right" value="home" onClick={prevUrl}>
                                <i className="fa fa-home"></i>
                            </button></div>
                    </div>
                    <AuthorForm onAddAuthor={onAddAuthor}/>
                </div>
            </div>
      </div>
    );
  }

  export default AddAuthorForm;