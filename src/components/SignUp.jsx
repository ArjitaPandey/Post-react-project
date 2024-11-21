import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';
import { Button, Input, Logo } from '../components/index';
import SignUpImage from '../assets/images/SignUpImage.png'; // Update with the correct path to your signup image
import { motion } from 'framer-motion'; // Import Framer Motion
import animatedFigure from "../assets/images/animatedGirlImage.png";
import "../App.css";

function SignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const { register, handleSubmit } = useForm();
    const [animationComplete, setAnimationComplete] = useState(false);

    const signUp = async (data) => {
        setError('');
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const currentUser = authService.getCurrentUser();
                if (currentUser) {
                    dispatch(login(currentUser));
                    navigate('/');
                }
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex min-h-screen">
            <div className="relative hidden lg:block w-1/2 bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url(${SignUpImage})` }}>
                <motion.img
                    src={animatedFigure}
                    style={{ height: '25%', zIndex: '100' }}
                    alt="Cute Animated"
                    className="absolute bottom-0 left-0 w-1/3 h-1/3 object-contain opacity-80 girl-popup-container"
                    initial={{ x: '300%', opacity: 0 }}
                    animate={{ x: '200%', opacity: 1 }}
                    transition={{
                        x: {
                            duration: 1, // Duration of the animation
                            ease: 'linear',
                            // onComplete: () => setAnimationComplete(true) // Set state to true once animation completes
                        },
                        opacity: {
                            duration: 1,
                            ease: 'linear'
                        }
                    }}
                    onAnimationComplete={() => setAnimationComplete(true)} // Handle animation completion
                />
                {animationComplete && (
                    <motion.div
                        style={{ backgroundColor: '#9149ff', zIndex: '100' }}
                        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 text-white rounded-lg shadow-lg glowing-border signup-popup-container"
                        initial={{ opacity: 0, y: -100, x: 180 }}
                        animate={{ opacity: 1, y: 90, x: 180 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        <p className="text-center">Sign up with this form!</p>
                    </motion.div>
                )}
            </div>

            {/* Right Side: Form */}
            <div className="flex items-center justify-center w-full lg:w-1/2 bg-gradient-to-br from-[#c4a6ff] to-[#f699ff] p-10">
                <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-10">
                    <div className="mb-6 flex justify-center">
                        <span className="inline-block w-full max-w-[100px]">
                            <Logo width="100%" />
                        </span>
                    </div>
                    <h2 className="text-center text-3xl font-bold text-gray-900 mb-4">
                        Create your Account
                    </h2>
                    <p className="text-center text-sm text-gray-600 mb-6">
                        Already have an account?&nbsp;
                        <Link to="/login" className="font-medium links hover:underline">
                            Sign In
                        </Link>
                    </p>

                    {/* Error Message */}
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                    {/* Form */}
                    <form onSubmit={handleSubmit(signUp)} className="space-y-6 form-container">
                        <div className="relative">
                            <Input
                                label="Full Name:"
                                placeholder="Enter your name"
                                type="text"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                                {...register('name', { required: true })}
                            />
                        </div>

                        <div className="relative">
                            <Input
                                label="Email:"
                                placeholder="Enter your email"
                                type="email"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                                {...register('email', {
                                    required: true,
                                    validate: {
                                        matchPattern: (value) =>
                                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                            'Email address must be valid',
                                    },
                                })}
                            />
                        </div>

                        <div className="relative">
                            <Input
                                label="Password:"
                                placeholder="Enter your password"
                                type="password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                                {...register('password', { required: true })}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full btn-bg text-white py-3 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Create Account
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
