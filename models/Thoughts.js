const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 300
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timeStamp => dateFormat(timeStamp)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

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