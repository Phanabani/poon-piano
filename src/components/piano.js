import React, { useState, useEffect, useReducer } from 'react';

// Components
import Key from './key';

// Utilities
import keyMap from '../utils/keyMap';

// Styles
import '../styles/piano.css';

const Piano = () => {
    // TODO: Use setTheme in future, default to sharky for now
    const [theme, setTheme] = useState('sharky');

    // Array of active keys, used in key component props to change image & other styling
    const [activeKeys, updateActiveKeys] = useReducer((currentKeys, action) => {
        const {
            operation,
            note,
        } = action;

        switch (operation) {
            case 'add':
                return [...currentKeys, note];
            case 'remove':
                return currentKeys.filter((el) => el !== note);
            default:
                return currentKeys;
        }
    }, []);

    // Determines whether touch or mouse event handlers should be added to keys
    const [touchEvents, setTouchEvents] = useState(false);

    const getSize = () => (
        {
            width: window.innerWidth,
            height: window.innerHeight,
        }
    );

    // Need to know window size for key styling
    const [windowSize, setWindowSize] = useState(getSize);

    // Hook to add key event listeners to window
    useEffect(() => {
        const keyEventHandler = (event) => {
            const keyPressed = event.key.toUpperCase();
            for (let i = 0; i < keyMap.length; i += 1) {
                const key = keyMap[i];
                if (keyPressed === key.keyboardBinding) {
                    const targetEl = document.getElementById('piano').children[i];
                    const note = key.note;
                    const activeKeyIndex = activeKeys.indexOf(note);
    
                    switch (event.type) {
                        case 'keydown':
                            // Adds keyActive class on key for styling/animation
                            targetEl.classList.add('keyActive');

                            // Add key to activeKeys
                            if (activeKeyIndex === -1)
                                updateActiveKeys({
                                    operation: 'add',
                                    note,
                                });
    
                            // TODO: Start playing note
                            break;
                        case 'keyup':
                            // Removes keyActive class on key for styling/animation
                            targetEl.classList.remove('keyActive');

                            // Remove key from activeKeys
                            if (activeKeyIndex !== -1)
                                updateActiveKeys({
                                    operation: 'remove',
                                    note,
                                });
    
                            // TODO: Stop playing note
                            break;
                        default:
                            break;
                    }
    
                    return;
                }
            }
        };

        const onResizeHandler = () => {
            setWindowSize(getSize());
        };

        window.addEventListener('keydown', keyEventHandler);
        window.addEventListener('keyup', keyEventHandler);
        window.addEventListener('resize', onResizeHandler);

        return () => {
            window.removeEventListener('keydown', keyEventHandler);
            window.removeEventListener('keyup', keyEventHandler);
            window.removeEventListener('resize', onResizeHandler);
        };
    });

    const mouseTouchEventHandler = (event) => {
        switch (event.type) {
            case 'mousedown':
            case 'mouseenter':
            case 'onTouchStart':
                if (event.buttons)
                {
                    // Adds keyActive class on key for styling/animation
                    event.target.classList.add('keyActive');

                    // TODO: Start playing note
                }
                break;
            case 'mouseup':
            case 'mouseleave':
            case 'onTouchCancel':
            case 'onTouchEnd':
                // Removes keyActive class on key for styling/animation
                event.target.classList.remove('keyActive');

                // TODO: Stop playing note
                break;
            default:
                break;
        }
    };

    const onTouchStart = () => {
        setTouchEvents(true);
    };

    const renderKey = (key) => {
        const {
            note,
            sharp,
        } = key;

        return (
            <Key
                key={note}
                theme={theme}
                note={note}
                sharp={sharp}
                active={activeKeys.indexOf(note) !== -1}
                mouseTouchEventHandler={mouseTouchEventHandler}
                touchEvents={touchEvents}
                desktopMode={windowSize.width >= 1400}
            />
        );
    };

    return (
        <div
            id="piano"
            className={`piano ${theme}`}
            onTouchStart={onTouchStart}
        >
            {keyMap.map(renderKey)}
        </div>
    );
};

export default Piano;
