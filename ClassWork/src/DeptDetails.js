import './DeptDetails.css';

function DeptDetails(props) {


    function removeDept_child()
    { 
        if(window.confirm("Do you want to delete?"))
        {
            let dno = props.deptObj.deptno;
            // alert("From Child : " + dno);
             props.onDeptRemove(dno);   // Invokes removeDept_parent() method 
        } 
    }
  

    return (
        <>
            <div className="card">
                <h3 style={{ margin: "2px", color: "Red" }}>
                    {props.deptObj.dname} </h3>
                <u> Deptno : {props.deptObj.deptno} </u>  <br />
                Location : <span style={{ color: "Green" }}> {props.deptObj.loc} </span>   <br />
                <a href="javascript:void(0);" onClick={removeDept_child}>Remove</a>
            </div>
        </>
    );
}

export default DeptDetails;