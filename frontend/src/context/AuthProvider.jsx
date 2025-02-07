import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
export const AuthContext = createContext()
export const AuthProvider = ({ children }) => {
    const [blogs, setBlogs] = useState();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const token = localStorage.getItem("token"); // ✅ Get token from storage
                if (!token) {
                    console.error("No token found. User might not be logged in.");
                    return;
                }
        
                const { data } = await axios.get("http://localhost:4001/api/blogs/all-blogs", {
                    headers: { Authorization: `Bearer ${token}` }, // ✅ Send token
                });
        
                console.log("Blogs fetched successfully:", data);
                setBlogs(data);
            } catch (error) {
                console.error("Error fetching blogs:", error.response ? error.response.data : error);
            }
        };
        
        fetchBlogs();
    }, [])

    return (
        <AuthContext.Provider value={{ blogs }}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext)
