// migrations/20220101000000-add-new-fields-to-scheme.js

const Scheme = require('../models/scheme');

module.exports = {
  async up(db, client) {
    // Add new fields to the existing 'schemes' collection
    await Scheme.updateMany({}, { $set: { newField: 'defaultValue' } });

    console.log('Migration: Added new fields to Scheme model');
  },

  async down(db, client) {
    // Remove the newField from the existing 'schemes' collection
    await Scheme.updateMany({}, { $unset: { newField: 1 } });

    console.log('Migration: Removed new fields from Scheme model');
  },
};
