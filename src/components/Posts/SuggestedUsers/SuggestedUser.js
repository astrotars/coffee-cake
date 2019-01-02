import React from 'react';
import { Link } from 'react-router-dom';

// Styles //
import styles from './SuggestedUsers.module.scss';

// Components //
import UserBlock from 'components/UserBlock';
import Button from 'components/Button';

const SuggestedUser = ({ position, avatar, onFollowClick, name, username, uid }) => {
    return (
        <div className={styles.user}>
            <Link to={`/user/${uid ? uid : '#'}`}>
                <UserBlock showPlaceholder={!username} avatar={avatar} username={username} name={name} />
            </Link>
            <div className={styles.fill} />
            {username && <Button label='Follow' onClick={() => onFollowClick(position)} />}
        </div>
    );
};

export default SuggestedUser;
