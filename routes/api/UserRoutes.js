const router = require('express').Router();
const {User} = require('../../models');


router.get('/', async (req, res) => {
    try {
        const userData = await User.find();
        res.json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const singleUser = await User.findOne({_id: req.params.id});
        if (!singleUser) {
            return res.status(404).json({message: 'No user found with that id'})
        }
        res.json(singleUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const postUser = await User.create(req.body);
        res.json(postUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updateUser = await User.findOneAndUpdate({_id: req.params.id}, req.body, {
            new: true,
            runValidators: true,
        });
        res.json(updateUser);
    } catch (err) {
        res.status(500).json(err)
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deleteUser = await User.findOneAndDelete({_id: req.params.id})
        res.json(deleteUser);
    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        const {userId, friendId} = req.params;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }

        user.friends.push(friendId);

        await user.save();
        res.json({message: 'Friend added successfully'});
    } catch (err) {
        console.error('Error adding friend', err);
        res.status(500).json({error: 'Internal Server Error', message: err.message});
    }
});

router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        const {userId, friendId} = req.params;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }

        user.friends.pull(friendId);

        await user.save();
        res.json({message: 'Friend removed successfully'});
    } catch (err) {
        console.error('Error removing friend', err);
        res.status(500).json({error: 'Internal Server Error', message: err.message});
    }
});


module.exports = router;