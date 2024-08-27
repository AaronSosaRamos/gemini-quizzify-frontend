export default function CircleSpinner() {
  return (
    <div className="flex items-center justify-center h-10">
      <svg
        className="animate-spin h-8 w-8 text-gray-700 dark:text-gray-300" // Cambiar color basado en el modo oscuro/claro
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        ></path>
      </svg>
    </div>
  );
}
