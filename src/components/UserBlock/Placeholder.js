import React from 'react';

// Styles //
import styles from './UserBlock.module.scss';

// Components //
import { Avatar as PlaceholderAvatar, Text as PlaceholderText } from 'components/Placeholder';

const Placholder = () => {
    return (
        <div className={styles.root}>
            <PlaceholderAvatar className={styles.avatar} />
            <div className={styles.content}>
                <PlaceholderText width={80} height={16} />
                <PlaceholderText width={48} height={12} style={{ marginTop: 4 }} />
            </div>
        </div>
    );
};

export default Placholder;
