import React from 'react';

interface ButtonProps {
    type: 'submit' | 'button' | 'reset',
    label: string,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({type, label, onClick, className}) => {
    return (
        <button
            type={type}
            className={`text-white bg-[#9DB8FF] hover:bg-[#8aa7ff] rounded focus:outline-none focus:ring-2 focus:ring-[#9DB8FF] ${className}`}
            onClick={onClick}
        >
            {label}
        </button>
    );
}

export default Button;
