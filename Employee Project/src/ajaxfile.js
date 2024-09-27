import { useState } from 'react';
import { dataSericeObj } from './dataservices';
import './ajax.css';  // Import the CSS file

function Ajax() {
    const [empno, setempno] = useState("");
    const [ename, setename] = useState("");
    const [job, setjob] = useState("");
    const [salary, setsalary] = useState("");
    const [deptno, setdeptno] = useState("");
    const [empArray, setemparray] = useState([]);

    function getempClick() {
        dataSericeObj.getAllEmployee().then((resData) => {
            setemparray(resData.data);
        });
    }

    function addEmpClick() {
        let empObj = { empno, ename, salary, job, deptno };

        dataSericeObj.addEmployee(empObj).then(() => {
            alert("New Employee Added to server");
            getempClick();
            clearFields();
        });
    }

    function deleteEmpClick(eno) {
        if (window.confirm("Do you want to Delete?")) {
            dataSericeObj.deleteEmployee(eno).then(() => {
                alert("Selected Employee deleted from server");
                getempClick();
            });
        }
    }

    function selectEmpClick(eno) {
        dataSericeObj.getEmployeeById(eno).then((resData) => {
            let empObj = resData.data;
            setempno(empObj.empno);
            setename(empObj.ename);
            setsalary(empObj.salary);
            setjob(empObj.job);
            setdeptno(empObj.deptno);
        });
    }

    function updateEmpClick() {
        let empObj = { empno, ename, salary, job, deptno };

        dataSericeObj.editDepartment(empObj).then(() => {
            alert("Emp details are updated in server");
            getempClick();
            clearFields();
        });
    }

    function clearFields() {
        setempno("");
        setename("");
        setjob("");
        setsalary("");
        setdeptno("");
    }

    var result = empArray.map((item, index) => (
        <tr key={index}>
            <td className="td">{item.empno}</td>
            <td className="td">{item.ename}</td>
            <td className="td">{item.salary}</td>
            <td className="td">{item.job}</td>
            <td className="td">{item.deptno}</td>
            <td className="td" align='center'>
                <a className="link" onClick={() => selectEmpClick(item.empno)}>Select</a>
                <a className="link" onClick={() => deleteEmpClick(item.empno)}>Delete</a>
            </td>
        </tr>
    ));

    return (
        <div className="container">
            <input className="input" placeholder="empno" type="text"
                value={empno} onChange={(e) => setempno(e.target.value)} />
            <input className="input" placeholder="ename" type="text"
                value={ename} onChange={(e) => setename(e.target.value)} />
            <input className="input" placeholder="job" type="text"
                value={job} onChange={(e) => setjob(e.target.value)} />
            <input className="input" placeholder="salary" type="text"
                value={salary} onChange={(e) => setsalary(e.target.value)} />
            <input className="input" placeholder="deptno" type="text"
                value={deptno} onChange={(e) => setdeptno(e.target.value)} />
            <hr />
            <button className="button" onClick={getempClick}>Get All Employee</button>
            <button className="button" onClick={addEmpClick}>Add Employee</button>
            <button className="button" onClick={updateEmpClick}>Update Employee</button>
            <hr />
            <table className="table">
                <thead>
                    <tr>
                        <th className="th">Employee Number</th>
                        <th className="th">Employee Name</th>
                        <th className="th">Employee Job</th>
                        <th className="th">Employee Salary</th>
                        <th className="th">Employee Deptno</th>
                    </tr>
                </thead>
                <tbody>
                    {result}
                </tbody>
            </table>
        </div>
    );
}

export default Ajax;
