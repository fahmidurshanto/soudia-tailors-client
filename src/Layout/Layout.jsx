import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkAuthState } from '../features/auth/authSlice';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Layout = () => {
    const dispatch = useDispatch();

    // Check authentication state on app startup
    useEffect(() => {
        dispatch(checkAuthState());
    }, [dispatch]);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <Outlet></Outlet>
            </main>
            <Footer />
        </div>
    );
};

export default Layout;