import { Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/posts" element={<Posts/>}/>
          <Route path="/posts/:postId" element={<Post />} />
          <Route path="/new-post" element={<NewPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
