import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { logout, fetchUserData } from '../app/slices/authSlice';
import { isToken } from '../utility/AuthUtility';
import { useAppDispatch, useAppSelector } from '../app/hooks/hook';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const userData = useAppSelector((state) => state.auth.user);

    const onLogout = async () => {
        dispatch(logout());
        navigate('/');
    };

    useEffect(() => {
        const token = isToken();
        if (token) {
            dispatch(fetchUserData(token));
        }
    }, [dispatch]);

    return (
        <nav className="bg-gray-800 py-4 px-8 flex justify-between items-center fixed top-0 w-full z-10">
            <div>
                <h1 className="text-white text-2xl font-bold">ToDo</h1>
            </div>
            <div className="flex items-center text-white">
                {userData ? (
                    <>
                        <div className='overflow-hidden whitespace-nowrap text-ellipsis flex-shrink-0 max-w-xs'>
                            {userData && (
                                <span className='mx-1'>{userData.firstName} {userData.lastName}</span>
                            )}
                        </div>
                        <FontAwesomeIcon icon={faUser} className="text-xl mr-2 mx-3" />
                        <FontAwesomeIcon
                            className="text-xl mr-2 mx-3 cursor-pointer"
                            icon={faSignOutAlt}
                            onClick={onLogout}
                        />
                    </>
                ) : null}
            </div>
        </nav>
    );
};

export default Navbar;
