import React from "react";
import { BrowserRouter } from "react-router-dom";

export const Providers: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <BrowserRouter basename="/Task-Manager-T1-lager">
            {children}
        </BrowserRouter>
    );
};
