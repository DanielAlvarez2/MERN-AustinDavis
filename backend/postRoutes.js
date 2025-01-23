const express = require('express')
const database = require('./connect.js')
const ObjectId = require('mongodb').ObjectId

let postRoutes = express.Router()

// #1 - Retrieve All
postRoutes.route('/posts').get(async (req,res)=>{
    let db = database.getDb()
    let data = await db.collection('posts').find({}).toArray()
    if (data.length > 0){
        res.json(data)
    }else{
        throw new Error("Data was not found.")
        // need error handling for production to prevent server crashing
    }
})
// #2 - Retrieve One
postRoutes.route('/posts/:id').get(async (req,res)=>{
    let db = database.getDb()
    let data = await db.collection('posts').findOne({_id: new ObjectId(req.params.id)})
    if (Object.keys(data).length > 0){
        res.json(data)
    }else{
        throw new Error("Data was not found.")
        // need error handling for production to prevent server crashing
    }
})
// #3 - Create One
postRoutes.route('/posts').post(async (req,res)=>{
    let db = database.getDb()
    let mongoObject = {
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        author: req.body.author,
        dateCreated: req.body.dateCreated
    }
    let data = await db.collection('posts').insertOne(mongoObject)
    res.json(data)
})
// #4 - Update One
postRoutes.route('/posts/:id').put(async (req,res)=>{
    let db = database.getDb()
    let mongoObject = {
        $set: {
            title: req.body.title,
            description: req.body.description,
            content: req.body.content,
            author: req.body.author,
            dateCreated: req.body.dateCreated
        }
    }
    let data = await db.collection('posts').updateOne({_id: new ObjectId(req.params.id)}, mongoObject)
    res.json(data)
})
// #5 - Delete One
postRoutes.route('/posts:id').delete(async (req,res)=>{
    let db = database.getDb()
    let data = await db.collection('posts').deleteOne({_id: new ObjectId(req.params.id)})
    res.json(data)
})

module.exports = postRoutes