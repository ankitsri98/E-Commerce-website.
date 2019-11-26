var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({ // sign in database 
    email: {type: String, required: true},
    password: {type: String, required: true}
});

userSchema.methods.encryptPassword = function (password) { //encrypt the password means hide the password
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.validPassword = function (password) {  //check id the password is valid
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);