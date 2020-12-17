import express from 'express';

const app = express();

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
server.on('error', (err) => console.error(err));
