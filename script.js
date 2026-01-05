export const ENGLISH_TO_MORSE = 
{
   "A": ".-",
   "B": "-...",
   "C": "-.-.",
   "D": "-..",
   "E": ".",
   "F": "..-.",
   "G": "--.",
   "H": "....",
   "I": "..",
   "J": ".---",
   "K": "-.-",
   "L": ".-..",
   "M": "--",
   "N": "-.",
   "O": "---",
   "P": ".--.",
   "Q": "--.-",
   "R": ".-.",
   "S": "...",
   "T": "-",
   "U": "..-",
   "W": ".--",
   "X": "-..-",
   "Y": "-.--",
   "Z": "--.."
}

export const MORSE_TO_ENGLISH = Object.fromEntries(Object.entries(ENGLISH_TO_MORSE).map(([key, value]) => [value, key]));


export const translateEnglishToMorse = (text) => {
    if (typeof text !== 'string') {
        throw new Error('Input must be a string');
    }

    return text.toUpperCase().split('').map(char => {
        if (!(char in ENGLISH_TO_MORSE)) {
            throw new Error(`Character "${char}" cannot be translated to Morse code`);
        }
        return ENGLISH_TO_MORSE[char];
    }).join(' ');
}

export const translateMorseToEnglish = (text) => {
    if (typeof text !== 'string') {
        throw new Error('Input must be a string');
    }

    return text.split(' ').map(code => {
        if (!(code in MORSE_TO_ENGLISH)) {
            throw new Error(`Morse code "${code}" cannot be translated to English`);
        }
        return MORSE_TO_ENGLISH[code];
    }).join('');
}