import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Header from "./components/Header";
import UserList from "./components/UserList";
import LoginPage from "./components/LoginPage"

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/user" element={<UserList />} />
        {/* <Route path="/login" element={<LoginPage />} /> */}
      </Routes>

      <Routes>
        <Route path="/loginpage" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;

