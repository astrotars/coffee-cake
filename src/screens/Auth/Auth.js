import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

// Styles //
import styles from './Auth.module.scss';

// Screens //
import Login from './Login';
import SignUp from './SignUp';

const Auth = () => {
    return (
        <div className={styles.root}>
            <div className={styles.wrapper}>
                <Route exact path='/auth' render={() => <Redirect to='/auth/login' />} />
                <Switch>
                    <Route exact path='/auth/login' component={Login} />
                    <Route exact path='/auth/signup' component={SignUp} />
                </Switch>
            </div>
        </div>
    );
};

Auth.propTypes = {};

export default Auth;
