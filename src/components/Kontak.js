import React, { useState } from "react";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = { name: "", email: "", phone: "", message: "" };

    if (!formData.name) formErrors.name = "Nama wajib diisi.";
    if (!formData.email) formErrors.email = "Email wajib diisi.";
    if (!formData.phone) formErrors.phone = "Nomor HP wajib diisi.";
    if (!formData.message) formErrors.message = "Pesan wajib diisi.";

    setErrors(formErrors);

    if (
      !formErrors.name &&
      !formErrors.email &&
      !formErrors.phone &&
      !formErrors.message
    ) {
      setIsLoading(true); 
      try {
        await axios.post("http://localhost:5000/api/contacts", formData);
        setIsSubmitted(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
      } catch (error) {
        console.error("Kesalahan mengirim pesan:", error);
      } finally {
        setIsLoading(false); 
      }
    }
  };

  if (isLoading) {
    return <LoadingSpinner />; 
  }

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto p-4">
        <h2 className="text-4xl font-semibold text-center text-gray-800 mb-8">
          Kontak Kami
        </h2>
          <div className="flex flex-col md:flex-row gap-12">
            {/* Formulir Kontak */}
            <div className="w-full md:w-1/2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-lg font-semibold text-gray-700"
                  >
                    Nama
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                  {errors.name && (
                    <p className="text-red-600 text-sm">{errors.name}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-lg font-semibold text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm">{errors.email}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="phone"
                    className="block text-lg font-semibold text-gray-700"
                  >
                    Nomor HP
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-sm">{errors.phone}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="message"
                    className="block text-lg font-semibold text-gray-700"
                  >
                    Pesan
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                  {errors.message && (
                    <p className="text-red-600 text-sm">{errors.message}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white w-full rounded-md hover:bg-blue-700"
                >
                  Kirim Pesan
                </button>
              </form>
              {isSubmitted && (
                <div className="mt-6 text-center text-green-600">
                  <p>Terima kasih! Pesan Anda telah terkirim.</p>
                </div>
              )}
            </div>

            {/* Lokasi Sekolah (Maps) */}
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Lokasi Kami
              </h3>
              <div className="w-full h-[450px] rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d494.3979368866981!2d110.85757428450917!3d-7.5549612375899144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a171d23917ed9%3A0xb9460041569d15fd!2sGedung%20Graha%20UKM%20UNS!5e0!3m2!1sid!2sid!4v1742052581004!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Map of Sekretariat UKM Seni Religi UNS"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Contact;
