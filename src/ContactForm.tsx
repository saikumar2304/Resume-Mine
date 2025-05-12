import React, { useState } from "react";
import emailjs from "emailjs-com";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    emailjs.send(
      "your_service_id", // Email to you
      "your_template_id", // Your template ID
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      },
      "your_public_key"
    )
    .then(() => {
      // Send confirmation to user
      return emailjs.send(
        "your_service_id", // same or another service ID
        "user_thanks_template", // new template for sender
        {
          to_name: formData.name,
          to_email: formData.email, // make sure your user template uses {{to_email}} in To field
        },
        "your_public_key"
      );
    })
    .then(() => {
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    })
    .catch(() => setStatus("Failed to send message. Try again later."));
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-4xl font-extrabold text-center text-slate-900 mb-6">
        Contact Me
      </h2>
      <div className="h-1 w-24 bg-indigo-600 mx-auto mb-12"></div>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <label className="block mb-4">
          <span className="text-gray-700">Your Name</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Your Email</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Your Message</span>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500"
            rows={4}
          />
        </label>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
        >
          Send Message
        </button>

        {status && <p className="text-center text-slate-700 mt-4">{status}</p>}
      </form>
    </div>
  );
};

export default ContactForm;