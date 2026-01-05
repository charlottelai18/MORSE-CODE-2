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
  if (typeof text !== "string") {
    throw new Error("Input must be a string");
  }

  const words = text.trim().toUpperCase().split(/\s+/);
  if (words.length === 1 && words[0] === "") return "";

  return words
    .map((word) =>
      word
        .split("")
        .map((char) => {
          if (!(char in ENGLISH_TO_MORSE)) {
            throw new Error(`Character "${char}" cannot be translated to Morse code`);
          }
          return ENGLISH_TO_MORSE[char];
        })
        .join(" ")
    )
    .join(" / ");
};


export const translateMorseToEnglish = (text) => {
  if (typeof text !== "string") {
    throw new Error("Input must be a string");
  }

  const trimmed = text.trim();
  if (!trimmed) return "";

  const words = trimmed.split(/\s*\/\s*/);

  return words
    .map((word) =>
      word
        .split(/\s+/) 
        .map((code) => {
          if (!(code in MORSE_TO_ENGLISH)) {
            throw new Error(`Morse code "${code}" cannot be translated to English`);
          }
          return MORSE_TO_ENGLISH[code].toLowerCase();
        })
        .join("")
    )
    .join(" ");
};


// ---- UI state + render ----
let mode = "EN_TO_MORSE"; 

const inputEl = document.querySelector("#inputText");
const outputEl = document.querySelector("#outputText");
const inputLabelEl = document.querySelector("#inputLabel");
const outputLabelEl = document.querySelector("#outputLabel");
const switchBtn = document.querySelector("#switch--button--wrapper");

function render() {
  const isEnToMorse = mode === "EN_TO_MORSE";

  inputLabelEl.textContent = isEnToMorse ? "Text Input" : "Morse Code Input";
  outputLabelEl.textContent = isEnToMorse ? "Morse Code Output" : "Text Output";

  inputEl.placeholder = isEnToMorse
    ? "Enter English text here..."
    : "Enter Morse here (letters split by space, words split by /)...";

  try {
    const input = inputEl.value;
    const translated = isEnToMorse
      ? translateEnglishToMorse(input)
      : translateMorseToEnglish(input);

    outputEl.value = translated;
    outputEl.classList.remove("error");
  } catch (err) {
    outputEl.value = err.message;
    outputEl.classList.add("error");
  }
}

inputEl.addEventListener("input", render);

switchBtn.addEventListener("click", () => {
  mode = mode === "EN_TO_MORSE" ? "MORSE_TO_EN" : "EN_TO_MORSE";
  render();
});

render();