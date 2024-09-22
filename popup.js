// popup.js

// Event listeners for the subtitle buttons
document.getElementById('startSubtitles').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'startSubtitles' });
  document.getElementById('status').textContent = 'Subtitles On';
});

document.getElementById('stopSubtitles').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'stopSubtitles' });
  document.getElementById('status').textContent = 'Subtitles Off';
});

// Event listener for saving notes
document.getElementById('saveNote').addEventListener('click', () => {
  const note = document.getElementById('notes').value;
  if (note) {
    chrome.runtime.sendMessage({ action: 'saveNote', note });
    document.getElementById('notes').value = '';
    document.getElementById('status').textContent = 'Note Saved';
  }
});

// Function to start speech recognition
const startSpeechRecognition = () => {
    // Check if the browser supports the Web Speech API
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.continuous = true;
        recognition.interimResults = false;

        recognition.onstart = () => {
            console.log('Speech recognition started');
        };

        recognition.onresult = (event) => {
            let transcript = event.results[event.resultIndex][0].transcript;
            console.log("Recognized speech: ", transcript);
            // Display the recognized text in the popup
            document.getElementById('transcript-display').innerText += transcript + ' ';
        };

        recognition.onerror = (event) => {
            console.error('Error occurred in speech recognition: ', event.error);
        };

        recognition.onend = () => {
            console.log('Speech recognition ended');
        };

        // Start recognition
        recognition.start();
    } else {
        console.error('Speech recognition not supported in this browser.');
    }
};

// Attach the function to the speech recognition button
document.getElementById('start-recognition').addEventListener('click', startSpeechRecognition);
