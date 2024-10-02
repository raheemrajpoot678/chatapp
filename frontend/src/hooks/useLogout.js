import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuthContext } from "@/context/AuthContext";

export default function useLogout() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { setUser } = useAuthContext();

  async function logout() {
    setLoading(true);

    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (data.status === "fail") throw new Error(data.message);
      toast({
        title: "Success",
        description: data.message,
      });
      localStorage.removeItem("chat-user");
      setUser("");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  }
  return { loading, logout };
}
