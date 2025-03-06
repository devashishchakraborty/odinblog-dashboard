import { Route, Routes, Link } from "react-router-dom";
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
  const [token, setToken] = useState(localStorage.getItem("apiToken"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      const fetchUser = async () => {
        try {
          const response = await fetch(`http://localhost:3000/user`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          setUser(data);
        } catch (err) {
          console.error("Error fetching data:", err);
        }
      };

      fetchUser();
    }
  }, [token]);
  return (
    <>
      <Header user={user}/>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={user ? <Home /> : <Login setToken={setToken}/>} />
          <Route path="/sign-up" element={user ? <Home /> : <SignUp />} />
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
