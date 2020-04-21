// Sharky
import sharkyNatural from '../assets/sharky/images/key_white.svg';
import sharkyAccidental from '../assets/sharky/images/key_black.svg';
import sharkyNaturalPressed from '../assets/sharky/images/key_white_pressed.svg';
import sharkyAccidentalPressed from '../assets/sharky/images/key_black_pressed.svg';

export default {
    'sharky': [
        {
            noteType: 'natural',
            active: false,
            image: sharkyNatural,
        },
        {
            noteType: 'natural',
            active: true,
            image: sharkyNaturalPressed,
        },
        {
            noteType: 'accidental',
            active: false,
            image: sharkyAccidental,
        },
        {
            noteType: 'accidental',
            active: true,
            image: sharkyAccidentalPressed,
        }
    ],
};