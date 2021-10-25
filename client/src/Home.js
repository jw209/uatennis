import React from 'react';
import axios from 'axios';

class Home extends React.Component {

    state = {
      isSubmitted: '',
      // data to be saved
      p1fname: '',
      p1lname: '',
      p2fname: '',
      p2lname: '',
      p1won: '',
      p2won: '',
      date: ''
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
        p1fname: this.state.p1fname,
        p1lname: this.state.p1lname,
        p2fname: this.state.p2fname,
        p2lname: this.state.p2lname,
        p1won: this.state.p1won,
        p2won: this.state.p2won,
        date: this.state.date
      }
  
      axios({
          url: '/api/saveGame',
          method: 'POST',
          data: payload
        })
        .then(() => {
          console.log('Data has been sent');
          this.resetUserInputs();
          this.setState({
            isSubmitted: 'Game is now under review'
          })
        })
        .catch(() => {
          console.log('Internal server error');
        })
    }
  
    resetUserInputs = () => {
      this.setState({
        p1fname: '',
        p1lname: '',
        p2fname: '',
        p2lname: '',
        p1won: '',
        p2won: '',
        date: ''
      })
    }
  
    displayStatus = (isSubmitted) => {
      if (isSubmitted === '') return null;
  
      return <h3 style={{marginLeft:"5%", color:"green"}}>{this.state.isSubmitted}</h3>
    }
  
    render() {
      return (
        <div className="Home-page">
          <p className="Intro">Welcome to the University of Akron's official
            tennis club website. Here you can view rankings, get the latest club
            information, and participate in student forms. You should
            also submit your competitive matches through this website.<br></br><br></br>
            Use the forms below to submit a match query! Matches submitted 2 hours after a tennis club meeting will not be considered.
          </p>
          <form onSubmit={this.submit}>
            <h2 style={{color:"white", marginLeft:"5%"}}>Player 1 Statistics</h2>
            <label htmlFor="fName" style={{color:"white", padding:"5%"}}>First Name</label>
            <input type="text" name="p1fname" id="fName" style={{color:"black"}} value={this.state.p1fname} onChange={this.handleChange}></input><br/><br/>
            <label htmlFor="lName" style={{color:"white", padding:"5%"}}>Last Name</label>
            <input type="text" name="p1lname" id="lName" style={{color:"black"}} value={this.state.p1lname} onChange={this.handleChange}></input><br/><br/>
            <label htmlFor="won" style={{color:"white", padding:"5%"}}>Games won</label>
            <input type="text" name="p1won" id="won" style={{color:"black"}} value={this.state.p1won} onChange={this.handleChange}></input><br/><br/>
            <h2 style={{color:"white", marginLeft:"5%"}}>Player 2 Statistics</h2>
            <label htmlFor="fName" style={{color:"white", padding:"5%"}}>First Name</label>
            <input type="text" name="p2fname" id="fName" style={{color:"black"}} value={this.state.p2fname} onChange={this.handleChange}></input><br/><br/>
            <label htmlFor="lName" style={{color:"white", padding:"5%"}}>Last Name</label>
            <input type="text" name="p2lname" id="lName" style={{color:"black"}} value={this.state.p2lname} onChange={this.handleChange}></input><br/><br/>
            <label htmlFor="won" style={{color:"white", padding:"5%"}}>Games won</label>
            <input type="text" name="p2won" id="won" style={{color:"black"}} value={this.state.p2won} onChange={this.handleChange}></input><br/><br/>
            <button className="button">submit</button>
          </form>
          <div>{this.displayStatus(this.state.isSubmitted)}</div>
        </div>
      )
    } 
  }

  export default Home;