import { Link, useNavigate } from "react-router-dom";
import MainLogo from "../assets/svg/MainLogo";

const Header = ({ user, setUser, setToken }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    setUser(null);
    setToken(null);
    navigate("/");
  };
  return (
    <header>
      <div className="container">
        <Link to="/" className="mainLogo">
          <MainLogo />
          OdinBlog
        </Link>
        <nav>
          <ul>
            {user ? (
              <>
                <li>
                  <Link to="/posts">Posts</Link>
                </li>
                <details className="dropdown">
                  <summary>Hi {user.name.split(" ")[0]}!</summary>
                  <ul>
                    <li>
                      <Link href="#" onClick={handleLogout}>
                        Logout
                      </Link>
                    </li>
                  </ul>
                </details>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/sign-up">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
