import { Link, Outlet } from "react-router-dom";

const Profile = () => {
  return (
    <div>
      <h1>Hello from profile page!</h1>
      <p>So, how are you?</p>
      <hr />
      <h2>The profile visited is here:</h2>
      <div style={{display:"flex", justifyContent:"space-between", width: "200px", margin:"0 auto"}}>
        <Link to="/profile/popeye">Popeye</Link>
        <Link to="/profile/spinach">Spinach</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Profile;
