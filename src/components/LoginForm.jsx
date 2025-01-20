import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [greeting, setGreeting] = useState('');
    const [darkMode, setDarkMode] = useState(false);
    
    const toastRef = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        setUsernameError('');
        setPasswordError('');

        let valid = true;

        if (!username) {
            setUsernameError('Username is required.');
            valid = false;
        } else if (username.length < 3) {
            setUsernameError('Username must be at least 3 characters long.');
            valid = false;
        }

        if (!password) {
            setPasswordError('Password is required.');
            valid = false;
        } else if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters long.');
            valid = false;
        } else if (!/[A-Z]/.test(password)) {
            setPasswordError('Password must contain at least one uppercase letter.');
            valid = false;
        } else if (!/[0-9]/.test(password)) {
            setPasswordError('Password must contain at least one number.');
            valid = false;
        } else if (!/[!@#$%^&*]/.test(password)) {
            setPasswordError('Password must contain at least one special character.');
            valid = false;
        }

        if (!valid) return;

        console.log('Logging in with', username, password, 'Remember Me:', rememberMe);
    };

    const getGreeting = () => {
        const hours = new Date().getHours();
        if (hours < 12) return 'Good Morning';
        if (hours < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    useEffect(() => {
        const greetingMessage = getGreeting();
        setGreeting(greetingMessage);

        const timer = setTimeout(() => {
            setShowToast(true);
        }, 2500); // Reduced delay to 2.5 seconds

        return () => clearTimeout(timer);
    }, []);

    const closeToast = () => {
        setShowToast(false);
    };

    const toggleDarkMode = () => {
        setDarkMode(prev => !prev);
    };

    const backgroundClass = darkMode ? 'bg-gray-900' : 'bg-gray-100';
    const textClass = darkMode ? 'text-gray-300' : 'text-gray-800';
    const inputClass = darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300';
    const hospitalNameClass = darkMode ? 'text-green-400' : 'text-gray-900';

    return (
        <div className={`relative flex flex-col items-center justify-center min-h-screen transition duration-300 ${backgroundClass}`} style={{ backgroundImage: `url(https://images.pexels.com/photos/4006979/pexels-photo-4006979.jpeg?auto=compress&cs=tinysrgb&w=1200)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <motion.div 
                className={`relative z-10 w-full max-w-md p-4 transition-opacity duration-700 ease-in-out ${textClass}`}
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.5 }}
            >
                <header className="flex flex-col items-center mb-8">
                    <motion.img
                        src={logo}
                        alt="Hopewell Hospital Logo"
                        className="h-16 mb-2"
                        loading="lazy"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0 }}
                    />
                    <motion.h1
                        className={`text-3xl font-bold text-center text-green-400 ${hospitalNameClass}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Hopewell Hospital
                    </motion.h1>
                </header>

                {/* Dark Mode Toggle Button */}
                <motion.button 
                    onClick={toggleDarkMode} 
                    className={`absolute top-4 right-4 p-2 rounded-full transition duration-300 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
                    aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    transition={{ duration: 0.3, delay: 0.4 }}
                >
                    {darkMode ? '☀️' : '🌙'}
                </motion.button>

                <motion.form 
                    onSubmit={handleSubmit} 
                    className={`p-6 rounded-lg shadow-lg w-full transition-transform duration-300 ease-in-out ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                    aria-labelledby="login-form"
                    initial={{ y: 20, opacity: 0 }} 
                    animate={{ y: 0, opacity: 1 }} 
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <motion.div 
                        className="mb-6"
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        transition={{ duration: 0.5, delay: 0.8 }}
                    >
                        <label className={`block font-medium mb-1 ${textClass}`} htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            aria-invalid={!!usernameError}
                            className={`mt-1 block w-full p-3 border ${usernameError ? 'border-red-500' : ''} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out ${inputClass}`}
                            aria-describedby="username-error"
                        />
                        {usernameError && <p id="username-error" className="text-red-500 text-sm mt-1">{usernameError}</p>}
                    </motion.div>
                    <motion.div 
                        className="mb-6"
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        transition={{ duration: 0.5, delay: 1 }}
                    >
                        <label className={`block font-medium mb-1 ${textClass}`} htmlFor="password">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                aria-invalid={!!passwordError}
                                className={`mt-1 block w-full p-3 border ${passwordError ? 'border-red-500' : ''} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out ${inputClass}`}
                                aria-describedby="password-error"
                            />
                            <button 
                                type="button" 
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-blue-600 transition duration-150 ease-in-out"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        {passwordError && <p id="password-error" className="text-red-500 text-sm mt-1">{passwordError}</p>}
                    </motion.div>
                    
                    {/* Modern Checkbox with Tick */}
                    <motion.div 
                        className="flex items-center mb-6"
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        transition={{ duration: 0.5, delay: 1.2 }}
                    >
                        <input
                            type="checkbox"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="hidden"
                        />
                        <label htmlFor="rememberMe" className="flex items-center cursor-pointer">
                            <div className={`relative w-6 h-6 border-2 rounded-md flex items-center justify-center transition duration-300 ${rememberMe ? 'border-blue-600 bg-blue-600' : 'border-gray-300 bg-white'}`}>
                                {rememberMe && (
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </div>
                            <span className={`ml-2 ${textClass}`}>Remember Me</span>
                        </label>
                    </motion.div>

                    <motion.button 
                        type="submit" 
                        className={`w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-150 ease-in-out`}
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        transition={{ duration: 0.5, delay: 1.4 }}
                    >
                        Login
                    </motion.button>
                    <motion.p className={`text-center mt-4 ${textClass}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.6 }}>
                        <a href="#" className="hover:underline">Forgot Password?</a>
                    </motion.p>
                </motion.form>

                <motion.footer 
                    className={`w-full text-center mt-8 p-6 rounded-lg shadow-lg transition duration-300 ${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-800'}`}
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ duration: 0.5, delay: 2 }}
                >
                    <motion.h2 
                        className={`text-lg font-bold ${textClass}`}
                        initial={{ y: 20, opacity: 0 }} 
                        animate={{ y: 0, opacity: 1 }} 
                        transition={{ duration: 0.5, delay: 2.2 }}
                    >
                        Stay Connected
                    </motion.h2>
                    <div className="flex justify-center space-x-4 mt-2">
                        <motion.a 
                            href="https://facebook.com" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={`text-2xl transition duration-200`} 
                            style={{ color: '#3b5998' }} 
                            aria-label="Facebook"
                            whileHover={{ scale: 1.1 }}
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            transition={{ duration: 0.5, delay: 2.4 }}
                        >
                            <i className="fab fa-facebook-f"></i>
                        </motion.a>
                        <motion.a 
                            href="https://twitter.com" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={`text-2xl transition duration-200`} 
                            style={{ color: '#1DA1F2' } } 
                            aria-label="Twitter"
                            whileHover={{ scale: 1.1 }}
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            transition={{ duration: 0.5, delay: 2.6 }}
                        >
                            <i className="fab fa-twitter"></i>
                        </motion.a>
                        <motion.a 
                            href="https://instagram.com" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={`text-2xl transition duration-200`} 
                            style={{ color: '#C13584' }} 
                            aria-label="Instagram"
                            whileHover={{ scale: 1.1 }}
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            transition={{ duration: 0.5, delay: 2.8 }}
                            onAnimationComplete={() => setShowToast(true)} // Show toast after Instagram animation
                        >
                            <i className="fab fa-instagram"></i>
                        </motion.a>
                        <motion.a 
                            href="https://linkedin.com" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={`text-2xl transition duration-200`} 
                            style={{ color: '#0077B5' } } 
                            aria-label="LinkedIn"
                            whileHover={{ scale: 1.1 }}
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            transition={{ duration: 0.5, delay: 3 }}
                        >
                            <i className="fab fa-linkedin-in"></i>
                        </motion.a>
                    </div>
                    <p className={`mt-4 ${textClass}`}>
                        &copy; {new Date().getFullYear()} Hopewell Hospital. All rights reserved.
                    </p>
                    <p className={`mt-1 ${textClass}`}>
                        Contact us: <a href="mailto:contact@hospital.com" className="hover:underline">hopewell@hospital.com</a>
                    </p>
                    <p className={`mt-1 ${textClass}`}>
                        <a href="/policy.pdf" target="_blank" rel="noopener noreferrer" className="hover:underline">Privacy Policy</a>
                    </p>
                </motion.footer>

                {showToast && (
                    <motion.div 
                        ref={toastRef} 
                        className="fixed top-5 right-5 bg-blue-600 text-white p-4 rounded-md shadow-md transition-transform transform opacity-90 flex items-center justify-between" 
                        initial={{ y: -20, opacity: 0 }} 
                        animate={{ y: 0, opacity: 1 }} 
                        transition={{ duration: 0.5, delay: 0.5 }} // Adjusted delay for toast
                    >
                        <span>{greeting}, Welcome to the Hopewell Hospital!</span>
                        <button 
                            onClick={closeToast} 
                            className="ml-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-700 transition duration-200 focus:outline-none" 
                            aria-label="Close notification"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default LoginForm;