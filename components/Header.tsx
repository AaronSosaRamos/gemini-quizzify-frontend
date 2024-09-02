"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Quizzify", href: "/quizzify" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <header className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-6">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/">
              <span className="flex items-center cursor-pointer">
                <motion.span
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="ml-3 text-2xl font-bold text-white"
                >
                  Gemini Quizzify
                </motion.span>
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-10 items-center">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-base font-medium text-white hover:text-yellow-300 transition duration-300"
                >
                  {item.name}
                </motion.span>
              </Link>
            ))}
          </nav>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="ml-4 text-white hover:text-yellow-300 focus:outline-none"
            >
              {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          className="md:hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <span
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-500 transition duration-300"
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
}
