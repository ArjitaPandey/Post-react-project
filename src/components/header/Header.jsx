// import React from 'react';
import { Container, LogoutBtn, Logo } from "../index";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';
import { useNavigate,useLocation } from 'react-router-dom';
import "../../App.css";

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    const location = useLocation(); 

    const navItems = [
        {
            name: 'Home',
            slug: "/",  //url
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Sign Up",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ];

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

                    {/* Navigation Links */}
                    <ul className="hidden md:flex space-x-6 ml-auto">
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        className={`nav-bar-text font-semibold px-4 py-2 rounded-md nav-btn transition duration-300 hover:scale-105 transition-transform ${location.pathname === item.slug ? 'bg-[#9149ff] text-white' : ''}`}
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

                    <div className="md:hidden flex items-center">
                        <button
                            className="nav-bar-text focus:outline-none"
                            onClick={() => console.log('Toggle mobile menu')} 
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
            </Container>
        </header>
    );
}

export default Header;
