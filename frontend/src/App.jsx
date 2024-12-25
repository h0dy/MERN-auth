import { Route, Routes } from "react-router-dom";
import FloatingShape from "./components/FloatingShape";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
function App() {
  return (
    <div className="app">
      <FloatingShape
        color="bg-purple-500"
        size="w-64 h-64"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingShape
        color="bg-indigo-500"
        size="w-48 h-48"
        top="70%"
        left="80%"
        delay={3}
      />
      <FloatingShape
        color="bg-violet-500"
        size="w-28 h-28 "
        top="40%"
        left="-10%"
        delay={6}
      />
      <Routes>
        <Route path="/" element={"home"} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
