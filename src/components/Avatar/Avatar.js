import React from 'react';
import PropTypes from 'prop-types';

// Styles //
import styles from './Avatar.module.scss';

const Avatar = ({ className, img }) => {
    return (
        <div
            className={[styles.root, className].join(' ')}
            style={{
                backgroundImage: `url(${img})`,
            }}
        />
    );
};

Avatar.propTypes = {
    className: PropTypes.string,
    img: PropTypes.string.isRequired,
};

export default Avatar;
