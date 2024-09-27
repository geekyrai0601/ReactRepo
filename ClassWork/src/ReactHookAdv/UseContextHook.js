import GrandChild from "./GrandChild";

function Demo(props) {     

 
  return (
          <div style={{margin:"10px", border:"2px solid Green"}}>  
          <h3>This is Child Component</h3>
          <hr/>

          <GrandChild />
        

        </div>);
}

export default Demo;