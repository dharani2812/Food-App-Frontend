import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [dialogMsg, setDialogMsg] = useState(""); // ✅ Dialog message state

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Password must have minimum 8 characters, 1 letter & 1 number
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(form.password)) {
      setDialogMsg(
        "Password must be at least 8 characters long and contain both letters and numbers."
      );
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/register", form);
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setDialogMsg("Registered Successfully!");
      setTimeout(() => navigate("/login"), 1000); // optional small delay
    } catch (err) {
      const msg = err.response?.data?.msg || "Registration Failed";
      setDialogMsg(msg);

      if (msg.toLowerCase().includes("already")) {
        setForm({ name: "", email: "", password: "" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-3xl font-bold mb-6">Register</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
        <input
          name="name"
          type="text"
          placeholder="Name"
          onChange={handleChange}
          value={form.name}
          required
          className="p-2 border rounded"
        />
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
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-sm mt-2">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

        {/* ✅ Slogan */}
        <h2 className="text-lg text-center text-gray-600 mb-4 italic bg-gray-300 p-5 rounded-lg mt-5">
          "Join us in making a difference — Donate, Don’t Waste!"
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

export default Register;
