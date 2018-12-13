const express = require('express')
const db = require('./bearsModel.js')

const router = express.Router()

// Bussiness Logic Or Routing
router.post('/', (req, res) => {
    //grab data from body
    const bear = req.body

    //save data to database
    db
        .add(bear)
        .then(ids => {
            res.status(201).json(ids)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    //return
})

//get a list of bears
router.get('/', (req, res) => {
    db.find()
        .then(list => {
            res.status(200).json(list)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})
// Get a single bear
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const bear = await db.findById(id)

        if (bear) {
            res.status(200).json(bear)
        } else {
            res.status(404).json({ message: "bear not found" })
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

// Delete a bear

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