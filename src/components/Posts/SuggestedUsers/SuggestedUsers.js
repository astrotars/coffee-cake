import React, { Component } from 'react';

// Utils //
import withSession from 'utils/withSession';

// Styles //
import styles from './SuggestedUsers.module.scss';

// Components //
import SuggestedUser from './SuggestedUser';

class SuggestedUsers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            users: [],
            visible: [0, 1, 2],
            currentIndex: 2,
        };

        this.fetchData = this.fetchData.bind(this);
        this.handleFollowUser = this.handleFollowUser.bind(this);
        this.renderSuggestedUsers = this.renderSuggestedUsers.bind(this);
    }

    async componentDidMount() {
        this.setState({
            loading: true,
        });

        const data = await this.fetchData();
        this.setState({
            users: data,
            loading: false,
        });
    }

    async fetchData() {
        const { uid, client } = this.props;

        const timeline = await client.feed('timeline');
        const following = await timeline.following();

        const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/suggested`);
        const data = await res.json();

        let removeIds = [uid];

        if (following.results) {
            removeIds = [...removeIds, ...following.results.map((user) => user.target_id.split('user:')[1])];

            // TEMP: This will unfollow all users the current user is following, just uncomment, refresh the browser, then comment out again
            // removeIds.map((userId) => client.feed('timeline').unfollow('user', userId));
        }

        return data.filter((user) => !removeIds.includes(user.uid));
    }

    async handleFollowUser(position) {
        const { client } = this.props;
        const { currentIndex, users } = this.state;

        const visible = this.state.visible;

        visible.splice(position, 1, currentIndex + 1);
        await client.feed('timeline').follow('user', users[position].uid);
        const newUsers = await this.fetchData();

        this.setState({
            currentIndex: currentIndex + 1,
            users: newUsers,
            visible,
        });
    }

    renderSuggestedUsers() {
        const { users } = this.state;

        return this.state.visible.map((index, i) => (
            <SuggestedUser {...users[i]} position={i} onFollowClick={this.handleFollowUser} key={index} />
        ));
    }

    render() {
        const { loading } = this.state;

        return (
            <div className={styles.root}>
                <div className={styles.header}>
                    <p>Suggested Users</p>
                </div>
                <div className={styles.usersList}>{this.renderSuggestedUsers()}</div>
            </div>
        );
    }
}

export default withSession(SuggestedUsers);
