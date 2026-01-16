import { useEffect } from "react";

const Login = () => {
  useEffect(() => {
    const login = async () => {
      try {
        const response = await fetch(
          "https://staging.tezintel.com/api/accounts/login/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: "jobate2673@mv6a.com",
              password: "12345678h.",
              rememberMe: false,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Login failed");
        }

        const data = await response.json()
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        localStorage.setItem("user", JSON.stringify({
          user_id: data.user_id,
          email: data.email,
          fullName: data.fullName,
          user_type: data.user_type,
        }));

        console.log("Login successful");
      } catch (error) {
        console.error("Login error:", error);
      }
    };

    login();
  }, []);

  return null; 
};

export default Login;
