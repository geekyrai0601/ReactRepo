import { useState } from "react";
import DeptDetails from "./DeptDetails";

function  DeptList()
{
      // Array of Objects
  let data = [
    {deptno : 10, dname : "Accounts",  loc :  "Hyd"} ,
    {deptno : 20, dname : "Sales",  loc :  "Pune"},
    {deptno : 30, dname : "Marketing",  loc :  "Hyd"},
    {deptno : 40, dname : "Operations",  loc :  "Chnnai"},
    {deptno : 50, dname : "Admin",  loc :  "Pune"},
    {deptno : 60, dname : "Finance",  loc :  "Hyd"},
    {deptno : 70, dname : "Testing",  loc :  "Mumbai"}
  ];

  const [deptsArray, setDeptsArray] = useState(data);


    function removeDept_parent(dno)
    {
      //  alert("From Parent : " + dno);
        setDeptsArray(deptsArray.filter(item => item.deptno != dno)  );

    }

  let result =   deptsArray.map( (item, index) => {

    return (
                <DeptDetails deptObj={item}  onDeptRemove={removeDept_parent} />
    );

  });
  
    return (
        <>
			<h3>Working with Array of Objects</h3>

            {result}

        </>
    );
}

export default DeptList;