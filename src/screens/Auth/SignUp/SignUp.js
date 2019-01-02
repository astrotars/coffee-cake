import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import GoogleAuth, { GoogleLogout } from 'simple-google-auth';

// Styles //
import styles from './SignUp.module.scss';

// Icons //
import { GoogleLogo } from 'components/Icon';

// Components //
import Button from 'components/Button';
import Logo from 'components/Logo';

class SignUp extends Component {
    static propTypes = {};

    constructor(props) {
        super(props);

        this.state = {
            guid: '',
            name: '',
            email: '',
            password: '',
        };
    }

    componentDidMount() {
        sessionStorage.clear();
    }

    _signUp() {
        const { history } = this.props;

        axios
            .post(`${process.env.REACT_APP_API_ENDPOINT}/signup`, {
                guid: this.state.guid,
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
            })
            .then((res) => {
                sessionStorage.setItem('data', JSON.stringify(res.data));

                if (res.guid && res.data.authed) {
                    history.push('/');
                } else if (this.state.email && res.data.authed) {
                    history.push('/');
                } else {
                    history.push('/auth/login');
                }
            })
            .catch((err) => {
                alert('An error occurred. Please try again later.');
            });
    }

    _googleLoginHandler = ({ profile }) => {
        this.setState(
            {
                guid: profile.id,
                name: `${profile.firstName} ${profile.lastName}`,
                email: profile.email,
                password: profile.id,
            },
            () => {
                this._signUp();
            },
        );
    };

    _validateCredentials() {
        if (this.state.name.length < 4) {
            alert('Please enter a valid name.');
            return;
        }

        const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!reg.test(this.state.email)) {
            alert('Please enter a valid email.');
            return;
        }

        if (this.state.password.length < 4) {
            alert('Please enter a valid password.');
            return;
        }

        this._signUp();
    }

    render() {
        const AuthButton = ({ onClick }) => (
            <Button
                label='Sign Up with Google'
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
                                    placeholder='Full Name'
                                    onChange={(e) => {
                                        this.setState({
                                            name: e.target.value.trim(),
                                        });
                                    }}
                                />
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
                                    label='Sign Up'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        this._validateCredentials();
                                    }}
                                />
                            </Link>
                        </div>
                    </div>
                    <div className={styles.loginCta}>
                        <p>Already have an account?</p>
                        <Link to='/auth/login'>Log In</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUp;
