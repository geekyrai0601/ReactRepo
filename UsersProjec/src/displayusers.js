import axios from 'axios';
import { useState } from 'react';
import UserCard from './usercards';

function DisplayUsers(){
    const[userarray,setusersarray]=useState([''])
    
    function OnButtonClick(){
        let url = "https://reqres.in/api/users";

        axios.get(url).then((resData) =>  
        {
           // console.log(resData.data);
           // console.log(resData.data.records);
            setusersarray(resData.data.data);
            
        });
        let users =userarray

  }


return (
    <>
        <hr/>
          <button  onClick={OnButtonClick}>Get User Data</button>
        <hr/> 

        <UserCard/>
    </>
    );
}


export default DisplayUsers
