import logo from './logo.svg';
import './App.css';
import UserCard from './usercards';
import AjaxDemo1 from './ajaxdemo1';
import DisplayUsers from './displayusers';
import UserCards from './usercards';
function App() {
const users = [];
  return (
    // <div className="card-container">
    //         {users.map((user, index) => (
    //             <UserCard key={index} user={user} />
    //         ))}
    //     </div>
    <>
        {/* <AjaxDemo1/> */}
        {/* <DisplayUsers/> */}
        <UserCards/>
    </>
  );
}

export default App;
