const express = require('express');
const router = express.Router();
const bearModel = require('./bearModel.js');

router.get('/', (req, res)=>{
    bearModel.get()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({message: 'Unable to get bears'})
        });
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
    bearModel.get(id)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({ message: 'Unable to get bears' })
        });
});

router.post('/', (req, res)=>{
    let { id } = req.params;
    bearModel.insert(id, req.body)
        .then(data => {
            res.status(201).json({message: 'Creating bear was successful'})
        })
        .catch(err => {
            res.status(500).json({message: 'Unable to create zoo.'})
        })
});

router.put('/:id', (req, res)=>{
    let id = req.params.id;
    bearModel.update(id, req.body)
        .then(data => {
            res.status(200).json({ message: 'bear updated' })
        })
        .catch( err => {
            res.status(500).json({ message: 'Unable to update bear' })
        })
})

router.delete('/:id', (req, res)=>{
    bearModel.delete(req.params.id)
        .then(data => {
            res.status(204).json({message:'bear deleted'})
        })
        .catch(err => {
            res.status(504).json({message: 'Unable to delete bear'})
        })
});

module.exports = router;