import { Loader } from "lucide-react";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AppLayout from "./pages/AppLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import SignUp from "./pages/Signup";
import { useAuthStore } from "./store/useAuthStore";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore() as {
    authUser: any;
    checkAuth: () => void;
    isCheckingAuth: boolean;
  };

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  console.log("authUser", authUser);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={authUser ? <AppLayout /> : <Navigate to="/login" />}
        >
          <Route path="" element={<Home />} />
          <Route
            path="profile"
            element={authUser ? <Profile /> : <Navigate to="/login" />}
          />
        </Route>
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUp /> : <Navigate to="/" />}
        />
        <Route path="/settings" element={<Settings />} />

        {/* <Route path="/dashboard" element={<Dashboard />} />
         */}
        {/* <Route path="/logout" element={<Logout />} /> */}
        {/* <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/verify-email-sent" element={<VerifyEmailSent />} /> */}
      </Routes>
    </>
  );
}

export default App;
