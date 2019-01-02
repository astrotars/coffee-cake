import React from 'react';
import PropTypes from 'prop-types';

// Styles //
import styles from './UserBlock.module.scss';

// Components //
import Avatar from 'components/Avatar';
import Placeholder from './Placeholder';

const renderMeta = (children, name) => {
    if (children) {
        return children;
    }

    return <p className={styles.name}>{name}</p>;
};

const UserBlock = ({ avatar, children, showPlaceholder, name, username }) => {
    if (showPlaceholder || !username) {
        return <Placeholder />;
    }

    return (
        <div className={styles.root}>
            <Avatar className={styles.avatar} img={avatar} />
            <div className={styles.content}>
                <p className={styles.username}>{username}</p>
                {renderMeta(children, name)}
            </div>
        </div>
    );
};

UserBlock.propTypes = {
    showPlacholder: PropTypes.bool,
    user: PropTypes.object,
};

export default UserBlock;
