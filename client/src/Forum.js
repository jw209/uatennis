import axios from "axios";
import React from "react";

class Forum extends React.Component {

    state = {
      fname: '',
      lname: '',
      comment: '',
      commentCollection: [],
      date: ''
    }
    
    componentDidMount = () => {
      this.getComment();
    }
  
    getComment = () => {
      axios.get('api/comments')
        .then((response) => {
          const data = response.data;
          this.setState({ commentCollection: data })
          console.log('Data has been retrieved!');
        })
        .catch(() => {
          console.log('Error retrieving data');
        })
    }
  
    handleChange = (event) => {
      const target = event.target;
      const name = target.name;
      const value = target.value;
      const date = new Date();
  
      this.setState({ date })
  
      this.setState({
        [name]: value
      });
    }
  
    submit = (event) => {
      event.preventDefault();
  
      const payload = {
        fname: this.state.fname,
        lname: this.state.lname,
        comment: this.state.comment,
        date: this.state.date
      }
  
      axios({
        url: '/api/saveComment',
        method: 'POST',
        data: payload
      })
        .then(() => {
          console.log('Data has been sent');
          this.getComment();
          this.resetUserInputs();
        })
        .catch(() => {
          console.log('Internal server error');
        })
    }
  
    displayComments = (commentCollection) => {
      if (!commentCollection.length) return null;
  
      commentCollection.sort(function(a, b) {
        if(a.date > b.date) return -1;
        if(a.date < b.date) return 1;
  
        return 0;
      });
  
      return commentCollection.map((comments, index) => (
        <div key={index}>
          <h3>{comments.fname}&nbsp;{comments.lname}&nbsp;<span style={{color:"green"}}>[{comments.date}]</span></h3>
          <p>{comments.comment}</p>
        </div>
      ))
    }
  
    resetUserInputs = () => {
      this.setState({
        fname: '',
        lname: '',
        comment: '',
        date: ''
      })
    }
  
    render() {
  
      console.log('State: ', this.state);
      return (
        <div className="signup">
        <p className="Intro">The forum is a great place to talk about strategy, schedule games with friends,
          and find out the latest news in the UA tennis club!
        </p>
        <form onSubmit={this.submit}>
          <label htmlFor="fName" style={{color:"white", padding:"5%"}}>First Name</label>
          <input type="text" name="fname" id="fName" style={{color:"black"}} value={this.state.fname} onChange={this.handleChange}></input><br/><br/>
          <label htmlFor="lName" style={{color:"white", padding:"5%"}}>Last Name</label>
          <input type="text" name="lname" id="lName" style={{color:"black"}} value={this.state.lname} onChange={this.handleChange}></input><br/><br/>
          <label htmlFor="comment" style={{color:"white", marginLeft:"5%"}}>Whats on your mind?</label><br/><br/>
          <textarea class="comment" name="comment" className="Comment-box" value={this.state.comment} onChange={this.handleChange}></textarea>
          <button className="button">Post</button>
        </form>
        <div className="comment-section">
              {this.displayComments(this.state.commentCollection)}
        </div>
        </div>  
      );
    }
  }

  export default Forum;