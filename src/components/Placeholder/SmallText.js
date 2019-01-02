import React from 'react';
import PropTypes from 'prop-types';

// Components //
import PlaceholderSVG from './PlaceholderSVG';

const PlaceholderSmallText = (props) => {
    return (
        <PlaceholderSVG {...props} viewBox={`0 0 ${props.width} ${props.height}`}>
            <rect
                transform='translate(-132.000000, -379.000000)'
                x='132'
                y='379'
                rx='4'
                ry='4'
                width={props.width}
                height={props.height}
            />
        </PlaceholderSVG>
    );
};

PlaceholderSmallText.propTypes = {};

export default PlaceholderSmallText;
