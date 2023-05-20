const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    plants: [{
        type: Schema.Types.ObjectId,
        ref: 'Plant'
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    },
    });
    
    locationSchema.index({ userId: 1, name: 1 }, { unique: true });
    
    const Location = mongoose.model('Location', locationSchema);
    
    module.exports = { Location };