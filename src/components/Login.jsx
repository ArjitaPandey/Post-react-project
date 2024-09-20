import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button, Logo, Input } from "../components/index";
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';
import LoginImage from "../assets/images/LoginImage.jpg";
import Loader from "../components/Loader";
import { motion } from 'framer-motion'; 

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");
    const [loading,setLoading] = useState(true);

    const login = async (data) => {
        setError("");
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = authService.getCurrentUser();
                if (userData) {
                    dispatch(authLogin(userData));
                    navigate("/");
                }
            }
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); // Set loader duration to 2 seconds

        return () => clearTimeout(timer); 
    }, []);


    if (loading) {
        return <Loader />;
    }

    return (
        <div className="flex h-[90vh]">
            {/* Left Side: Image */}
            <div className="hidden md:block w-1/2 bg-cover bg-center" style={{backgroundImage : `url(${LoginImage})`}}>
            <motion.div
                    style = {{backgroundColor:'#9149ff'}}
                    className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 text-white rounded-lg shadow-lg glowing-border"
                    initial={{ opacity: 0, y: -400, x:-100 }}
                    animate={{ opacity: 1, y: -280 , x:-100}}
                    transition={{ duration: 1, ease: "easeOut" }}
                    >
                <p className="text-center">Sign in using your credentials!</p>
                </motion.div>
            </div>

            {/* Right Side: Form */}
            <div className="flex items-center justify-center w-full md:w-1/2 bg-gradient-to-br from-[#c4a6ff] to-[#f699ff] p-8">
                <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
                    {/* Logo Section */}
                    <div className="mb-6 flex justify-center">
                        <span className='inline-block w-full max-w-[100px]'>
                            <Logo width="100%" />
                        </span>
                    </div>
                    {/* Heading */}
                    <h2 className='text-center text-3xl font-bold text-gray-900'>Sign in to your Account</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Don&apos;t have an account?&nbsp;
                        <Link to="/signup" className="font-medium links hover:underline">
                            Sign Up
                        </Link>
                    </p>

                    {/* Error Message */}
                    {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

                    {/* Form */}
                    <form onSubmit={handleSubmit(login)} className='mt-6 space-y-5'>
                        {/* Email Input */}
                        <Input
                            label="Email:"
                            placeholder="Enter your email"
                            type="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                            {...register("email", {
                                required: "Email is required",
                                validate: {
                                    matchPattern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be valid",
                                }
                            })}
                        />
                        {/* Password Input */}
                        <Input
                            label="Password:"
                            placeholder="Enter your password"
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                            {...register("password", { required: "Password is required" })}
                        />
                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full btn-bg text-white py-2 rounded-lg transition duration-300 ease-in-out"
                        >
                            Sign in
                        </Button>
                    </form>

                    {/* Forgot Password */}
                    <p className="mt-6 text-center text-sm text-gray-600">
                        <Link to="/forgot-password" className="links hover:underline">
                            Forgot password?
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
