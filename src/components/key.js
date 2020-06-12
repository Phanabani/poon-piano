import React from 'react';

// Utilities
import IMAGE_MAP from '../utils/imageMap';
import PITCH_INDEXES from '../utils/pitchIndexes';

// Styles
import '../styles/key.css';

const Key = (props) => {
    const {
        theme,
        midiValue,
        active,
        mouseTouchEventHandler,
        touchEvents,
        desktopMode,
    } = props;

    const keyPos = midiValue % 12;
    const accidental = PITCH_INDEXES[keyPos].includes('#');

    /**
     * Retrieves correct image for <img> element in key
     * @returns {} An imported image to use for src attribute
     */
    const getKeyImage = () => {
        // TODO: Some sanity checking on imgArr or default styling?
        const imgArr = IMAGE_MAP[theme];

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
        styleObj.left = `${keyPos * keyWidth}%`;
        styleObj.marginLeft = `-${0.5 * keyWidth}%`;
    } else if (![0, 1, 5, 6].includes(keyPos)) {
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
                src={getKeyImage()}
                name={midiValue}
            />
        </div>
    );
};

export default Key;
