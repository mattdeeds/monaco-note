const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Serve static files from the 'public' directory (e.g., your HTML file)
app.use(express.static('public'));

app.post('/save-note', async (req, res) => {
    try {
        const { content } = req.body;

        // Generate a unique filename or use a specific naming convention
        // generate a unique filename
        // const filename = `note-${Date.now()}.txt`;
        const filename = 'note.txt';

        // Specify the directory where you want to save the file
        const savePath = path.join(__dirname, 'notes', filename);

        // Save the note content to the file
        await fs.writeFile(savePath, content);

        res.sendStatus(200); // Success response
    } catch (error) {
        console.error('Error saving note:', error);
        res.sendStatus(500); // Internal Server Error
    }
});

// Define the route handler for loading the 'note.txt' file
app.get('/load-note', async (req, res) => {
    try {
        // Specify the path to the 'note.txt' file
        const noteFilePath = path.join(__dirname, 'notes', 'note.txt');

        // Read the 'note.txt' file
        const noteContent = await fs.readFile(noteFilePath, 'utf-8');

        // Send the 'note.txt' content as the response
        res.send(noteContent);
    } catch (error) {
        console.error('Error loading note:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
