import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import BackgroundMotion from "./components/BackgroundMotion";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <div className="app">
      <BackgroundMotion />
      <Routes>
        <Route path="/" element={"home"} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
