const subtitleDiv = document.createElement('div');
subtitleDiv.style.position = 'fixed';
subtitleDiv.style.bottom = '50px';
subtitleDiv.style.left = '50%';
subtitleDiv.style.transform = 'translateX(-50%)';
subtitleDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
subtitleDiv.style.color = 'white';
subtitleDiv.style.padding = '10px';
subtitleDiv.style.fontSize = '18px';
subtitleDiv.style.zIndex = 10000;
subtitleDiv.style.display = 'none';
document.body.appendChild(subtitleDiv);

// Function to update and display subtitles
function updateSubtitles() {
  chrome.storage.local.get('transcript', (data) => {
    if (data.transcript) {
      subtitleDiv.textContent = data.transcript;
      subtitleDiv.style.display = 'block';
    } else {
      subtitleDiv.style.display = 'none';  // Hide if no transcript
    }
  });
}

// Poll for updates every 2 seconds to update the subtitles
setInterval(updateSubtitles, 2000);

// Notes sidebar
chrome.storage.local.get('notes', (data) => {
  if (data.notes) {
    displayNotes(data.notes);
  }
});

function displayNotes(notes) {
  const noteDiv = document.createElement('div');
  noteDiv.style.position = 'fixed';
  noteDiv.style.right = '0';
  noteDiv.style.top = '0';
  noteDiv.style.width = '300px';
  noteDiv.style.height = '100%';
  noteDiv.style.backgroundColor = '#f9f9f9';
  noteDiv.style.overflowY = 'scroll';
  noteDiv.style.padding = '10px';
  noteDiv.style.zIndex = 10001;
  noteDiv.style.fontFamily = 'Arial, sans-serif';

  // Close button for notes
  const closeButton = document.createElement('button');
  closeButton.textContent = 'Close Notes';
  closeButton.onclick = () => noteDiv.style.display = 'none'; // Hide on close
  noteDiv.appendChild(closeButton);

  notes.forEach((note) => {
    const noteElement = document.createElement('p');
    noteElement.innerHTML = `<strong>[${note.timestamp}]</strong> ${note.note}`;
    noteDiv.appendChild(noteElement);
  });

  document.body.appendChild(noteDiv);
}
