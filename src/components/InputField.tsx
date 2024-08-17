import React from 'react';

interface InputFieldProps {
    id: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: () => void;
}

const InputField: React.FC<InputFieldProps> = ({ id, type, placeholder, value, onChange, onFocus }) => {
    return (
            <input
                type={type}
                id={id}
                name={id}
                className="w-full px-3 py-4 border border-[#C4C4C4] rounded focus:outline-none focus:ring-1 focus:ring-[#9DB8FF] placeholder-gray-600"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                required
            />
    );
}

export default InputField;
