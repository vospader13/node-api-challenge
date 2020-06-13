const express = require('express');
const projects = require("../helpers/projectModel");

const router = express.Router();

//POST /api/projects WORKS!
router.post("/", (req, res) => {
    if(!req.body.name || !req.body.description) {
        return res.status(400).json({
            message: "Please provide name and description for project."
        })
    }
    projects.insert(req.body)
        .then((project) => {
            res.status(201).json(project)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "An error occur when saving your project"
            })
        })
})


//GET /api/projects/ WORKS!
router.get("/", (req, res) => {
    projects.get()
        .then((projects) => {
            res.status(200).json(projects)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "No projects for you."
            })
        })
})

//GET /api/projects/:id  WORKS!!
router.get("/:id", (req, res) => {
    projects.get(req.params.id)
        .then((project) => {
            if(project){
                res.status(200).json(project)
            }else{
                res.status(404).json({
                    message: "project not found"
                })
            }
        })
        .catch((error) =>{
            console.log(error) 
            res.status(500).json({
                message: "error retreiving project"
            })
        })
})

//GET /api/projects/:id/actions WORKS!
router.get("/:id/actions", (req, res) => {
    projects.getProjectActions(req.params.id)
        .then((project) => {
            res.status(200).json(project)
        })
        .catch((error) =>{
            console.log(error)
            res.status(404).json({
                message: "No actions for this project."
            })
        })
})


//DELETE /api/projects/:id 
router.delete("/:id",  (req, res)=> {
    projects.remove(req.params.id)
        .then((project) => {
            if(project){
                res.status(200).json(project)
            } else {
                res.status(404).json({
                    message: "This specific project does not exist"
                })
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Cannot remove project"
            })
        })

})

//PUT /api/projects/:id 
router.put("/:id", (req, res) => {
    if(!req.body.name || !req.body.description){
        return res.status(400).json({
            message: "Please provide name and description for project."
        })
    }
    projects.update(req.params.id, req.body)
        .then((project)=> {
            if(project){
                res.status(200).json(project)
            } else {
                res.status(404).json({
                    message: "This specific project does not exist."
                })
            }
        })
        .catch((error)=> {
            console.log(error)
            res.status(500).json({
                message: "Project cannot be changed."
            })
        })
})



module.exports = router;