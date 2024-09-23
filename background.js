let recognition;
let isTranscribing = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.action) {
    case 'startSubtitles':
      if (!isTranscribing) startSubtitles();
      break;
    case 'stopSubtitles':
      if (isTranscribing) stopSubtitles();
      break;
    case 'saveNote':
      saveNoteToStorage(message.note);
      break;
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
      transcript += event.results[i][0].transcript + ' ';
    }
    chrome.storage.local.set({ transcript: transcript.trim() });
    console.log('Transcript: ', transcript);
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error: ', event.error);
    isTranscribing = false; // Ensure the state is reset
  };

  recognition.onend = () => {
    console.log('Speech recognition ended');
    isTranscribing = false;
  };

  recognition.start();
  isTranscribing = true;
  console.log('Subtitles started');
}

function stopSubtitles() {
  if (recognition) {
    recognition.stop();
    console.log('Subtitles stopped');
    isTranscribing = false; // Ensure the flag is reset when stopped
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
