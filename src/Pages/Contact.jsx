import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been submitted. We'll get back to you soon.");
    // 👉 Integrate backend API or EmailJS here
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Title + Intro */}
      <h1 className="text-3xl md:text-4xl font-bold text-center">Contact Us</h1>
      <p className="text-center text-gray-600 mt-4 px-4 max-w-2xl mx-auto">
        Whether you're a donor, volunteer, or someone in need — we'd love to hear from you.
      </p>

      {/* Static Info */}
      <div className="flex flex-col lg:flex-row justify-around items-center mt-12 gap-8 text-center">
        <div>
          <h2 className="text-lg font-semibold">📧 Email</h2>
          <p className="text-gray-600">dharanidharand28@gmail.com</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">📞 Phone</h2>
          <p className="text-gray-600">+91 98765 43210</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">📍 Address</h2>
          <p className="text-gray-600">LN Patti, Sankarapuram, Kallakurichi, Tamil Nadu, India</p>
        </div>
      </div>

      {/* Contact Form */}
      <form
        className="max-w-xl mx-auto mt-16 bg-gray-100 p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Your Name</label>
          <input
            type="text"
            name="name"
            className="w-full px-4 py-2 rounded border"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Your Email</label>
          <input
            type="email"
            name="email"
            className="w-full px-4 py-2 rounded border"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Message</label>
          <textarea
            name="message"
            className="w-full px-4 py-2 rounded border"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
