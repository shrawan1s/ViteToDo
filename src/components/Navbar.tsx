import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

type NavbarProps = {
    isLoggedIn: boolean;
    onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogout }) => {
    return (
        <nav className="bg-gray-800 py-4 px-8 flex justify-between items-center fixed top-0 w-full z-10">
            <div>
                <h1 className="text-white text-2xl font-bold">ToDo</h1>
            </div>
            <div className="flex items-center text-white">
                {isLoggedIn ? (
                    <>
                        <span>Jhone Doe</span>
                        <FontAwesomeIcon icon={faUser} className="text-xl mr-2 mx-3" />
                        <FontAwesomeIcon
                            icon={faSignOutAlt}
                            onClick={onLogout}
                            className="text-xl mr-2 mx-3 cursor-pointer"
                        />
                    </>
                ) : null}
            </div>
        </nav>
    );
};

export default Navbar;
