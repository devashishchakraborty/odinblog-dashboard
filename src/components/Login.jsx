import { Link } from "react-router-dom";

const Login = ({ setToken }) => {
  const fetchToken = async () => {

  }
  return (
    <section className="loginSection container">
      <h1>Sign in</h1>
      <form onSubmit={fetchToken}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          aria-label="Email"
          autoComplete="email"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          aria-label="Password"
          autoComplete="current-password"
          required
        />
        <fieldset>
          <label htmlFor="remember">
            <input
              type="checkbox"
              role="switch"
              id="remember"
              name="remember"
            />
            Remember me
          </label>
        </fieldset>
        <button type="submit">Login</button>
        <small>Don't have an account? <Link to="/sign-up">Sign Up</Link></small>
      </form>
    </section>
  );
};

export default Login;