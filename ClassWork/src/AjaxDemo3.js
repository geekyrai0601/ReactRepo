import { useState } from 'react';
import { dataSericeObj } from './data.service';
import { configure } from '@testing-library/react';
 

function  AjaxDemo3()
{
    const [deptno, setDeptno] = useState("");
    const [dname, setDname] = useState("");
    const [loc, setLoc] = useState("");

  const [deptsArray, setDeptsArray] = useState([]); 

  function getDeptsClick()
  {
       dataSericeObj.getAllDepartments().then((resData) =>  
        {          
            setDeptsArray(resData.data);
        });
   }

   function addDeptClick()
   {
        let deptObj = {};
        deptObj.deptno = deptno;
        deptObj.dname = dname;
        deptObj.loc = loc;

        dataSericeObj.addDepartment(deptObj).then( (resData) => 
        {
            alert("New Dept Added to server");
            getDeptsClick();
            clearFields();
        });
   }


   function deleteDeptClick(dno)
   {
       if(window.confirm("Do you want to Delete?"))
       {
            dataSericeObj.deleteDepartment(dno).then( (resData) => 
                {
                    alert("Selected Dept deleted from server");
                    getDeptsClick();                   
                });
       }
   }

   function selectDeptClick(dno)
   {
    dataSericeObj.getDepartmentById(dno).then( (resData) => 
    {
        let deptObj = resData.data;
        setDeptno(deptObj.deptno);
        setDname(deptObj.dname);
        setLoc(deptObj.loc);
    });
      
   }

   function updateDeptClick()
   {
        let deptObj = {};
        deptObj.deptno = deptno;
        deptObj.dname = dname;
        deptObj.loc = loc;

        dataSericeObj.editDepartment(deptObj).then( (resData) => 
        {
            alert("Dept details are updated in server");
            getDeptsClick();
            clearFields();
        });
   }


   function clearFields(){
        setDeptno("");
        setDname("");
        setLoc("");
   }


  var result =  deptsArray.map( (item, index) => 
  <tr key={index}>  
     <td> {item.deptno}  </td> 
     <td> {item.dname}  </td> 
     <td> {item.loc}  </td> 
     <td align='center'>
        
        <a href="javascript:void(0);" onClick={() => selectDeptClick(item.deptno)}>Select</a> |
        <a href="javascript:void(0);" onClick={() => deleteDeptClick(item.deptno)}>Delete</a>
     </td>
  </tr>);

    return (
        <>
          <h3>Server Communication in React JS</h3>
          <hr/>

          <input placeholder="Deptno" type="text"
                value={deptno} onChange={(e) => setDeptno(e.target.value)} />

            <input placeholder="Dname" type="text"
                value={dname} onChange={(e) => setDname(e.target.value)} />

            <input placeholder="Loc" type="text"
                value={loc} onChange={(e) => setLoc(e.target.value)} />
          <hr/>
          <button  onClick={getDeptsClick}>Get All Depts</button>
          <button  onClick={addDeptClick}>Add Dept </button>
          <button  onClick={updateDeptClick}>Update Dept </button>
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

export default AjaxDemo3