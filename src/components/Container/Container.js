import React from 'react';

// Styles //
import styles from './Container.module.scss';

const Container = ({ className, children }) => {
    return <div className={`${styles.root}  ${className}`}>{children}</div>;
};

export default Container;
