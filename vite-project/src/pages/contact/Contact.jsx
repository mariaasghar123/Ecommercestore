import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import FeatureList from "../home/Features";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";

export default function Contact() {
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(fireDB, "messages"), {
        name,
        email,
        subject,
        message,
        createdAt: serverTimestamp(),
      });

      alert("✅ Your message has been sent successfully!");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error("Error saving message: ", error);
      alert("❌ Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="px-4 md:px-10 py-10 max-w-screen-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-sm font-semibold">Contact With Us</p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            You can ask us questions
          </h2>
          <p className="mt-2 text-sm text-gray-600 max-w-xl mx-auto">
            Contact us for all your questions and opinions, or you can solve your
            problems in a shorter time with our contact offices.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid md:grid-cols-2 gap-10 mb-10">
          {/* Office Info */}
          <div>
            <h3 className="font-bold text-lg mb-2">Our Offices</h3>
            <p className="text-sm text-gray-600 mb-6">
              On deakande mynduart mora även om slurkfart. Semidake timraheen rena.
              Radiogen passam inte loba kävn om perade i garanterad traditionell
              specialist til te bebel. Ev is shönde. Tun gen-visst att egligt. Diligra
              treck dra. Ens blov dyreis.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              {/* United States Office */}
              <div>
                <p className="font-semibold text-sm">United States Office</p>
                <p className="text-xs text-gray-600">
                  205 Middle Road, 2nd Floor, New York
                </p>
                <p className="text-sm mt-1">+02 1234 567 88</p>
                <p className="text-sm text-blue-600">info@example.com</p>
              </div>

              {/* Munich Office */}
              <div>
                <p className="font-semibold text-sm">Munich States Office</p>
                <p className="text-xs text-gray-600">
                  205 Middle Road, 2nd Floor, New York
                </p>
                <p className="text-sm mt-1">+5 456 123 22</p>
                <p className="text-sm text-blue-600">contact@example.com</p>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-6">
              <span className="text-gray-600 text-sm">Follow us:</span>
              <FaFacebookF className="text-blue-600 cursor-pointer" />
              <FaTwitter className="text-blue-400 cursor-pointer" />
              <FaInstagram className="text-pink-600 cursor-pointer" />
              <FaLinkedinIn className="text-blue-700 cursor-pointer" />
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Your name *"
                className="w-full border border-gray-400 rounded px-4 py-2 text-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Your email *"
                className="w-full border border-gray-400 rounded px-4 py-2 text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <input
              type="text"
              placeholder="Subject *"
              className="w-full border border-gray-400 rounded px-4 py-2 text-sm"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />

            <textarea
              rows="5"
              placeholder="Your message"
              className="w-full border border-gray-400 rounded px-4 py-2 text-sm"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>

            <button
              type="submit"
              disabled={loading}
              className={`bg-purple-700 font-bold text-white px-6 py-2 rounded hover:bg-purple-800 ${
                loading && "opacity-50 cursor-not-allowed"
              }`}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>

      {/* Feature Section Adjusted Below Grid */}
      <div className="mt-10 w-full">
        <FeatureList />
      </div>
    </>
  );
}
