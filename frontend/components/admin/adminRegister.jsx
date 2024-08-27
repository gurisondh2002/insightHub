'use client'
import React, { useState } from 'react';
import bgImage from '../../public/bgImage.png';
import loginSignup from '../../public/loginSignup.png';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function Page() {

    const pathname = usePathname();
    const router = useRouter();

    const [signUpData, setSignUpData] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        gender: "",
        profileImage: null
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignUpData({ ...signUpData, [name]: value });
    };

    const handleFileChange = (e) => {
        setSignUpData({ ...signUpData, profileImage: e.target.files[0] });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const validateForm = () => {
        const newErrors = {};

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(signUpData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!signUpData.fullName) newErrors.fullName = "Full Name is required";
        if (!signUpData.email) newErrors.email = "Email is required";
        if (!signUpData.phone) newErrors.phone = "Phone Number is required";
        if (!signUpData.password) newErrors.password = "Password is required";
        if (!signUpData.confirmPassword) newErrors.confirmPassword = "Confirm Password is required";

        if (signUpData.password !== signUpData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        return newErrors;
    };

    const handleUserSignup = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('adminName', signUpData.fullName);
        formData.append('adminEmail', signUpData.email);
        formData.append('adminPhone', signUpData.phone);
        formData.append('adminPassword', signUpData.password);
        formData.append('adminGender', signUpData.gender);
        formData.append('adminProfile', signUpData.profileImage);


        try {
            console.log("HELLEO")

            const validationErrors = validateForm();

            if (!validationErrors) {
                setErrors(validationErrors);
                console.log("HELLEO")
                return;
            }
            console.log("HELLEO")


            const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/admin/register`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log("HELLEO")
            console.log('Admin registered successfully', response.data);

            toast.success("Account Created Successfully, You will be now redirected to login!")
            setTimeout(() => {
                router.push('/');
            }, 5000);
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    toast.error(error.response.data.message);
                } else {
                    console.error('Error during signup:', error);
                    toast.error("Some error occurred while registering your account. Please try again!");
                }
            } else {
                console.error('Error during signup:', error);
                toast.error("Some error occurred while registering your account. Please try again!");
            }
        }
    };

    return (
        <>
            <div
                style={{
                    backgroundImage: `url(${bgImage.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                className='flex flex-col justify-center items-center min-h-screen px-4 py-8'
            >
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    className="w-[600px]"
                />
                <div
                    className='flex flex-col justify-center items-center rounded-md bg-[#E6EEF8] px-10 py-10 shadow-lg xl:w-[60%] lg:w-[80%] md:w-[50%] sm:w-full w-full'
                >
                    <p className='text-3xl text-[#082777] font-semibold mb-4'>InsightHub</p>
                    <div className='flex flex-col lg:flex-row items-center lg:gap-10 gap-4'>
                        <Image src={loginSignup} alt="Login" className='w-[400px] h-[300px] lg:block hidden' />
                        <div className='w-full lg:border-l-2 lg:border-[#D3E2F4] lg:pl-8'>
                            <div className='flex gap-4 mb-8'>
                                <Link href="/">
                                    <p className={`text-[#4B93E7] text-xl ${pathname === "/" ? 'font-semibold text-2xl border-b-2 border-[#F7AC25]' : ''}`}>Login</p>
                                </Link>
                                <Link href="/administrator/register">
                                    <p className={`text-[#4B93E7] text-xl ${pathname === "/administrator/register" ? 'font-semibold text-2xl border-b-2 border-orange-500' : ''}`}>Sign Up</p>
                                </Link>
                            </div>
                            <div className="space-y-6">
                                <div className="relative group">
                                    <input
                                        type="text"
                                        name="fullName"
                                        id="floating_name"
                                        className={`block py-2.5 w-full px-3 text-sm font-semibold text-[#082777] bg-transparent border-0 border-b-2 ${errors.fullName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-0 focus:border-[#4B93E7] peer`}
                                        placeholder=" "
                                        value={signUpData.fullName}
                                        onChange={handleChange}
                                    />
                                    <label
                                        htmlFor="floating_name"
                                        className="absolute text-sm text-[#082777] duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:text-[#082777] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Full Name
                                    </label>
                                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                                </div>
                                <div className="relative group">
                                    <input
                                        type="email"
                                        name="email"
                                        id="floating_email"
                                        className={`block py-2.5 w-full px-3 text-sm font-semibold text-[#082777] bg-transparent border-0 border-b-2 ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-0 focus:border-[#4B93E7] peer`}
                                        placeholder=" "
                                        value={signUpData.email}
                                        onChange={handleChange}
                                    />
                                    <label
                                        htmlFor="floating_email"
                                        className="absolute text-sm text-[#082777] duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:text-[#082777] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Email address
                                    </label>
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>
                                <div className="relative group">
                                    <input
                                        type="text"
                                        name="phone"
                                        id="floating_phone"
                                        className={`block py-2.5 w-full px-3 text-sm font-semibold text-[#082777] bg-transparent border-0 border-b-2 ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-0 focus:border-[#4B93E7] peer`}
                                        placeholder=" "
                                        value={signUpData.phone}
                                        onChange={handleChange}
                                    />
                                    <label
                                        htmlFor="floating_phone"
                                        className="absolute text-sm text-[#082777] duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:text-[#082777] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Phone Number
                                    </label>
                                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                </div>
                                <div className="relative group">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        id="floating_password"
                                        className={`block py-2.5 w-full px-3 text-sm font-semibold text-[#082777] bg-transparent border-0 border-b-2 ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-0 focus:border-[#4B93E7] peer`}
                                        placeholder=" "
                                        value={signUpData.password}
                                        onChange={handleChange}
                                    />
                                    <label
                                        htmlFor="floating_password"
                                        className="absolute text-sm text-[#082777] duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:text-[#082777] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Password
                                    </label>
                                    <div
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <FaEye color='#91BDF5' /> : <FaEyeSlash color='#91BDF5' />}
                                    </div>
                                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                                </div>
                                <div className="relative group">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        id="floating_confirm_password"
                                        className={`block py-2.5 w-full px-3 text-sm font-semibold text-[#082777] bg-transparent border-0 border-b-2 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-0 focus:border-[#4B93E7] peer`}
                                        placeholder=" "
                                        value={signUpData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                    <label
                                        htmlFor="floating_confirm_password"
                                        className="absolute text-sm text-[#082777] duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:text-[#082777] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Confirm Password
                                    </label>
                                    <div
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                        onClick={toggleConfirmPasswordVisibility}
                                    >
                                        {showConfirmPassword ? <FaEye color='#91BDF5' /> : <FaEyeSlash color='#91BDF5' />}
                                    </div>
                                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                                </div>
                                <div className="relative group">
                                    <label htmlFor="gender" className="block text-sm font-medium text-[#082777]">Select Gender</label>
                                    <select
                                        id="gender"
                                        name="gender"
                                        className="bg-transparent border-0 border-b-2 border-gray-300 text-[#082777] text-sm block w-full p-2.5"
                                        value={signUpData.gender}
                                        onChange={handleChange}
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="relative group">
                                    <label className="block text-sm font-medium text-gray-900" htmlFor="profile_image">Upload file</label>
                                    <input
                                        className="block w-full text-sm bg-transparent"
                                        aria-describedby="profile_image_help"
                                        id="profile_image"
                                        type="file"
                                        onChange={handleFileChange}
                                    />
                                </div>
                                <button
                                    className="w-full bg-[#F7AC25] text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    onClick={handleUserSignup}
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}