import axios from 'axios';

export let dataSericeObj = 
{
     
    getAllDepartments,
    getDepartmentById,
    addDepartment,
    editDepartment,
    deleteDepartment     
};

let url =  "http://localhost:3500/depts/";

 

function  getAllDepartments(){
    
    return axios.get(url);
}


function  getDepartmentById(id){
     
    return axios.get(url+ id);
}

function  addDepartment(deptObj){
    
    return axios.post(url, deptObj);
}

function  editDepartment(deptObj){     
    return axios.put(url + deptObj.deptno, deptObj);
}


function  deleteDepartment(id){     
    return axios.delete(url + id);
}