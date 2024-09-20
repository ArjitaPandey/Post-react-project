import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const authStatus = useSelector((state) => state.auth.status);
    useEffect(() => {
        //true && false !== true
        if (authentication && authStatus !== authentication) {
            navigate("/login");
        }
        //true && true !== true
        else if (!authentication && authStatus !== authentication) {
            navigate("/");
        }
        setLoading(false);
    }, [authStatus, navigate, authentication]);
    return loading ? <h1>Loading...</h1> : children;
}

