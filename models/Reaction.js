// const { Schema, model, Types } = require('mongoose');
// const dateFormat = require('../utils/dateFormat')

// const ReactionSchema = new Schema(
//     {
//         reactionId: {
//             type: Schema.Types.ObjectId,
//             default: () => new Types.ObjectId()
//         },
//         reactionBody: {
//             type: String,
//             required: true,
//             maxLength: 300
//         },
//         username: {
//             type: String,
//             required: true
//         },
//         createdAt: {
//             type: Date,
//             default: Date.now,
//             get: timeStamp => dateFormat(timeStamp)
//         }
//     },
//     {
//         toJSON: {
//             getters: true
//         }
//     }
// );

// const Reaction = model('Reaction', ReactionSchema);

// module.exports = Reaction;