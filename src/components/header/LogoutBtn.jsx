import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';


function LogoutBtn(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logoutHandler = async () => {
        try {
            await authService.logOut();
            dispatch(logout());
            navigate('/login');

        } catch (error) {
            console.log(error, "error");

        }
    }

    return (
        <div>
            <button className="text-white font-semibold px-4 py-2 rounded-md nav-btn transition duration-300 transition duration-300 hover:scale-105 transition-transform nav-bar-text" style={{ backgroundColor: props.bg ? props.bg : "" }} onClick={logoutHandler}>Logout</button>
        </div>
    )
}

export default LogoutBtn
