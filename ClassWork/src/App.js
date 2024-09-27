// import React from 'react';
import Login from './login';
import AjaxDemo2 from './AjaxDemo2';
import AjaxDemo3 from './AjaxDemo3';
import React, { useState } from 'react';
import Demo from './ReactHookAdv/Demo';

//UseContextHooks
export var userDetailsContext  = React.createContext(null);

function App() {
  //UseContextHooks
  // let [userObj, setUserObj] = useState({ name : "Scott", age : 25, email : "scott@gmail.com"});
   
  //   return (
  //     <div style={{margin:"10px", border:"2px solid Blue"}}>  
  //       <h3>This is the Parent Component</h3>    
  //       <hr/>
  //       <userDetailsContext.Provider  value={userObj}>
  //         <Demo/>
  //       </userDetailsContext.Provider>  
          
  //     </div>
  //   );

  return (
    // <div style={{ textAlign: "center" }} >
    //   <h3>Welcome to SPA using React JS</h3>
    //   <img src="/Images/Banner.jpg" width="90%" height="250" alt="Alternate text" />
    // </div>
    <>
    {/* <AjaxDemo3/> */}
    <Demo/>
    </>
    
  );
}

export default App;