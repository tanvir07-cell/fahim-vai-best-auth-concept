import { Route, Routes } from "react-router-dom";
import "./App.css";

import Generator from "./components/Generator/Generator";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Nav from "./components/Nav/Nav";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import Signup from "./components/Signup/Signup";

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/generator"
          element={
            <RequireAuth>
              <Generator></Generator>
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>

        {/* <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> */}
      </Routes>
    </div>
  );
}

export default App;
