import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const [dialogMsg, setDialogMsg] = useState(""); // ✅ Dialog state

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", form);
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setDialogMsg("Login successful!"); // ✅ Replace alert
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setDialogMsg(err.response?.data?.msg || "Login failed"); // ✅ Replace alert
      setForm({ email: "", password: "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          value={form.email}
          required
          className="p-2 border rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={form.password}
          required
          className="p-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-500 text-white py-2 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm mt-2">
          New user?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Register here
          </span>
        </p>

        {/* ✅ Slogan */}
        <h2 className="text-lg text-center text-gray-600 mb-4 italic bg-gray-300 p-5 rounded-lg mt-5">
          "Rescue food, restore hope – every login brings change."
        </h2>
      </form>

      {/* ✅ Dialog Box */}
      {dialogMsg && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <p className="mb-4">{dialogMsg}</p>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => setDialogMsg("")}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
