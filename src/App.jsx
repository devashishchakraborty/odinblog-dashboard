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
import { useState } from "react";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user"))); 
  return (
    <>
      <Header user={user} setUser={setUser}/>
      <main>
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/posts" /> : <Home />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/posts" /> : <Login />}
          />
          <Route
            path="/sign-up"
            element={user ? <Navigate to="/posts" /> : <SignUp />}
          />
          <Route path="/posts">
            <Route index element={<Posts />} />
            <Route path="new" element={<CreatePost />} />
            <Route path=":postId" element={<Post />} />
            <Route path=":postId/edit" element={<EditPost />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
