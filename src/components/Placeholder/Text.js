import React from 'react';

// Components //
import PlaceholderSVG from './PlaceholderSVG';

const PlaceholderText = (props) => {
    return (
        <PlaceholderSVG {...props} viewBox={`0 0 ${props.width} ${props.height}`}>
            <rect
                transform='translate(-132.000000, -356.000000)'
                x='132'
                y='356'
                rx='4'
                ry='4'
                width={props.width}
                height={props.height}
            />
        </PlaceholderSVG>
    );
};

export default PlaceholderText;
