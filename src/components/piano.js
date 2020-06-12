import React, { useState, useEffect, useReducer } from 'react';

// Components
import Key from './key';

// Utilities
import KEYBOARD_BINDINGS from '../utils/keyboardBindings';

// Styles
import '../styles/piano.css';

const Piano = () => {
    // TODO: Use setTheme in future, default to sharky for now
    const [theme, setTheme] = useState('sharky');

    // Array of active keys, used in key component props to change image & other styling
    const [activeKeys, updateActiveKeys] = useReducer((currentKeys, action) => {
        const {
            operation,
            midiValue,
        } = action;

        switch (operation) {
            case 'add':
                return [...currentKeys, midiValue];
            case 'remove':
                return currentKeys.filter((el) => el !== midiValue);
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
            const keyboardBindings = Object.values(KEYBOARD_BINDINGS);

            // Loop through possible valid keyboard bindings to check if key should trigger sound
            for (let i = 0; i < keyboardBindings.length; i += 1) {
                const keyboardBinding = keyboardBindings[i];
                if (keyPressed === keyboardBinding) {
                    const targetEl = document.getElementById('piano').children[i];
                    const midiValue = parseInt(Object.keys(KEYBOARD_BINDINGS).filter((value) => KEYBOARD_BINDINGS[value] === keyPressed), 10);
                    const isActiveKey = activeKeys.includes(midiValue);
    
                    switch (event.type) {
                        case 'keydown':
                            // Adds keyActive class on key for styling/animation
                            targetEl.classList.add('keyActive');

                            // Add key to activeKeys
                            if (!isActiveKey)
                                updateActiveKeys({
                                    operation: 'add',
                                    midiValue,
                                });
    
                            // TODO: Start playing note
                            break;
                        case 'keyup':
                            // Removes keyActive class on key for styling/animation
                            targetEl.classList.remove('keyActive');

                            // Remove key from activeKeys
                            if (isActiveKey)
                                updateActiveKeys({
                                    operation: 'remove',
                                    midiValue,
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
        const midiValue = parseInt(event.target.name, 10);
        if (Number.isNaN(midiValue))
            return;

        const isActiveKey = activeKeys.includes(midiValue);
        switch (event.type) {
            case 'mousedown':
            case 'mouseenter':
            case 'onTouchStart':
                if (event.buttons)
                {
                    // Adds keyActive class on key for styling/animation
                    event.target.classList.add('keyActive');

                    // Add key to activeKeys
                    if (!isActiveKey)
                        updateActiveKeys({
                            operation: 'add',
                            midiValue,
                        });

                    // TODO: Start playing note
                }
                break;
            case 'mouseup':
            case 'mouseleave':
            case 'onTouchCancel':
            case 'onTouchEnd':
                // Removes keyActive class on key for styling/animation
                event.target.classList.remove('keyActive');

                // Remove key from activeKeys
                if (isActiveKey)
                    updateActiveKeys({
                        operation: 'remove',
                        midiValue,
                    });

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
        // Object.keys is array of strings
        const midiValue = parseInt(key, 10);

        return (
            <Key
                key={midiValue}
                theme={theme}
                midiValue={midiValue}
                active={activeKeys.includes(midiValue)}
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
            {Object.keys(KEYBOARD_BINDINGS).map(renderKey)}
        </div>
    );
};

export default Piano;
