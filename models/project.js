
/**
 * @fileoverview Project Schema
 */

// Dependencies
var express = require('express');
var mongoose = require('mongoose');

// Ref.
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var card = require('./card');
var helpers = require('../helpers/global');

// Schema
var ProjectSchema = new Schema({
    date_created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true
    },
    cards: [{
        type: ObjectId,
        ref: 'cards'
    }]
});

// Return model
module.exports = mongoose.model('projects', ProjectSchema);