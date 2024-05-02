import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Navbar: React.FC = () => {
    // const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('token');

    const handleLogout = () => {
        // localStorage.removeItem('token');
        // Redirect to the login page after logout
        // navigate('/');
        console.log("Logged out");
    };

    return (
        <nav className="bg-gray-800 py-4 px-8 flex justify-between items-center fixed top-0 w-full z-10">
            {/* Left side: Logo */}
            <div>
                <h1 className="text-white text-2xl font-bold">ToDo</h1>
            </div>

            {/* Right side: User info or sign-in/up */}
            <div className="flex items-center text-white">
                {isLoggedIn &&
                    <>
                        <span>Jhone Doe</span>
                        <FontAwesomeIcon icon={faUser} className="text-xl mr-2 mx-3" />
                        <FontAwesomeIcon icon={faRightFromBracket} onClick={handleLogout} className="text-xl mr-2 mx-3 cursor-pointer" />
                    </>
                }
            </div>
        </nav>
    );
};

export default Navbar;
