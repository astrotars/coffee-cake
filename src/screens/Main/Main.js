import React, { Component } from 'react';

// Router //
import { Switch, Route } from 'react-router-dom';

// Styles //
import styles from './Main.module.scss';

// Screens //
import Posts from './Posts';

// Components //
import ScrollTop from 'components/ScrollTop';
import Header from 'components/Header';

class Main extends Component {
    componentDidMount() {
        const { history } = this.props;

        if (sessionStorage.getItem('data') === null) {
            history.replace('/auth/login');
        }
    }

    render() {
        return (
            <ScrollTop>
                <div className={styles.root}>
                    <div className={styles.wrapper}>
                        <Switch>
                            <Route exact path='/' component={Posts} />
                        </Switch>
                    </div>
                    <Header />
                </div>
            </ScrollTop>
        );
    }
}

export default Main;
