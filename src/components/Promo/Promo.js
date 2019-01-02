import React, { Component } from 'react';

// Styles //
import styles from './Promo.module.scss';

class Promo extends Component {
    render() {
        return (
            <div className={styles.root}>
                <div className={styles.header}>
                    <p>Powered by Stream</p>
                </div>
                <div className={styles.promo}>
                    <p className='item'>
                        Build scalable news feeds & activity streams.{' '}
                        <a href='https://getstream.io/try-the-api' target='_blank' rel='noopener noreferrer'>
                            Stream
                        </a>
                        ’s simple, powerful APIs are used by some of the largest and most popular apps. Save months of
                        development headache and focus on what makes your app unique.
                    </p>
                    <br />
                    <p>
                        Leverage{' '}
                        <a href='https://getstream.io/try-the-api' target='_blank' rel='noopener noreferrer'>
                            Stream
                        </a>{' '}
                        to build the most engaging activity feed without worrying about the underlying storage
                        technology. Advanced features such as aggregation, ranking, real-time and personalization enable
                        your product team to optimize your app’s engagement and retention.
                    </p>
                </div>
            </div>
        );
    }
}

export default Promo;
