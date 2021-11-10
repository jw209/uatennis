import React from "react";

class Login extends React.Component {
    render() {
        return(
            <div>
                <h2 style={{color:"white", marginLeft:"5%", fontWeight:"400"}}>Returning UA Tennis Club member?</h2>
                <form className="loginForm" style={{marginLeft:"5%"}}>
                    <label for="username" style={{color:"white"}}>Email</label><br/>
                    <input type="text" id="username"></input><br/><br/>
                    <label for="username" style={{color:"white"}}>Password</label><br/>
                    <input type="password" id="username"></input><br/>
                    <input className="button" type="submit" value="login" style={{marginLeft:"0%"}}></input>
                </form><br/>
                <h2 style={{color:"white", marginLeft:"5%", fontWeight:"400"}}>New member? Sign up!</h2>
                <form className="signupForm" style={{marginLeft:"5%"}}>
                    <label for="fullname" style={{color:"white"}}>Name</label><br/>
                    <input type="text" id="fullname"></input><br/><br/>
                    <label for="uanetid" style={{color:"white"}}>UA Net ID</label><br/>
                    <input type="text" id="uanetid"></input><br/><br/>
                    <label for="email" style={{color:"white"}}>Email</label><br/>
                    <input type="text" id="email"></input><br/><br/>
                    <label for="password" style={{color:"white"}}>Password</label><br/>
                    <input type="password" id="password"></input><br/><br/>
                    <label for="verpassword" style={{color:"white"}}>Verify Password</label><br/>
                    <input type="password" id="verpassword"></input><br/>
                    <input className="button" type="submit" value="signup" style={{marginLeft:"0%"}}></input>
                </form>
            </div>
        )
    }
}

export default Login;