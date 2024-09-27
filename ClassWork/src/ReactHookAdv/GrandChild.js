import { useContext } from "react";
import { userDetailsContext } from "../App";

function GrandChild(props) {     
    
    var  contextData  = useContext(userDetailsContext);
   
    return <div style={{margin:"10px", border:"2px solid Red"}}>  
            <h3>This is Grand Child Component</h3>       
            <hr/>
  
            <div>
                User Name  :  {contextData.name} <br/>
                User Age  :  {contextData.age} <br/>
                User Email  :  {contextData.email} <br/>
            </div>
  
          </div>;
  }

  export default GrandChild;