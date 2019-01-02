import React from 'react';
import { Link } from 'react-router-dom';

// Styles //
import styles from './CurrentUserWidget.module.scss';

// Utils //
import withSession from 'utils/withSession';

// Components //
import UserBlock from 'components/UserBlock';

const CurrentUserWidget = ({ uid, avatar, name, username }) => {
    return <UserBlock avatar={avatar} name={name} username={username} />;
};

export default withSession(CurrentUserWidget);
