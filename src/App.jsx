import { Route, Routes, Link, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import Post from "./components/Post";
import Posts from "./components/Posts";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(localStorage.getItem("token"));

  const protectRoute = (component) => {
    return user ? component : <Navigate to="/login" />;
  };
  const redirectLoggedInUser = (component) => {
    return user ? <Navigate to="/posts" /> : component;
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  }, [user, token]);
  return (
    <>
      <Header user={user} setUser={setUser} setToken={setToken}/>
      <main>
        <Routes>
          <Route path="/" element={redirectLoggedInUser(<Home />)} />
          <Route
            path="/login"
            element={redirectLoggedInUser(
              <Login setUser={setUser} setToken={setToken} />
            )}
          />
          <Route path="/sign-up" element={redirectLoggedInUser(<SignUp />)} />
          <Route path="/posts">
            <Route index element={protectRoute(<Posts token={token} />)} />
            <Route path="new" element={protectRoute(<CreatePost />)} />
            <Route
              path=":postId"
              element={protectRoute(<Post token={token} user={user} />)}
            />
            <Route path=":postId/edit" element={protectRoute(<EditPost />)} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
