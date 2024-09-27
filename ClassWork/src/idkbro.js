//json-server --watch --port 3500 db_emps_depts.json
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function reportsHOC(InputComponent, inputData) {

  return (props) => {

    let [data, setData] = useState([]);
    let columns = inputData.columns;
    let headers = inputData.header;

    useEffect(() => {
      axios.get(inputData.Url)
        .then(
          (result) => {
            setData(result.data);
            console.log(result.data);
          }
        );
    }, []);

    return (
      <InputComponent>
        <div>
          <h2>{headers}</h2>

          <table border="2" cellSpacing="0">
            <thead>
              <tr>
                {columns.map(c => (
                  <th>{c}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.map(item => (
                <tr>
                  {columns.map(col => (
                    <td>{item[col]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </InputComponent>
    );

  }




}

function Reports(props) {

  function getCurrentDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    return today;
  }

  return (<div>
    <p style={{ textAlign:"center",   padding: "2px", backgroundColor: "green", color: "white" }}>Report Header : Sun Life Global Solutions </p>

    {props.children}

    <p style={{ textAlign:"center",   padding: "2px", backgroundColor: "purple", color: "white" }}>
      Report footer -- Generated at {getCurrentDate() } </p>
  </div>);
}

const EmployeeReports = reportsHOC(Reports,
  {
    Url: 'http://localhost:4500/emps',
    columns: ['empno', 'ename', 'deptno'],
    header: 'Employee Data'
  });

const DeptReports = reportsHOC(Reports,
  {
    Url: 'http://localhost:3500/depts',
    columns: ['deptno', 'dname', 'loc'],
    header: 'Dept Data'
  });


function App() {
  return (
    <React.Fragment>
      <h3>Usage of Higher Order Components in React</h3>
      <hr />
      <EmployeeReports></EmployeeReports>
      <hr />
      <DeptReports></DeptReports>
    </React.Fragment>
  );
}

export default App;
