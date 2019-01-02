import React from 'react';
import PropTypes from 'prop-types';

// Styles //
import styles from './Post.module.scss';

// Icons //
import { CommentIcon, LikeIcon, MoreIcon } from 'components/Icon';

const PostToolbar = () => {
    return (
        <div className={styles.toolbar}>
            <div className={[styles.toolbarItem, styles.likeCounter].join(' ')}>
                <LikeIcon />
                <span>1.1k</span>
            </div>
            <div className={[styles.toolbarItem, styles.commentCounter].join(' ')}>
                <CommentIcon />
                <span>1.1k</span>
            </div>
            <span style={{ flex: '1 1 auto' }} />
            <MoreIcon />
        </div>
    );
};

PostToolbar.propTypes = {};

export default PostToolbar;
