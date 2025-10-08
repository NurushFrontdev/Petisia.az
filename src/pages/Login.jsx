import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "../css/Login.scss";

function Login() {
  const handleSuccess = (response) => {
    const token = response.credential;
    const user = jwtDecode(token);

    console.log("Google token:", token);
    console.log("User info:", user);

    localStorage.setItem("googleToken", token);
    localStorage.setItem("googleUser", JSON.stringify(user));

    const userId = user.sub;
    if (!localStorage.getItem(`signedCampaigns_${userId}`)) {
      localStorage.setItem(`signedCampaigns_${userId}`, JSON.stringify([]));
    }
    if (!localStorage.getItem(`startedCampaigns_${userId}`)) {
      localStorage.setItem(`startedCampaigns_${userId}`, JSON.stringify([]));
    }
  };

  const handleError = () => {
    console.error("Google login failed");
  };

  return (
    <div className="login-page">
      <h1 className="login-title">Xoş gəlmisiniz</h1>
      <h2 className="login-subtitle">Giriş et</h2>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </div>
  );
}

export default Login;
