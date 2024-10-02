import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { Toaster } from "@/ui/components/toaster";
import { useAuthContext } from "./context/AuthContext";

export default function App() {
  const { authUser } = useAuthContext();

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/`" /> : <Signup />}
        />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
