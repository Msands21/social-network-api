const { Thoughts, User } = require('../models');

const thoughtController = {
    // get all thoughts
    getThoughts(req, res) {
        Thoughts.find({})
            .select('-__v')
            .then(dbThoughtsData => {
                res.json(dbThoughtsData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    getThoughtsById({ params }, res) {
        Thoughts.findOne({ _id: params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'No thought with this id' });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    createThoughts({ body }, res) {
        Thoughts.create(body)
            .then(({ username, _id }) => {
                return User.findOneAndUpdate(
                    { username: username },
                    { $push: { thoughts: _id } },
                    { new: true, runValidators: true }
                )
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    updateThoughts({ body, params }, res) {
        Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'No thought with this id!' })
                }

                res.json(dbThoughtsData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            })
    },

    deleteThoughts({ params }, res) {
        Thoughts.findOneAndDelete({ _id: params.id })
            .then(({ username }) => {
                return User.findOneAndUpdate(
                    { username: username },
                    { $pull: { thoughts: params.id } },
                    { new: true }
                )
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user with this id' });
                    return;
                }

                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    createReaction({ params, body }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'No thought with this id!' });
                    return;
                }

                res.json(dbThoughtsData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    
    removeReaction({ params }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'No thoughts with this id!' });
                    return;
                }

                res.json(dbThoughtsData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
};

module.exports = thoughtController;