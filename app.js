const express = require('express');
const app = express();
const tasks = require('./routes/taskRouter');


// middleware
app.use(express.static('public'));
app.use(express.json());
const notFound = require('./middleware/notFound');
const errorHandlerMiddleware = require('./middleware/errorHandler');

// //routes
// app.get('/', (req, res) => {
//     res.send('Task Manager App');
// });

app.use('/api/v1/tasks', tasks);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});



