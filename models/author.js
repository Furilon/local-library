const { get } = require('express/lib/response');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const authorSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        maxlength: 100,
    },
    family_name: {
        type: String,
        required: true,
        maxlength: 100,
    },
    date_of_birth: Date,
    date_of_death: Date,
});

authorSchema.virtual('name').get(function() {
    let fullname = "";
    if (this.first_name && this.family_name) {
        fullname = this.family_name + ", " + this.first_name; 
    }
    if(!this.first_name || !this.family_name) {
        fullname = "";
    }
    return fullname;
})

authorSchema.virtual('lifespan').get(function () {
    let lifetime_string = '';
    if (this.date_of_birth) {
        lifetime_string = this.date_of_birth.getYear().toString();
    }
    lifetime_string += ' ';
    if (this.date_of_death) {
        lifetime_string += this.date_of_death.getYear();
    }
    return lifetime_string;
});

authorSchema.virtual('url').get(function () {
    return '/catalog/author/' + this._id;
});

module.exports = mongoose.model('Author', authorSchema);
