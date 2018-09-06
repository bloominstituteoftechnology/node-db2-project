const knex=require('knex');
const dbConfig=require('../knexfile');
const db = knex(dbConfig.development);
const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
    db('zoos')
      .select('name')
      .then(zoos=>res.status(200).json(zoos))
      .catch(err=>res.status(500)
      .json(err));
    })
router.post('/',(req,res)=>{
    const zoo=req.body;
    db
      .insert(zoo)
      .into('zoos')
      .then(id=>res.status(201).json(id))
      .catch(err=>res.status(500).json(err));
    })
router.get('/:id',(req,res)=>{
    db('zoos')
      .where(({'id':req.params.id}))
      .then(row=>res.status(200).json(row))
      .catch(err=>res.status(500).json(err));
    })
router.delete('/:id',(req,res)=>{
    db('zoos')
      .where({'id':req.params.id})
      .del()
      .then(count=>res.status(200).json(count))
      .catch(err=>res.status(500).json(err));
    })
router.put('/:id',(req,res)=>{
    const zoo=req.body;
    db('zoos')
      .where({'id':req.params.id})
      .update(zoo)
      .then(count=>res.status(200).json(count))
      .catch(err=>res.status(500).json(err));
    })

module.exports=router;