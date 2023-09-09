require.config({ paths: { 'vs': 'https://unpkg.com/monaco-editor@0.27.0/min/vs' } });

require(['vs/editor/editor.main'], function () {
    var editor = monaco.editor.create(document.getElementById('editor'), {
        value: '', // Initialize with an empty value
        language: 'plaintext',
        theme: 'vs-dark',
        automaticLayout: true,
    });

    var saveButton = document.getElementById('saveButton');

    editor.updateOptions({ wordWrap: "on" })

    // Function to load the 'note.txt' file from the server
    function loadNote() {
        fetch('/load-note') // Replace with the appropriate server endpoint
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    console.error('Failed to load the note.');
                    return '';
                }
            })
            .then(noteContent => {
                // Set the content of 'note.txt' in the Monaco Editor
                editor.setValue(noteContent);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    // Load the 'note.txt' file when the page is loaded
    loadNote();

    saveButton.addEventListener('click', function () {
        // Get the current content of the editor
        var noteContent = editor.getValue();

        // Send an HTTP request to the server to save the note content
        saveNoteToServer(noteContent);
    });

    function saveNoteToServer(content) {
        // Use AJAX or fetch to send the content to the server (Node.js in this case)
        fetch('/save-note', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content }),
        })
        .then(response => {
            if (response.ok) {
                console.log('Note saved successfully.');
            } else {
                console.error('Failed to save the note.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});
