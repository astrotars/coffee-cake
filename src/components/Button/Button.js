import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import Ink from 'react-ink';

// Styles //
import styles from './Button.module.scss';

const Button = ({ buttonStyle, fullWidth, icon, label, ...rest }) => {
    const classes = [styles.root, styles[buttonStyle]].join(' ');

    return (
        <button className={classes} {...rest} style={{ width: fullWidth ? '100%' : 'auto' }}>
            {buttonStyle !== 'simple' && <Ink />}
            {icon && createElement(icon, { width: 16, height: 16 })}
            <span style={{ marginLeft: !!icon ? 16 : 0 }}>{label}</span>
        </button>
    );
};

Button.propTypes = {
    buttonStyle: PropTypes.oneOf(['primary', 'secondary', 'simple']),
    fullWidth: PropTypes.bool,
    icon: PropTypes.func,
    label: PropTypes.string,
};

Button.defaultProps = {
    buttonStyle: 'simple',
};

export default Button;
