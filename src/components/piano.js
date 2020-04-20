import React, { useState, useEffect } from 'react';

// Node modules
import { StyleSheet, css } from 'aphrodite/no-important';

// Components
import Key from './key';

// Utilities
import keyMap from '../utils/keyMap';

const Piano = () => {
	// TODO: Use setTheme in future, default to sharky for now
	const [theme, setTheme] = useState('sharky');

	// Determines whether touch or mouse event handlers should be added to keys
	const [touchEvents, setTouchEvents] = useState(false);

	// Hook to add key event listeners to window
	useEffect(() => {
		const keyEventHandler = (event) => {
			const keyPressed = event.key.toUpperCase();
			for (let i = 0; i < keyMap.length; i += 1) {
				if (keyPressed === keyMap[i].keyboardBinding) {
					const targetEl = document.getElementById('piano').children[i];
	
					switch (event.type) {
						case 'keydown':
							// Adds keyActive class on key for styling/animation
							targetEl.classList.add('keyActive');
	
							// TODO: Start playing note
							break;
						case 'keyup':
							// Removes keyActive class on key for styling/animation
							targetEl.classList.remove('keyActive');
	
							// TODO: Stop playing note
							break;
						default:
							break;
					}
	
					return;
				}
			}
		};

		window.addEventListener('keydown', keyEventHandler);
		window.addEventListener('keyup', keyEventHandler);

		return () => {
			window.removeEventListener('keydown', keyEventHandler);
			window.removeEventListener('keyup', keyEventHandler);
		};
	});

	const mouseTouchEventHandler = (event) => {
		switch (event.type) {
			case 'mousedown':
			case 'mouseenter':
				if (event.buttons)
				{
					// Adds keyActive class on key for styling/animation
					event.target.classList.add('keyActive');

					// TODO: Start playing note
				}
				break;
			case 'mouseup':
			case 'mouseleave':
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

	return (
		<div
			id="piano"
			className={css(styles.piano)}
			onTouchStart={onTouchStart}
		>
			{keyMap.map((key) => {
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
						mouseTouchEventHandler={mouseTouchEventHandler}
						touchEvents={touchEvents}
					/>
				);
			})}
		</div>
	);
};

export default Piano;

const styles = StyleSheet.create({
	piano: {
		maxWidth: 600,
		margin: '0 auto',
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		'@media (min-width: 1400px)': {
			maxWidth: 1200,
		},
	},
});
