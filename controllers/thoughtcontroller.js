const { Thought } = require("../models");

const thoughtController = {
    getAllThoughts(req,res) {
        Thought.find({})
        .then(dbThoughtData => {res.json(dbThoughtData)})
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    getThoughtById({params},res) {
        Thought.findOne({_id: params.id})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'No thought found with this id'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {res.json(err)});
    },
    createThought({body}, res) {
        Thought.create(body)
        .then(dbThoughtData => {res.json(dbThoughtData)})
        .catch((err) => {res.json(err)});
    },
    updateThought({params, body}, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'No thought found with this id'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {res.json(err)});
    },
    deleteThought({params}, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => {res.json(dbThoughtData)})
        .catch((err) => {res.json(err)});
    },
    createReaction({params, body}, res) {
        console.log(params);
        console.log(body);
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true}
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'No thought found with this id'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {res.json(err)});
    },
    removeReaction({params}, res) {
        console.log(params);
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: {_id: params.reactionId } } },
            { new: true}
        )
        .then(dbThoughtData => {
            console.log(dbThoughtData);
            res.json(dbThoughtData)
        })
        .catch((err) => {
            res.json(err)
        });
    },
};

module.exports = thoughtController;