const express = require('express')
const db = require('./zooModel.js')

const router = express.Router()

// Bussiness Logic Or Routing 
router.post('/', (req, res) => {
    //grab data from body
    const zoo = req.body

    //save data to database
    db
    .add(zoo)
    .then(ids => {
            res.status(201).json(ids)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    //return
})

//get a list of zoos
router.get('/', (req, res) => {
    db.find()
    .then(list => {
            res.status(200).json(list)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})
// Get a single zoo
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const zoo = await db.findById(id)

        if (zoo) {
            res.status(200).json(zoo)
        } else {
            res.status(404).json({ message: "Zoo not found" })
        }

    } catch (error) {
        res.status(500).json(error)
    }


})

//Update 
router.put('/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body

    db.update(id, changes)
        .then(count => {

            if (!count || count < 1) {
                res.status(404).json({ message: 'No records found to update' })

            } else {
                res.status(200).json(count)

            }

        }).catch(err => {
            res.status(500).json(err)
        })
})

// Delete a zoo

router.delete('/:id', (req, res) => {
    const { id } = req.params

    db.remove(id)
        .then(count => {

            if (!count || count < 1) {
                res.status(404).json({ message: 'No records found to delete' })

            } else {
                res.status(200).json(count)

            }

        }).catch(err => {
            res.status(500).json(err)
        })
})

module.exports = router