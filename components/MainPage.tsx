import { FaQuestionCircle, FaTasks, FaFileAlt, FaPencilAlt, FaCalculator } from 'react-icons/fa';
import { IoMdCheckboxOutline } from 'react-icons/io';
import Link from 'next/link';  

export default function MainPage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <div className="flex flex-col items-center justify-center text-center p-10 flex-1">
        <h1 className="text-6xl font-bold mb-4 leading-tight">Gemini Quizzify</h1>
        <p className="text-xl mb-6 max-w-4xl">
          Unleash the power of AI to generate quizzes effortlessly from diverse file types and formats.
        </p>
        <Link href="/quizzify"> 
          <span className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded text-lg transition duration-300">
            Get Started
          </span>
        </Link>
      </div>

      <div className="p-10 flex-1">
        <h2 className="text-4xl font-bold mb-8 text-center">Explore Question Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
          <div className="p-6 hover:bg-gray-800 rounded-lg transition duration-300 ease-in-out">
            <FaQuestionCircle className="mx-auto text-6xl mb-4" />
            <p className="text-xl">Multiple Choice</p>
          </div>
          <div className="p-6 hover:bg-gray-800 rounded-lg transition duration-300 ease-in-out">
            <IoMdCheckboxOutline className="mx-auto text-6xl mb-4" />
            <p className="text-xl">True/False</p>
          </div>
          <div className="p-6 hover:bg-gray-800 rounded-lg transition duration-300 ease-in-out">
            <FaFileAlt className="mx-auto text-6xl mb-4" />
            <p className="text-xl">Open/Ended</p>
          </div>
          <div className="p-6 hover:bg-gray-800 rounded-lg transition duration-300 ease-in-out">
            <FaTasks className="mx-auto text-6xl mb-4" />
            <p className="text-xl">Relate Concepts</p>
          </div>
          <div className="p-6 hover:bg-gray-800 rounded-lg transition duration-300 ease-in-out">
            <FaPencilAlt className="mx-auto text-6xl mb-4" />
            <p className="text-xl">Fill in the Blank</p>
          </div>
          <div className="p-6 hover:bg-gray-800 rounded-lg transition duration-300 ease-in-out">
            <FaCalculator className="mx-auto text-6xl mb-4" />
            <p className="text-xl">Math</p>
          </div>
        </div>
      </div>
    </div>
  );
}
