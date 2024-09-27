import React, { useState } from 'react';

function Demo(props) {

  const [uname, setUser] = useState("Scott");
  const [email, setEmail] = useState("scott@gmail.com");


  function button_click() {
      setUser("smith");
      setEmail("smith@gmail.com");
  }

  return <div>          
             User Name  : {uname}   <br/>
             User Email : {email}  <br/>
             <input type="button" onClick={button_click}  value="Update"  />
        </div>;
}

export default Demo;