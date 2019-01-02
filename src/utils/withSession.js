import React, { PureComponent } from 'react';
import stream from 'getstream';

export default (WrappedComponent) => {
    return class extends PureComponent {
        constructor(props) {
            super(props);

            this.state = {
                user: {},
                loading: true,
            };
        }

        async componentWillMount() {
            const data = JSON.parse(sessionStorage.getItem('data'));

            if (data === null) {
                window.location.href = '/auth/login';
                return;
            }

            const token = data.token;
            const client = stream.connect(
                process.env.REACT_APP_STREAM_KEY,
                token,
                process.env.REACT_APP_STREAM_ID,
            );
            const user = await client.currentUser.get();

            console.log(user);

            this.setState({
                user: Object.assign({}, user.data, { token, client }),
                loading: false,
            });
        }

        render() {
            const { user } = this.state;

            if (this.state.loading) {
                return null;
            } else {
                return (
                    <WrappedComponent
                        {...this.props}
                        uid={user.uid}
                        guid={user.guid}
                        name={user.name}
                        email={user.email}
                        bio={user.bio}
                        avatar={user.avatar}
                        username={user.username}
                        token={user.token}
                        client={user.client}
                        user={Object.entries(user)
                            .filter(([key]) => !['token', 'client'].includes(key))
                            .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {})}
                    />
                );
            }
        }
    };
};
