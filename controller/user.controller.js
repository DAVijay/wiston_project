const user = require('../model/user.model.js');

// Create and Save a new user
exports.create = (req, res) =>{

    var result = {};
    var status = 201;

    // Create a user
    const User = new user({
        email: req.body.email || "Unemail user", 
        name: req.body.name || "no name",
        birthday: req.body.birthday,
        gender: req.body.gender
    });

    // Save user in the databas
    User.save((err, user) => {
        if (!err) {
          result.status = status;
          result.result = user;
        } else {
          status = 500;
          result.status = status;
          result.error = err;
        }
        res.status(status).send(result);
      });
};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    user.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    user.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId
        });
    });
};


// Update a user identified by the userId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.email) {
        return res.status(400).send({
            message: "user email can not be empty"
        });
    }

    // Find user and update it with the request body
    user.findByIdAndUpdate(req.params.userId, {
        email: req.body.email || "Unemail user", 
        name: req.body.name || "no name",
        birthday: req.body.birthday,
        gender: req.body.gender
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.userId
        });
    });
};


// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    user.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });
        }
        res.send({message: "user deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });
};
        
