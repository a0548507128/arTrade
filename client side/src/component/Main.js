import { Link, useNavigate } from "react-router-dom";
import myImage from '../image/logo.jpg';
function Main() {
  let navigate = useNavigate();
  let current = localStorage.getItem("user_id");
  
  function remove() {
    localStorage.removeItem("user_id");
    navigate("/");
  }
 
  return (
    <div>
      <nav>
        <img  src={myImage} className="myLogo"/>
        {current?<button onClick={remove} className="butTitle" >
          יציאה
        </button>:<></>}
        {!current?<Link to={`/LogIn`} className="butTitle" >
          כניסה
        </Link>:<></>}
        <br />
        {!current?<Link to={`/SignUp`} className="butTitle">
          הרשמה
        </Link>:<></>}
        <br />
        {current?<Link to={`/`} className="butTitle" >
          לדף הראשי
        </Link>:<></>}
        <br />
        {current?<Link to={`/UserPage`}  className="butTitle">דף משתמש</Link>:<></>}
      </nav>
    </div>
    
  );
}

export default Main;
