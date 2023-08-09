import { Route, Routes } from "react-router-dom";
import AdminSignIn from "./pages/AdminSignIn";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div>
      {/* <AdminSignIn /> */}

      <Routes>
        <Route path="/" element={<AdminSignIn/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </div>
  );
}

export default App;
