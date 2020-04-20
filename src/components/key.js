import React from 'react';

// Node modules
import { StyleSheet, css } from 'aphrodite/no-important';

// Images
import keyWhite from '../assets/sharky/images/key_white.svg';
import keyBlack from '../assets/sharky/images/key_black.svg';

const Key = (props) => {
    const {
        theme,
        sharp,
        mouseTouchEventHandler,
        touchEvents,
    } = props;

    return (
        <div
            className={css(styles.key, sharp && styles.sharp, styles[theme], sharp && styles[theme + 'Sharp'])}
            onMouseDown={touchEvents ? null : mouseTouchEventHandler}
            onMouseUp={touchEvents ? null : mouseTouchEventHandler}
            onMouseEnter={mouseTouchEventHandler}
            onMouseLeave={mouseTouchEventHandler}
            onTouchStart={touchEvents ? mouseTouchEventHandler : null}
            onTouchCancel={touchEvents ? mouseTouchEventHandler : null}
            onTouchEnd={touchEvents ? mouseTouchEventHandler : null}
        >
        </div>
    );
};

export default Key;

const styles = StyleSheet.create({
    // Default styles
	key: {
        position: 'relative',
		width: 'calc(100% / 7)',
        height: '16em',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        zIndex: 1,
        cursor: 'pointer',
		'@media (min-width: 420px)': {
            height: '18em',
		},
		'@media (min-width: 1400px)': {
            width: 'calc(100% / 14)',
            height: '25em',
		},
    },
    sharp: {
        position: 'absolute',
        height: '10em',
        zIndex: 2,
		'@media (min-width: 420px)': {
            height: '12em',
		},
		'@media (min-width: 1400px)': {
            height: '17em',
		},        
    },
    keyActive: {
        // TODO: Do some fancy animations :)
    },

    // Themes
    sharky: {
        backgroundImage: `url(${keyWhite})`,
    },
    sharkySharp: {
        backgroundImage: `url(${keyBlack})`,
    },
});
