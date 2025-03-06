import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="container">
      <Link to="/" className="mainLogo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.5em"
          height="1.5em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M3 3v18h18V3zm15 15H6v-1h12zm0-2H6v-1h12zm0-4H6V6h12z"
          />
        </svg>
        OdinBlog
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/posts">Posts</Link>
          </li>
        </ul>
      </nav>

      </div>
    </header>
  );
};

export default Header;
