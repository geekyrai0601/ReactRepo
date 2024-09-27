import { useState } from 'react';
import { dataSericeObj } from './data.service';

function  AjaxDemo2()
{
  const [deptsArray, setDeptsArray] = useState([]); 

  function buttonClick()
  {
       dataSericeObj.getAllDepartments().then((resData) =>  
        {          
            setDeptsArray(resData.data);
        });
}


  var result =  deptsArray.map( (item, index) => 
  <tr key={index}>  
     <td> {item.deptno}  </td> 
     <td> {item.dname}  </td> 
     <td> {item.loc}  </td> 
  </tr>);

    return (
        <>
          <h3>Server Communication in React JS</h3>
          <hr/>
          <button  onClick={buttonClick}>Get Data</button>
          <hr/>

          <table  border="2"  cellpadding="5"  cellSpacing="0" width="700">
                <tr>
                    <th>Dept Number</th>
                    <th>Dept Name</th>
                    <th>Dept Location</th> 
                </tr>
                {result}
            </table>

        </>
    );
}

export default AjaxDemo2;