import axios from 'axios';

export let dataSericeObj = 
{
     
    getAllEmployee,
    getEmployeeById,
    addEmployee,
    editEmployee,
    deleteEmployee     
};

let url =  "http://localhost:3500/emp/";

 

function  getAllEmployee(){
    
    return axios.get(url);
}


function  getEmployeeById(id){
     
    return axios.get(url+ id);
}

function  addEmployee(empObj){
    
    return axios.post(url, empObj);
}

function  editEmployee(empObj){     
    return axios.put(url + empObj.empno, empObj);
}


function  deleteEmployee(id){     
    return axios.delete(url + id);
}