import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "danger";
};

const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-300 text-gray-800 hover:bg-gray-400",
    danger: "bg-red-500 text-white hover:bg-red-600",
};

const Button: React.FC<ButtonProps> = ({
    children,
    className = "",
    variant = "primary",
    disabled,
    ...props
}) => {
    return (
        <button
            {...props}
            disabled={disabled}
            className={`${
                variantStyles[variant]
            } px-4 py-2 rounded transition ${
                disabled ? "opacity-60 cursor-not-allowed" : ""
            } ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
