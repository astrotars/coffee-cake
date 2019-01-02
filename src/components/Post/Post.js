import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

// Styles //
import styles from './Post.module.scss';

// Components //
import PostHeader from './PostHeader';
import PostToolbar from './PostToolbar';

class Post extends Component {
    static propTypes = {
        showFollow: PropTypes.bool,
    };

    constructor(props) {
        super(props);

        this._handleClickPost = this._handleClickPost.bind(this);
    }

    _handleClickPost() {
        const { history, image } = this.props;

        history.push('/post/123', {
            data: {
                image,
            },
        });
    }

    render() {
        const { data, showFollow } = this.props;

        return (
            <div className={styles.root}>
                <PostHeader avatar={data.user.avatar} showFollow={false} username={data.user.username} />
                <div className={styles.imgWrapper}>
                    <div
                        className={[styles.img, styles.feedImg].join(' ')}
                        style={{ backgroundImage: `url(${data.image})` }}
                        onClick={this._handleClickPost}
                    />
                </div>
                <div className={styles.footer}>
                    <div className={styles.caption}>
                        <p>
                            <Link to={`/${data.user.username}`}>{data.user.username}</Link> Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. Praesentium, perspiciatis!
                        </p>
                    </div>
                    <PostToolbar />
                </div>
            </div>
        );
    }
}

export default withRouter(Post);
