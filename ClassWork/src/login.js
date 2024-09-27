import React, { useState } from "react";


function Login() {

    const [uid, setUid] = useState("");
    const [pwd, setPassword] = useState("");
    const [message, setMessage] = useState("");

    function buttonClick() {

       if(uid == "admin"  && pwd == "admin123")
       {
            setMessage("Welcome to Admin");

       }
       else
       {
            setMessage("Invalid Uer Id or Password");
       }
       
    }

   

    return (
        <>
            <h3>Working with State in React JS</h3>
            <hr />

            <fieldset>
                <legend>User Login</legend>
                User Name :
                <input type="text"  onChange={(e) =>  setUid(e.target.value)}  /> 
                <br /> <br />

                Password :
                <input type="password"  onChange={(e) =>  setPassword(e.target.value)}  /> 
                <br /> <br />

                <input type="button" onClick={buttonClick} value="Login" />
                <p>{message}</p>
            </fieldset>
        </>

    );
}

export default Login;