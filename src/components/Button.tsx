import React from 'react';

interface ButtonProps {
    type: 'submit' | 'button' | 'reset';
    label: string;
}

const Button: React.FC<ButtonProps> = ({ type, label }) => {
    return (
        <button
            type={type}
            className="w-full bg-[#9DB8FF] text-white py-2 rounded hover:bg-[#8aa7ff] focus:outline-none focus:ring-2 focus:ring-[#9DB8FF]"
        >
            {label}
        </button>
    );
}

export default Button;
