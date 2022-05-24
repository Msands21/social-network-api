const router = require('express').Router();

const {
    getThoughts,
    getThoughtsById,
    createThoughts,
    updateThoughts,
    deleteThoughts,
    createReaction,
    removeReaction
} = require('../../controllers/thoughtController');

//api/thoughts route
router.route('/').get(getThoughts).post(createThoughts);

//api/thoughts/:id route
router.route('/:id').get(getThoughtsById).put(updateThoughts).delete(deleteThoughts);

//api/thoughts/:id/reactions route
router.route('/:thoughtId/reactions').post(createReaction)

//api/thoughts/:id/reactions/reactionid route
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction)

module.exports = router;