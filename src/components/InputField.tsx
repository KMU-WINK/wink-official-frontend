import React from 'react';

interface InputFieldProps {
    id: string;
    type: string;
    placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({ id, type, placeholder }) => {
    return (
            <input
                type={type}
                id={id}
                name={id}
                className="w-full px-3 py-4 border rounded focus:outline-none focus:ring-1 focus:ring-[#9DB8FF]"
                placeholder={placeholder}
                required
            />
    );
}

export default InputField;
