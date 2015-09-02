
/**
 * @fileoverview Card Schema
 */

// Dependencies
var express = require('express');
var mongoose = require('mongoose');

// Ref.
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var helpers = require('../helpers/global');

// Schema
var CardSchema = new Schema({
    date_created: {
        type: Date,
        default: Date.now
    },
    tite: {
        type: String,
        trim: true,
        reuqired: true
    },
    description: String,
    priority: {
        type: String,
        lowercase: true,
        trim: true
    },
    status: {
        type: String,
        lowercase: true,
        trim: true
    },
    project: {
        type: ObjectId,
        ref: 'projects'
    }
});

// Return model
module.exports = mongoose.model('cards', CardSchema);
