import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const inputRef = useRef(null);
  const [generatedText, setGeneratedText] = useState("");
  const [textLength, setTextLength] = useState(8);
  const [includeNumbers, setIncludesNumbers] = useState(false);
  const [includeSpecialCharacters, setIncludesSpecialCharacters] =
    useState(false);

  const handleCopy = useCallback(() => {
    const textToCopy = inputRef.current.value;
    window.navigator.clipboard.writeText(textToCopy);
  }, [inputRef]);

  useEffect(() => {
    const generateRandomText = () => {
      let result = "";
      let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

      if (includeNumbers) {
        characters += "0123456789";
      }

      if (includeSpecialCharacters) {
        characters += "!@#$%^&*()_+[]{}|;:,.<>?";
      }

      for (let i = 0; i < textLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
      }

      return result;
    };
    const text = generateRandomText();
    setGeneratedText(text);
  }, [textLength, includeNumbers, includeSpecialCharacters]);

  return (
    <div className="bg-gray-400 min-h-screen flex items-center justify-center p-8">
      <div className="flex flex-col items-center">
        <div className="p-2">
          <input
            type="text"
            value={generatedText}
            onChange={() => ""}
            ref={inputRef}
            readOnly
            className="py-1 px-3 border-solid rounded-tl-sm rounded-bl-sm w-64"
          />
          <button
            type="button"
            onClick={handleCopy}
            className="bg-blue-300 text-white-500 py-1 px-3 rounded-tr-sm rounded-br-sm"
          >
            copy
          </button>
        </div>
        <div className="p-2">
          <input
            type="range"
            min={1}
            max={100}
            value={textLength}
            onChange={(e) => setTextLength(e.target.value)}
            className="mt-1"
          />
          <span className="text-white text-xl mr-12">{textLength}</span>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludesNumbers(e.target.checked)}
            className="mr-1"
            id="numbers"
          />
          <label htmlFor="numbers" className="text-white text-xl mr-12">
            Numbers
          </label>
          <input
            type="checkbox"
            checked={includeSpecialCharacters}
            onChange={(e) => setIncludesSpecialCharacters(e.target.checked)}
            className="mr-2"
            id="specialCharacters"
          />
          <label
            htmlFor="specialCharacters"
            className="text-white text-xl mr-2"
          >
            Special Characters
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
