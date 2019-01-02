import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from 'simple-google-auth';
import axios from 'axios';

// Styles //
import styles from './Login.module.scss';

// Icons //
import { GoogleLogo } from 'components/Icon';

// Components //
import Button from 'components/Button';
import Logo from 'components/Logo';

class Login extends Component {
    static propTypes = {};

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };
    }

    componentDidMount() {
        sessionStorage.clear();
    }

    _signIn() {
        const { history } = this.props;

        axios
            .post(`${process.env.REACT_APP_API_ENDPOINT}/signin`, {
                email: this.state.email,
                password: this.state.password,
            })
            .then((res) => {
                sessionStorage.setItem('data', JSON.stringify(res.data));

                if (res.data.authed) {
                    history.push('/');
                } else {
                    history.push('/auth/login');
                }
            })
            .catch((err) => {
                alert(`It looks like you don't have an account. Let's get you setup!`);
                history.push('/auth/signup');
            });
    }

    _googleLoginHandler = ({ profile }) => {
        this.setState(
            {
                email: profile.email,
                password: profile.id,
            },
            () => {
                this._signIn();
            },
        );
    };

    _validateCredentials() {
        const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!reg.test(this.state.email)) {
            alert('Please enter a valid email.');
            return;
        }

        if (this.state.password.length < 4) {
            alert('Please enter a valid password.');
            return;
        }

        this._signIn();
    }

    render() {
        const AuthButton = ({ onClick }) => (
            <Button
                label='Log In with Google'
                icon={GoogleLogo}
                style={{
                    backgroundColor: '#f9f9f9',
                    color: '#222831',
                }}
                onClick={onClick}
            />
        );

        return (
            <div className={styles.root}>
                <div className={styles.wrapper}>
                    <div className={styles.card}>
                        <div className={styles.brand}>
                            <Logo
                                style={{
                                    width: 64,
                                    height: 64,
                                }}
                            />
                            <h1 className={styles.brandName}>Coffee Cake</h1>
                        </div>
                        <div className={styles.form}>
                            <GoogleAuth
                                component={AuthButton}
                                onSuccess={this._googleLoginHandler}
                                appId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                            />
                            <div className={styles.separator}>
                                <div className='label'>OR</div>
                            </div>
                            <div className={styles.inputWrapper}>
                                <input
                                    className={styles.input}
                                    placeholder='Email'
                                    onChange={(e) => {
                                        this.setState({
                                            email: e.target.value.trim(),
                                        });
                                    }}
                                />
                            </div>
                            <div className={styles.inputWrapper}>
                                <input
                                    className={styles.input}
                                    placeholder='Password'
                                    type='password'
                                    onChange={(e) => {
                                        this.setState({
                                            password: e.target.value.trim(),
                                        });
                                    }}
                                />
                            </div>
                            <Link to='/'>
                                <Button
                                    label='Log In'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        this._validateCredentials();
                                    }}
                                />
                            </Link>
                            <div className={styles.forgotPassword}>
                                <p>Forgot Password?</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.signUpCta}>
                        <p>Don't have an account?</p>
                        <Link to='/auth/signup'>Sign Up</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
