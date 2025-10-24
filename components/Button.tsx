
import React, { ReactNode } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="bg-pink-500 text-white font-bold py-4 px-10 text-2xl rounded-full shadow-lg transform transition-transform hover:scale-105 hover:bg-pink-600 focus:outline-none focus:ring-4 focus:ring-pink-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
};

export default Button;
