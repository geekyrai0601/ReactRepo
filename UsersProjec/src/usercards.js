import React, { useState } from 'react';
import axios from 'axios';
import './usercards.css'; 

const UserCards = () => {
    const [users, setUsers] = useState([]);
    
    const fetchUsers = async () => {
            let url ="https://reqres.in/api/users";
            axios.get(url).then((resData) =>  
                {

                    setUsers(resData.data.data);
                });
        
    };

    return (
        <div>
            <button onClick={fetchUsers}>Get Users</button>
            <div className="user-cards">
                {users.map(user => (
                    <div className="card" key={user.id}>
                        <img src={user.avatar} className="avatar" />
                        <h2> {user.first_name} {user.last_name}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserCards;
