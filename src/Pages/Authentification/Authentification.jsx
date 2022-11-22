import React, { useEffect, useState, useContext } from "react";
import { Navigate, NavLink } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import useLocaleStorage from "../../Hooks/useLocaleStorage";
import './Authentification.css';
import { CurrentUserContext } from "../../contexts/currentUser";
import BackendErrorMessages from "./BackendErrorMessages";

const Authentification = (props) => {
    const isLogin = props.matchPath === '/login';
    const pageTitle = isLogin ? 'Sign In' : 'Sign Up';
    const descriptionLink = isLogin? '/register' : '/login';
    const descriptionText = isLogin ? 'Need an account?' : 'Have an account?';
    const apiUrl = isLogin ? '/users/login' : '/users';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false)
    const [{response, isLoading, error}, doFetch] = useFetch(apiUrl);
    const [, setToken] = useLocaleStorage('token');
    const [, dispatch] = useContext(CurrentUserContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('data', email, password);
        const user = isLogin ? {email, password} : {email, password, username}
        doFetch({
            method: 'post',
            data: {
                user,
            }
        });
    }

    useEffect(() => {
        if (!response) {
            return;
        }
        setToken(response.user.token);
        setIsSuccessfullSubmit(true);
        dispatch({type: 'SET_AUTHORIZED', payload: response.user});
    }, [response, setToken, dispatch])

    if (isSuccessfullSubmit) {
        return <Navigate to='/' />
    }

    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">{pageTitle}</h1>
                        <p className="text-xs-center">
                            <NavLink to={descriptionLink}>{descriptionText}</NavLink>
                        </p>
                        <form onSubmit={handleSubmit}>
                            {error && <BackendErrorMessages backendErrors={error.errors} />}
                            <fieldset>
                                {!isLogin && (
                                    <fieldset className="form-group">
                                        <input
                                            type='type'
                                            className='form-control form-control-lg'
                                            placeholder='Username'
                                            value={username}
                                            onChange={e => setUsername(e.target.value)}
                                        />
                                    </fieldset>
                                )}
                                <fieldset className="form-group">
                                    <input 
                                        type='email' 
                                        className='form-control form-control-lg' 
                                        placeholder='Email' 
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input 
                                        type='password' 
                                        className='form-control form-control-lg' 
                                        placeholder='Password' 
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </fieldset>
                                <button 
                                    className="btn btn-lg btn-primary pull-xs-right" 
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {pageTitle}
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Authentification;
