const mongoose = require('mongoose')
const validator = require('validatorjs')

const superheroSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [ 5, "Name must be at least 5 characters"],
    },
    imageUrl: {
        type: String,
        required: true,
        validator: function (v) {
            return /^http|https/.test(v)
        },
        message: props => `${props.value} enter a valid URL`
    },
    background: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return new Promise(function(resolve, reject) {
                    resolve (/^[\w+\d+/]+/.test(v))
                })
            },
            message: props => `${props.value} can only be letters and numbers`
        },
    },
    skillLevel: {
        type: String,
        required: false,
        enum: {values: [beginner, intermediate, advanced], message: `{value} must be choosen between beginner, intermediate or advanced` }
    },
    superheroPowers: [{type: mongoose.Schema.Types.ObjectId, ref: 'SuperheroPower'}],
    creatorId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})


module.exports = mongoose.model("Superhero", superheroSchema)