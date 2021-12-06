import React from "react";

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
          name: "",
          email: "",
          password: "",
          password2: "",
          errors: {}
        };
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        console.log(newUser);
    };

    render() {
        const { errors } = this.state;
        return(
            <div>
                <h2 style={{color:"white", marginLeft:"5%", fontWeight:"400"}}>New member? Sign up!</h2>
                <form className="signupForm" style={{marginLeft:"5%"}}>
                    <label for="name" style={{color:"white"}}>Name</label><br/>
                    <input 
                        type="text" 
                        id="name"
                        onChange={this.onChange}
                        value={this.state.name}
                        error={errors.name}
                    /><br/><br/>
                    <label for="email" style={{color:"white"}}>Email</label><br/>
                    <input 
                        type="email"
                        id="email"
                        onChange={this.onChange}
                        value={this.state.email}
                        error={errors.email}
                    /><br/><br/>
                    <label for="password" style={{color:"white"}}>Password</label><br/>
                    <input 
                        type="password" 
                        id="password"
                        onChange={this.onChange}
                        value={this.state.password}
                        error={errors.password}
                    /><br/><br/>
                    <label for="password2" style={{color:"white"}}>Verify Password</label><br/>
                    <input 
                        type="password" 
                        id="password2"
                        onChange={this.onChange}
                        value={this.state.password2}
                        error={errors.password2}
                    /><br/>
                    <input className="button" type="submit" value="signup" style={{marginLeft:"0%"}}></input>
                </form>
            </div>
        )
    }
}

export default Register;