const express = require('express');
const actions = require("../helpers/actionModel");

const router = express.Router();

//POST /api/projects/:id/actions/ WORKS!
router.post("/", (req, res) => {
    if(!req.body.description || !req.body.notes){
        return res.status(400).json({
            message: "Please provide notes and description for the action."
        })
    }
    actions.insert(req.body || req.description)
        .then((action) => {
            res.status(201).json(action)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "error while saving"
            })
        })
})


// GET /api/projects/:id/actions !
router.get("/", (req, res) => {
    const options = {
        sortBy: req.query.sortBy,
        limit: req.query.limit,
    }
    actions.get(options)
        .then((action) => {
            res.status(200).json(action)
        })
        .catch((error) =>{
            console.log(error)
            res.status(500).json({
                message:"Error retrieving actions"
            })
        })
})



//GET /api/projects/:id/actions/:id WORKS!
router.get("/:id", (req, res) => {
    actions.get(req.params.id)
        .then((action) => {
            if(action){
                res.status(200).json(action)
            } else {
                res.status(404).json({
                    message:"action not found"
                })
            }
        })
        .catch((error) => {
            next(error)
        })
})



//DELETE /api/project/:id/actions/:id
router.delete("/:id",  (req, res)=> {
    actions.remove(req.params.id)
        .then((action) => {
            if(action){
                res.status(200).json(action)
            } else {
                res.status(404).json({
                    message: "This specific action does not exist"
                })
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Cannot remove action"
            })
        })

})

//PUT /api/actions/:id
router.put("/:id", (req, res) => {
    if(!req.body.description || !req.body.notes){
        return res.status(400).json({
            message: "Please provide notes and discription for action."
        })
    }
    actions.update(req.params.id, req.body)
        .then((action)=> {
            if(action){
                res.status(200).json(action)
            } else {
                res.status(404).json({
                    message: "This specific action does not exist."
                })
            }
        })
        .catch((error)=> {
            console.log(error)
            res.status(500).json({
                message: "Action cannot be changed."
            })
        })
})






module.exports = router;