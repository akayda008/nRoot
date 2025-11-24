"use client";
import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    iam: "",
    purpose: "",
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({ ...formData}),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data.error);
        setStatus("error");
      } else {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", iam: "", purpose: "" });
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-center">Contact Us</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">

        {/* Name */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* I am */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">I am</label>
          <select
            name="iam"
            required
            value={formData.iam}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select one</option>
            <option value="student">A student</option>
            <option value="buyer">A buyer</option>
            <option value="business">A business</option>
            <option value="parent">A parent</option>
            <option value="educator">An educator</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Purpose */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Purpose of Contact</label>
          <textarea
            name="purpose"
            required
            rows="4"
            value={formData.purpose}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Send Message
        </button>

        {/* Status messages */}
        {status === "loading" && (
          <p className="text-blue-600 text-center">Sending...</p>
        )}
        {status === "success" && (
          <p className="text-green-600 text-center">
            Message sent successfully!
          </p>
        )}
        {status === "error" && (
          <p className="text-red-600 text-center">
            Something went wrong. Try again.
          </p>
        )}
      </form>
    </div>
  );
}
