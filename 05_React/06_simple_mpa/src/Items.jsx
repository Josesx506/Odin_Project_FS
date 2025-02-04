import { Link, Outlet } from "react-router-dom"; //hidden imports - Navigate, useParams

const Items = () => {
  // const { name } = useParams();
  
  // List of valid profile names
  // const validProfiles = ["popeye", "spinach"];

  // Redundant redirect to a default or home page
  // if (!validProfiles.includes(name)) {
  //   return <Navigate to="/profile/popeye" replace />;
  // }

  return (
    <div>
      <h1>Hello from items page!</h1>
      <p>So, how are you?</p>
      <hr />
      <h2>The items visited is here:</h2>
      <div style={{display:"flex", justifyContent:"space-between", width: "200px", margin:"0 auto"}}>
        {/* Note how empty space in links is used to simulate empty id route e.g. /items/0/popeye */}
        <Link to="/items/ /popeye">Popeye</Link>    
        <Link to="/items/ /spinach">Spinach</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Items;
