import React, { useState } from "react";
import { Container, LogoutBtn, Logo } from "../index";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import "../../App.css";

function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { name: "Home", slug: "/", active: true },
        { name: "Login", slug: "/login", active: !authStatus },
        { name: "Sign Up", slug: "/signup", active: !authStatus },
        { name: "All Posts", slug: "/all-posts", active: authStatus },
        { name: "Add Post", slug: "/add-post", active: authStatus },
    ];

    // Animation variants for the mobile menu
    const slideVariants = {
        hidden: { opacity: 0, x: "-100%" },
        visible: { opacity: 1, x: "0%" },
        exit: { opacity: 0, x: "-100%" },
    };

    return (
        <header className="py-4 header-bg shadow-lg">
            <Container>
                <nav className="flex items-center justify-between">
                    {/* Logo Section */}
                    <div className="flex items-center space-x-4">
                        <Link to="/">
                            <Logo width="70px" />
                        </Link>
                    </div>

                    {/* Desktop Navigation Links */}
                    <ul className="hidden md:flex space-x-6 ml-auto">
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        className={`nav-bar-text font-semibold px-4 py-2 rounded-md nav-btn transition duration-300 hover:scale-105 ${location.pathname === item.slug ? "bg-[#9149ff] text-white" : ""
                                            }`}
                                        onClick={() => navigate(item.slug)}
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>

                    {/* Hamburger Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            className="nav-bar-text focus:outline-none"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        </button>
                    </div>
                </nav>

                {/* Mobile Navigation Links with Sliding Effect */}
                {/* Mobile Navigation Links with Sliding Effect */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.ul
                            className="absolute top-16 left-0 w-full bg-[rgba(255,255,255,0.8)] shadow-lg flex flex-col items-center py-4 space-y-4 md:hidden z-50"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={slideVariants}
                            transition={{ duration: 0.3 }}
                        >
                            {navItems.map((item) =>
                                item.active ? (
                                    <li key={item.name}>
                                        <button
                                            className={`nav-bar-text font-semibold px-4 py-2 rounded-md nav-btn transition duration-300 hover:scale-105 ${location.pathname === item.slug
                                                ? "bg-[#9149ff] text-white"
                                                : "bg-[#333] text-white"
                                                }`}
                                            onClick={() => {
                                                navigate(item.slug);
                                                setIsMobileMenuOpen(false); // Close menu after navigating
                                            }}
                                        >
                                            {item.name}
                                        </button>
                                    </li>
                                ) : null
                            )}
                            {authStatus && (
                                <li>
                                    <LogoutBtn bg={"#333"} onClick={() => setIsMobileMenuOpen(false)} />
                                </li>
                            )}
                        </motion.ul>
                    )}
                </AnimatePresence>

            </Container>
        </header>
    );
}

export default Header;
