import React from "react";

function DeptDetails() {
    let deptarray = [
        { deptno: 10, dname: "Accounts", loc: "blr" },
        { deptno: 20, dname: "Sales", loc: "Hyd" },
        { deptno: 30, dname: "PR", loc: "gur" },
    ];
    let result =   deptarray.map( (item, index) => {

        return (
            <tr key={index}>
                <td>{item.deptno}</td>
                <td>{item.dname}</td>
                <td>{item.loc}</td>
            </tr>
        );
    
      });

    return (
        <table border = "2" width="2">
            <thead>
                <tr>
                    <th>Dept No</th>
                    <th>Department Name</th>
                    <th>Location</th>
                </tr>
            </thead>
            <tbody>
                {result}
            </tbody>
        </table>
    );
}

export default DeptDetails;
