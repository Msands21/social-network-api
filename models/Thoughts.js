const { Schema, model } = require('mongoose');
const ReactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

const ThoughtsSchema = new Schema(
    {
        thoughtPost: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 300
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timeStamp => dateFormat(timeStamp)
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts;