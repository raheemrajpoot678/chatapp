import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { setUser } = useAuthContext();
  const navigate = useNavigate();

  async function login({ username, password }) {
    setLoading(true);
    // sign in logic goes here
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await res.json();

      if (data.status === "fail") throw new Error(data.message);
      toast({
        title: "Success",
        description: data.message,
      });
      localStorage.setItem("chat-user", JSON.stringify(data.data));
      setUser(data.data);
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  }
  return { loading, login };
}
