import React from "react";
import Header from "@/widgets/header/Header";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Header />
            <main className="flex-grow container mx-auto p-4">{children}</main>
            <footer className="bg-white border-t py-4">
                <div className="container mx-auto text-center text-gray-600 text-sm">
                    © {new Date().getFullYear()} Task Manager. Все права
                    защищены.
                </div>
            </footer>
        </div>
    );
};

export default Layout;
