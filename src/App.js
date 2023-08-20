import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminSignIn from "./pages/AdminSignIn";
import Dashboard from "./pages/Dashboard";
import Protected from "./components/Protected";
import { useState } from "react";
import ImagePage from "./pages/ImagePage";
import SubmitForm from "./pages/SubmitForm";
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
              path="/"
              element={<AdminSignIn setisLoggedIn={setisLoggedIn} />}
            />

            <Route path="/image" element={<ImagePage />} />

            <Route path="/submitForm" element={<SubmitForm />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
