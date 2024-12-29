import { Navigate, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import BackgroundMotion from "./components/BackgroundMotion";
import toast, { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import HomePage from "./pages/HomePage";

//protected route that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  console.log("user object in the ProtectedRoute: ", user);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

// redirect authenticated users to the home page
const RedirectAuthUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  console.log("user object in the RedirectAuthUser: ", user);

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="app">
      <BackgroundMotion />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectAuthUser>
              <SignupPage />
            </RedirectAuthUser>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthUser>
              <LoginPage />
            </RedirectAuthUser>
          }
        />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
