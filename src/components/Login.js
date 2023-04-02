import { useEffect, useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import { loginApi } from './services/UserService';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [loadingApi, setLoadingApi] = useState(false);
    const { loginContext } = useContext(UserContext);

    const navigate = useNavigate();

    // useEffect(() => {
    //     let token = localStorage.getItem('token');
    //     if (token) {
    //         navigate('/');
    //     }
    // }, []);

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error('email/password is required');
            return;
        }
        setLoadingApi(true);
        let res = await loginApi(email.trim(), password);
        if (res && res.token) {
            loginContext(email, res.token);
            navigate('/users');
        } else {
            //error
            if (res && res.status === 400) {
                toast.error(res.data.error);
            }
        }
        setLoadingApi(false);
    };

    const handlePressEnter = (event) => {
        if (event && event.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <>
            <Container>
                <div className="login-container col-12 col-sm-4">
                    <div className="title">Login</div>
                    <div className="text">Email or Users (eve.holt@reqres.in)</div>

                    <input
                        type="text"
                        placeholder="Email or username..."
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <div className="input-2">
                        <input
                            type={isShowPassword === true ? 'text' : 'password'}
                            placeholder=""
                            value={password}
                            onKeyDown={(event) => handlePressEnter(event)}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <i
                            onClick={() => setIsShowPassword(!isShowPassword)}
                            className={isShowPassword === true ? 'fa-solid fa-eye ' : 'fa-solid fa-eye-slash '}
                        ></i>
                    </div>

                    <button
                        onClick={handleLogin}
                        className={email && password ? 'active' : ''}
                        disabled={email && password ? false : true}
                    >
                        {loadingApi && <i className="fas fa-sync fa-spin"></i>} Login
                    </button>
                    <div className="back">
                        <i className="fa-solid fa-angles-left"></i>
                        <Link to="/"> Go back </Link>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Login;
