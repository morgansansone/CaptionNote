document.getElementById('startSubtitles').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'startSubtitles' });
  document.getElementById('status').textContent = 'Subtitles On';
});

document.getElementById('stopSubtitles').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'stopSubtitles' });
  document.getElementById('status').textContent = 'Subtitles Off';
});

document.getElementById('saveNote').addEventListener('click', () => {
  const note = document.getElementById('notes').value;
  if (note) {
    chrome.runtime.sendMessage({ action: 'saveNote', note });
    document.getElementById('notes').value = '';
    document.getElementById('status').textContent = 'Note Saved';
  }
});
