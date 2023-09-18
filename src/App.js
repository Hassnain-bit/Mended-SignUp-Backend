import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminSignIn from "./pages/AdminSignIn";
import Dashboard from "./pages/Dashboard";
import Protected from "./components/Protected";
import { useState } from "react";
import BecomeMender from "./pages/BecomeMender";
import UserCardPage from "./pages/BecomeMenderNew";
import BecomeMenderTableNew from "./pages/BecomeMenderNew";
function App() {
  const [isLoggedIn, setisLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  return (
    <div>
      <BrowserRouter>
        <div>
          <Routes>
            <Route
              path="/dashboard"
              element={
                <Protected isLoggedIn={isLoggedIn}>
                  <Dashboard setisLoggedIn={setisLoggedIn} />
                </Protected>
              }
            />
            <Route
              path="/becomeMender"
              element={
                <Protected isLoggedIn={isLoggedIn}>
                  <BecomeMender setisLoggedIn={setisLoggedIn} />
                </Protected>
              }
            />
            <Route
              path="/becomeMenderNew"
              element={
                <Protected isLoggedIn={isLoggedIn}>
                  <BecomeMenderTableNew setisLoggedIn={setisLoggedIn} />
                </Protected>
              }
            />

            <Route
              path="/"
              element={<AdminSignIn setisLoggedIn={setisLoggedIn} />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
