const router = require('express').Router();
const {Thought} = require('../../models');

//Get all route for thought
router.get('/', async (req, res) => {
    try {
        const thoughtData = await Thought.find();
        console.log('New Thought :', thoughtData);
        res.json(thoughtData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get single thought by id
router.get('/:id', async (req, res) => {
    try {
        const singleThought = await Thought.findOne({_id: req.params.id});
        if (!singleThought) {
            return res.status(404).json({message: 'No thought found with that id'})
        }
        res.json(singleThought);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Post new thought
router.post('/', async (req, res) => {
    try {
        
        const postThought = await Thought.create(req.body);
        console.log('New Thought created:', postThought);
        res.json(postThought);
    } catch (err) {
        console.error('Error  creating Thought:', err);
        res.status(500).json({error: 'Internal Server Error', message:err.message});
    }
});

//update single thought by id
router.put('/:id', async (req, res) => {
    try {
        const updateThought = await Thought.findOneAndUpdate({_id: req.params.id}, req.body, {
            new: true,
            runValidators: true,
        });
        res.json(updateThought);
    } catch (err) {
        res.status(500).json(err)
    }
});

//delete single thought by id
router.delete('/:id', async (req, res) => {
    try {
        const deleteThought = await Thought.findOneAndDelete({_id: req.params.id})
        res.json(deleteThought);
    } catch (err) {
        res.status(500).json(err)
    }
});

//add new reaction to thought by id
router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        const {thoughtId} = req.params;
        const {reactionId, reactionBody, username} = req.body;
       //find and update thought with a reaction
        const updatedThought = await Thought.findOneAndUpdate(
            {_id: thoughtId},
            {
                $push: 
                {reactions: {
                reactionId,
                reactionBody,
                username
            },
        },
    },
            {new: true}
            );
        //error message if no id does not exist
        if (!updatedThought) {
            return res.status(404).json({error: 'Thought not found'});
        }
       //message if things went well
        res.json({message: 'Reaction added successfully'});
    } catch (err) {
        console.error('Error adding reaction', err);
        res.status(500).json({error: 'Internal Server Error', message: err.message});
    }
});

//delete single reaction by id
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
    
        const {thoughtId, reactionId } = req.params;
        
        //find thought and update it by deleting reaction
        const deletedReaction = await Thought.findOneAndUpdate(
            {_id: thoughtId},
            {$pull: {reactions: {_id: reactionId}}},
            {new: true},
            );

        //error message if no id does not exist
        if (!deletedReaction) {
            return res.status(404).json({error: 'Thought not found'});
        }
        //message if request was successful
        res.json({message: 'Reaction deleted successfully'});
    } catch (err) {
        console.error('Error deleting reaction', err);
        res.status(500).json({error: 'Internal Server Error', message: err.message});
    }
});

module.exports = router;