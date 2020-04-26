import React from 'react';

// Utilities
import keyMap from '../utils/keyMap';
import imageMap from '../utils/imageMap';

// Styles
import '../styles/key.css';

const Key = (props) => {
    const {
        theme,
        note,
        noteWithoutOctave,
        accidental,
        active,
        mouseTouchEventHandler,
        touchEvents,
        desktopMode,
    } = props;

    /**
     * Returns the index of the key on the piano
     * @param {String} note
     * @returns {Number} Index of provided key in key map
     */
    const getKeyPosition = (note) => {
        for (let i = 0; i < keyMap.length; i += 1) {
            if (note === keyMap[i].note)
                return i;
        }

        // If we get here, we've got bigger problems
        return 0;
    };

    /**
     * Retrieves correct image for <img> element in key
     * @param {String} theme
     * @param {String} note
     * @param {Boolean} active
     * @returns {} An imported image to use for src attribute
     */
    const getKeyImage = (theme, note, active) => {
        // TODO: Some sanity checking on imgArr or default styling?
        const imgArr = imageMap[theme];

        for (let i = 0; i < imgArr.length; i += 1) {
            const imgObj = imgArr[i];
            if (accidental === imgObj.accidental && active === imgObj.active)
                return imgObj.image;
        }

        // TODO: As above, maybe add some fallback
        return null;
    };

    // Determine left position of accidental keys
    const keyWidth = desktopMode ? (100/24) : (100/12);
    const styleObj = {
        width: `${(accidental ? 1 : (12/7)) * keyWidth}%`,
    };

    if (accidental) {
        styleObj.left = `${getKeyPosition(note) * keyWidth}%`;
        styleObj.marginLeft = `-${0.5 * keyWidth}%`;
    } else if (['c', 'f'].indexOf(noteWithoutOctave) === -1) {
        styleObj.marginLeft = `-${0.5 * keyWidth}%`;
    }

    return (
        <div
            className={`key${accidental ? ' accidental' : ''}`}
            style={styleObj}
            onMouseDown={touchEvents ? null : mouseTouchEventHandler}
            onMouseUp={touchEvents ? null : mouseTouchEventHandler}
            onMouseEnter={mouseTouchEventHandler}
            onMouseLeave={mouseTouchEventHandler}
            onTouchStart={touchEvents ? mouseTouchEventHandler : null}
            onTouchCancel={touchEvents ? mouseTouchEventHandler : null}
            onTouchEnd={touchEvents ? mouseTouchEventHandler : null}
        >
            <img
                className="keyImg"
                src={getKeyImage(theme, note, active)}
                name={note}
            />
        </div>
    );
};

export default Key;
