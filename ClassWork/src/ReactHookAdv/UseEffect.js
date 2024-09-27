import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Demo(props) {

  // Create State using useState
  const [customersArray, setCustomers] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {         
      let url  = "https://www.w3schools.com/angular/customers.php";
      axios.get(url).then( (resData) => {          
         alert("API is Called --- Effect hook is invoked");
      });
  }, [count]);

 
 function button_click() {
  
    let x  = count;
    x++;
    setCount(x);
 }  
 


  let resultsArray  = customersArray.map( item =>  
    <tr>
      <td>  {item.Name} </td>
      <td>  {item.City} </td>
      <td>  {item.Country} </td>
    </tr>);
   


  return <div>  
          <h3>Usage of React Hooks in Functional Component</h3>
          <hr/>

             <input type="button" onClick={button_click}  value="Update Count"  />
             <h3>{count}</h3>
             <br/> 
             <br/> 
             <table border="2"> 
                <tr>
                  <th>Customer Name</th>
                  <th>City Name</th>
                  <th>Country Name</th>
                </tr>

                {resultsArray}  
            </table> 

        </div>;
}

export default Demo;