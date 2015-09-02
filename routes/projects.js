/**
 * @fileoverview Routes for Project Schema.
 */

// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

// Routes
// get_all
router.get('/projects', function(req, res) {
    mongoose.model('projects').find(function(err, project) {
        res.send(project);
    });
});

// get_by_projectID
router.get('/projects/id/:projectId', function(req, res) {
    mongoose.model('projects').find({
            name: req.params.projectId
        },
        function(err, project) {
            mongoose.model('projects').populate(project, {
                    path: 'cards'
                },
                function(err, project) {
                    res.send(project);
                });
        });
});

// get_by_name
router.get('/projects/:name', function(req, res) {
    mongoose.model('projects').find({
            name: req.params.name
        },
        function(err, project) {
            mongoose.model('projects').populate(project, {
                    path: 'cards'
                },
                function(err, project) {
                    res.send(project);
                });
        });
});

// post_create_project
router.post('/projects', function(req, res, next) {

    var Project = mongoose.model('projects');
    var projectName = req.body.name;

    Project.find({
        name: projectName
    }, function(err, project) {

        var newProject;

        if (err) {
            res.status(500).send({
                error: "Unaxpected error ocured " + err
            });
            return;
        }

        // project exist, don't save 
        if (project) {
            res.status(409).send({
                error: 'Project name already exist, please enter a diffrent one!'
            });
            return;
        }

        newProject = new Project({
            name: projectName
        });

        newProject.save(function(err, project) {
            if (err) {
                res.send({
                    error: "Unaxpected error ocured " + err
                });
                return;
            }
            res.send(true);
        });

    });
});

module.exports = router;