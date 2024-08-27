"use client";

import { motion } from "framer-motion";
import { FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {

  return (
    <footer className="bg-gradient-to-r from-purple-600 via-blue-500 to-green-400">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <h2 className="text-white text-xl font-bold">Gemini Quizzify</h2>
            <p className="text-gray-100 mt-4">Multiple Choice Assessment Generator</p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
            <h2 className="text-white text-xl font-bold">Contact Us</h2>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center text-gray-100 hover:text-white transition duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
                <a href="mailto:u20204320@gmail.com">U20204320@gmail.com</a>
              </li>
              <li className="flex items-center text-gray-100 hover:text-white transition duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                  />
                </svg>
                <span>+51 953 236 810</span>
              </li>
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}>
            <h2 className="text-white text-xl font-bold">Follow Us</h2>
            <ul className="mt-4 space-y-2">
              <li className="text-gray-100 hover:text-white transition duration-300">
                <a href="https://twitter.com/geminidynamo" target="_blank" rel="noopener noreferrer">
                  <FaTwitter className="inline-block mr-2" />
                  Twitter
                </a>
              </li>
              <li className="text-gray-100 hover:text-white transition duration-300">
                <a href="https://linkedin.com/company/geminidynamo" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="inline-block mr-2" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </motion.div>
        </div>
        <div className="mt-8 border-t border-gray-600 pt-8 text-gray-100 text-center">
          © 2024 Gemini Quizzify. All rights reserved. Made by: Wilfredo Aaron Sosa
          Ramos
        </div>
      </div>
    </footer>
  );
}
