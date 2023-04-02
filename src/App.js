import { ToastContainer } from 'react-toastify';
import './App.scss';
import Header from './components/Header';
import AppRoutes from './routes/AppRoutes';
import { useContext, useEffect } from 'react';
import { UserContext } from './context/UserContext';

function App() {
    const { user, loginContext } = useContext(UserContext);

    console.log(user);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            loginContext(localStorage.getItem('email'), localStorage.getItem('token'));
        }
    }, []);

    return (
        <>
            <div className="app-container">
                <Header />
                <AppRoutes />
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}

export default App;
