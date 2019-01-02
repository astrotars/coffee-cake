import React from 'react';
import PropTypes from 'prop-types';

// Styles //
import styles from './LabelInput.module.scss';

const createId = (str) =>
    str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (ltr, idx) => (idx === 0 ? ltr.toLowerCase() : ltr.toUpperCase()))
        .replace(/\s+/g, '');

const LabelInput = ({ multiLine, name, type, value, placeholder, autocapitalize, autocorrect, disabled, onChange }) => {
    const id = createId(name);

    return (
        <div className={styles.root}>
            <div className={styles.labelWrapper}>
                <label htmlFor={id}>{name}</label>
            </div>
            <div className={styles.inputWrapper}>
                {!!multiLine ? (
                    <textarea id={id} rows={multiLine} value={value} placeholder={placeholder} disabled={disabled} />
                ) : (
                    <input
                        id={id}
                        type={type}
                        autoCapitalize={autocapitalize}
                        autoCorrect={autocorrect}
                        value={value}
                        placeholder={placeholder}
                        disabled={disabled}
                        onChange={onChange}
                    />
                )}
            </div>
        </div>
    );
};

LabelInput.propTypes = {
    name: PropTypes.string.isRequired,
};

export default LabelInput;
