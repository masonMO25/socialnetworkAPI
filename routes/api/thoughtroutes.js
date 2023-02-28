const router = require('express').Router();

const { 
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  removeReaction  
} = require('../../controllers/thoughtcontroller');

router
    .route('/')
    .get(getAllThoughts)

router
    .route('/:id')
    .get(getThoughtById)
    .post(createThought)
    .put(updateThought)
    .delete(deleteThought)

router.route("/:thoughtId/reactions")
    .post(createReaction)
    
router.route("/:thoughtId/reactions/:reactionId")
    .delete(removeReaction)

module.exports = router;