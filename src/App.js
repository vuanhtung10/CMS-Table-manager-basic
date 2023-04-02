import { ToastContainer } from 'react-toastify';
import './App.scss';
import Header from './components/Header';
import AppRoutes from './routes/AppRoutes';
import { useContext, useEffect } from 'react';
import { UserContext } from './context/UserContext';
import { useSelector } from 'react-redux';

function App() {
    const dataUserRedux = useSelector((state) => state.user.account);
    const { user, loginContext } = useContext(UserContext);

    console.log(dataUserRedux);

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
