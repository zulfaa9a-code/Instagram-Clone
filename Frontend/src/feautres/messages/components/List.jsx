import  { useState, useEffect } from 'react'
import "./list.scss"
import { getallUsers } from '../services/getallusers.api';
const List = ({setSelectedUser}) => {
 const [users, setUsers] = useState([]);

    useEffect(() => {

        async function fetchUsers() {
            try {
                const data = await getallUsers();
                console.log("Complete API response:", data);
console.log("Users:", data.users);
                console.log("All users:", data.users.username);
                setUsers(data.users);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchUsers();
    }, []);
  return (
    <div className="user-list">
        {users.map(user=>{
       return (
         <div key={user._id} className="user"
           onClick={() => setSelectedUser(user)}>
          <img src={user.profileImg}></img>
            <p>{user.username}</p>
         </div>
       )
    })}
    </div>     
  )
}

export default List