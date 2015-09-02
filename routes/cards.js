
/**
 * @fileoverview Routes for Card Schema.
 */

// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

// Ref.
var Card = require( '../models/card' );

// Routes
// get_all
router.get( '/cards', function( req, res ) {
  Card.find( function( err, cards ) {
      res.json( cards );
  });
});

// get_by_name
router.get( '/cards/title/:title', function ( req, res )  {
 mongoose.model('cards').find( { title: req.params.title },
 function ( err, card ) {
    mongoose.model('cards').populate( card, { path: 'project' },
    function ( err, card ) {
      res.send( card );
    });
 });
});

module.exports = router;
