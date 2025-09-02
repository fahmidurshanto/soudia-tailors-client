import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkAuthState } from '../features/auth/authSlice';

const Layout = () => {
    const dispatch = useDispatch();

    // Check authentication state on app startup
    useEffect(() => {
        dispatch(checkAuthState());
    }, [dispatch]);

    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default Layout;