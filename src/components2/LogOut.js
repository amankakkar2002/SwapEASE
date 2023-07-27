import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

const LogOut = () => {
    const navigate = useNavigate();
    useEffect(() => {
        fetch('https://swap-ease-backend.vercel.app/logout', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
            credentials: 'include'
        })
            .then((res) => {
                navigate('/login', { replace: true });
                if (!res.status === 200) {
                    const error = new Error(res.error);
                    throw error;
                } else {
                    localStorage.removeItem("userToken"); // Remove the token from local storage after successful logout
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }, [navigate]);

    return (
        <>
            <h4 align='center' className='demo2'> Logging out....</h4>
        </>
    )
}

export default LogOut;
