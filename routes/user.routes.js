module.exports = (app) => {
    const users = require('../controller/user.controller.js');

    // Create a new Note
    app.post('/users', users.create);

    // Retrieve all Notes
    app.get('/users', users.findAll);

    // Retrieve a single Note with noteId
    app.get('/user/:userId', users.findOne);

    // Update a Note with noteId
    app.put('/users/:userId', users.update);

    // Delete a Note with noteId
    app.delete('/users/:userId', users.delete);
}