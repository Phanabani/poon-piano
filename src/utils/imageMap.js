// Sharky
import sharkyNatural from '../assets/sharky/images/key_white.svg';
import sharkyAccidental from '../assets/sharky/images/key_black.svg';
import sharkyNaturalPressed from '../assets/sharky/images/key_white_pressed.svg';
import sharkyAccidentalPressed from '../assets/sharky/images/key_black_pressed.svg';

export default {
    'sharky': [
        {
            accidental: false,
            active: false,
            image: sharkyNatural,
        },
        {
            accidental: false,
            active: true,
            image: sharkyNaturalPressed,
        },
        {
            accidental: true,
            active: false,
            image: sharkyAccidental,
        },
        {
            accidental: true,
            active: true,
            image: sharkyAccidentalPressed,
        }
    ],
};