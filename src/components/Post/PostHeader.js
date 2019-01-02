import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

// Styles //
import styles from './Post.module.scss';

// Components //
import Button from 'components/Button';
import Timestamp from 'components/Timestamp';
import Avatar from 'components/Avatar';

const PostHeader = ({ avatar, showFollow, username }) => {
    return (
        <div className={styles.header}>
            <NavLink className={styles.userLink} to={`/${username}`}>
                <Avatar img={avatar} />
                <p className={styles.username}>{username}</p>
            </NavLink>
            <span style={{ flex: '1 1 auto' }} />
            <Timestamp label='5m' />
            {showFollow && (
                <div>
                    <div className={styles.headerSeparator} />
                    <Button label='Follow' />
                </div>
            )}
        </div>
    );
};

PostHeader.propTypes = {
    avatar: PropTypes.string,
    showFollow: PropTypes.bool,
    username: PropTypes.string,
};

PostHeader.propTypes = {
    showFollow: true,
};

export default PostHeader;
