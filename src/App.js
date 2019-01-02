import React, { Component } from 'react';

// Router //
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Styles //
import 'styles/global.scss';

// Styles - React Components //
import 'react-activity-feed/dist/index.es.css';
import 'styles/react-components.css';

// Screens //
import Main from 'screens/Main';
import Auth from 'screens/Auth';

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/auth' component={Auth} />
                    <Route path='/' component={Main} />
                </Switch>
            </Router>
        );
    }
}

export default App;
