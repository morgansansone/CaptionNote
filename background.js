let recognition;
let isTranscribing = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'startSubtitles' && !isTranscribing) {
    startSubtitles();
  } else if (message.action === 'stopSubtitles' && isTranscribing) {
    stopSubtitles();
  } else if (message.action === 'saveNote') {
    saveNoteToStorage(message.note);
  }
});

function startSubtitles() {
  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  recognition.onresult = (event) => {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    chrome.storage.local.set({ transcript });
    console.log('Transcript: ', transcript);
  };

  recognition.start();
  isTranscribing = true;
  console.log('Subtitles started');
}

function stopSubtitles() {
  if (recognition) {
    recognition.stop();
    isTranscribing = false;
    console.log('Subtitles stopped');
  }
}

function saveNoteToStorage(note) {
  const now = new Date();
  const timestamp = now.toLocaleTimeString();
  chrome.storage.local.get(['notes'], (data) => {
    const notes = data.notes || [];
    notes.push({ timestamp, note });
    chrome.storage.local.set({ notes });
    console.log('Note saved: ', note);
  });
}
