import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';

// Utils //
import { lighten } from 'utils/colorManipulator';

// Components //
import Icon from 'components/Icon';

const PlaceholderSVG = ({ children, color, reverse, radius, ...rest }) => {
    return (
        <svg {...rest}>
            <defs>
                <linearGradient id='loader-gradient' x1='0%' y1='0%' x2='100%' y2='0%'>
                    <stop offset='8%' stopColor='#f8f9fc'>
                        <animate
                            attributeName='offset'
                            values='-1;-1;-1;0;1;1;1;'
                            dur='1.3s'
                            repeatCount='indefinite'
                        />
                    </stop>

                    <stop offset='50%' stopColor='#ffffff' stopOpacity='1'>
                        <animate attributeName='offset' values='-1;-1;0;1;1;1;' dur='1.3s' repeatCount='indefinite' />
                    </stop>

                    <stop offset='100%' stopColor='#f8f9fc' stopOpacity='1'>
                        <animate attributeName='offset' values='-1;0;1;1;1;' dur='1.3s' repeatCount='indefinite' />
                    </stop>
                </linearGradient>
            </defs>
            {cloneElement(Children.only(children), {
                rx: radius,
                ry: radius,
                width: rest.width,
                height: rest.height,
                fill: 'url(#loader-gradient)',
            })}
        </svg>
    );
};

PlaceholderSVG.propTypes = {
    radius: PropTypes.number,
    reverse: PropTypes.bool,
};

PlaceholderSVG.defaultProps = {
    color: 'off_white',
    radius: 4,
};

export default PlaceholderSVG;
