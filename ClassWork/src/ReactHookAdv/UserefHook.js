import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';

function Demo(props) {

  // Create State using useState
  const [customersArray, setCustomers] = useState([]);
  const [count, setCount] = useState(1);
  const [city, setCity] = useState("");

  const refList1 = useRef(null);

  useEffect(() => {         
      let url  = "https://www.w3schools.com/angular/customers.php";
      axios.get(url).then( (resData) => {          
         alert("API is Called --- Effect hook is invoked");
         if(city == "")
            setCustomers(resData.data.records);
         else
          setCustomers(resData.data.records.filter(item => item.City == city));  
      });
  }, [city]);

 
 function button_click() {
  
    let x  = count;
    x++;
    setCount(x);
 }  

 function updateCity() {    
    setCity(refList1.current.value);
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

             Select City :  
              <select ref={refList1}  onChange={updateCity}>
                  <option value="">All Cities</option>
                  <option value="Berlin">Berlin</option>
                  <option value="London">London</option>
                  <option value="Mannheim">Mannheim</option>
              </select> 
          <span>City :  {city}</span>
          <br/><br/>
             <input type="button" onClick={button_click}  value="Update Count"  />
             <span>Counter :  {count}</span>
             <br/> 
             <br/> 
             <table border="2" width="500"> 
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