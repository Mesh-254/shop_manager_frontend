import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShopManagerLandingPage from "./pages/ShopManagerLandingpage";
import ShopManagerDashboard from "./pages/ShopManagerDashboard";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import EmailVerificationSuccess from "./components/auth/EmailVerificationSuccess";
import EmailExistsPage from "./pages/EmailExistsPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<ShopManagerLandingPage/>} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/email-exists" element={<EmailExistsPage />} />

        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route path="/verification-success" element={<EmailVerificationSuccess/>} />
        <Route path="/verify-email/:token" element={<VerifyEmailPage />} />


        <Route path="/dashboard" element={<ShopManagerDashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
