import React, { Component } from 'react';
import { Link, Switch, Route, NavLink, withRouter } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import ReactAnimationFrame from 'react-animation-frame';
import { LogoutIcon } from 'components/Icon';

// Utils
import withSession from 'utils/withSession';

// Styles //
import styles from './Header.module.scss';

// Components //
import Logo from 'components/Logo';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isRaised: false,
        };

        this.onAnimationFrame = this.onAnimationFrame.bind(this);
    }

    onAnimationFrame() {
        if (window.scrollY > 8) {
            if (this.state.isRaised) {
                return;
            }
            this.setState({
                isRaised: true,
            });
        } else if (window.scrollY < 8) {
            if (!this.state.isRaised) {
                return;
            }
            this.setState({
                isRaised: false,
            });
        }
    }

    componentWillUnmount() {
        this.props.endAnimation();
    }

    render() {
        const { uid } = this.props;

        const { isRaised } = this.state;

        let headerClasses = [styles.root].join(' ');

        if (isRaised) {
            headerClasses = [styles.root, styles.headerRaised].join(' ');
        }

        return (
            <nav className={headerClasses}>
                <MediaQuery query={`(min-width: 600px)`}>
                    <div className={styles.wrapper}>
                        <div className={styles.brand}>
                            <NavLink className={styles.brandLink} exact to='/' activeStyle={{ pointerEvents: 'none' }}>
                                <Logo />
                                <div className={styles.brandSeparator} />
                                <h1 className={styles.brandName}>Coffee Cake</h1>
                            </NavLink>
                        </div>
                        <div className={styles.actions}>
                            <NavLink exact to={'/auth/login'} activeClassName={styles.activeLink}>
                                <LogoutIcon />
                            </NavLink>
                        </div>
                    </div>
                </MediaQuery>
                <MediaQuery query={`(max-width: 599px)`}>
                    <Switch>
                        <Route
                            exact
                            path='/'
                            render={() => (
                                <div className={styles.wrapper}>
                                    <div className={styles.brand}>
                                        <NavLink
                                            className={styles.brandLink}
                                            exact
                                            to='/'
                                            activeStyle={{
                                                pointerEvents: 'none',
                                            }}
                                        >
                                            <Logo />
                                            <div className={styles.brandSeparator} />
                                            <h1 className={styles.brandName}>CoffeeCake</h1>
                                        </NavLink>
                                    </div>
                                </div>
                            )}
                        />

                        <Route
                            exact
                            path='/post/:uid'
                            render={() => (
                                <div className={styles.wrapper}>
                                    <h1 className={styles.brandName}>Post</h1>
                                </div>
                            )}
                        />
                    </Switch>
                </MediaQuery>
            </nav>
        );
    }
}

Header.propTypes = {};

export default withRouter(withSession(ReactAnimationFrame(Header)));
