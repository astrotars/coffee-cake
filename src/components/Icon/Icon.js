/**
 *
 * Icon
 *
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Styles //
import styles from './Icon.module.scss';

class Icon extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,
        style: PropTypes.object,
        viewBox: PropTypes.string.isRequired,
    };

    render() {
        const { children, className, viewBox, style, ...other } = this.props;

        return (
            <svg
                {...other}
                className={`${styles.root} ${className}`}
                viewBox={viewBox}
                style={style}
                ref={(ref) => (this.root = ref)}
            >
                {children}
            </svg>
        );
    }
}

export default Icon;
