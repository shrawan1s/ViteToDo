import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { logout, fetchUserData } from '../app/slices/authSlice';
import { isToken } from '../utility/AuthUtility';
import { useAppDispatch } from '../app/hooks/hook';
import { GetUserResponse } from '../utility/UserAuth';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [userData, setUserData] = useState<GetUserResponse | null>(null);

    const onLogout = async () => {
        dispatch(logout());
        navigate('/');
    };

    const fetchUser = async (token: string) => {
        try {
            const data = await dispatch(fetchUserData(token)).unwrap();
            setUserData(data as GetUserResponse);
        } catch (error) {
            console.error('Failed to fetch user data:', error);
        }
    };

    useEffect(() => {
        const token = isToken();
        if (token) {
            fetchUser(token);
        }
    }, []);

    return (
        <nav className="bg-gray-800 py-4 px-8 flex justify-between items-center fixed top-0 w-full z-10">
            <div>
                <h1 className="text-white text-2xl font-bold">ToDo</h1>
            </div>
            <div className="flex items-center text-white">
                {isToken() ? (
                    <>
                        <div className='mobile:w-24 tablet:w-auto overflow-hidden whitespace-nowrap text-ellipsis flex-shrink-0'>
                            {userData && userData.user && (
                                <span className='mx-1'>{userData.user.firstName} {userData.user.lastName}</span>
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
