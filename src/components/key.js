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
        sharp,
        active,
        mouseTouchEventHandler,
        touchEvents,
    } = props;

    /**
     * Helps calculate the left attribute required on the sharp notes
     * @param {String} note
     * @returns {Number} Index of provided sharp key in key map
     */
    const getSharpKeyPosition = (note) => {
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

        // TODO: Might be worth adding note type of keyMap
        const noteType = note.indexOf('#') !== -1 ? 'accidental' : 'natural';
        for (let i = 0; i < imgArr.length; i += 1) {
            const imgObj = imgArr[i];
            if (noteType === imgObj.noteType && active === imgObj.active)
                return imgObj.image;
        }

        // TODO: As above, maybe add some fallback
        return null;
    };

    // Determine left position of sharp keys
    const styleObj = {};
    if (sharp) {

    }

    return (
        <div
            className={`key${sharp ? ' sharp' : ''}`}
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
            />
        </div>
    );
};

export default Key;
