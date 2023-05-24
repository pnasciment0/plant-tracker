// User.js

import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt?: Date;
    tokens: { token: string }[];
    locations: mongoose.Types.ObjectId[];
    plants: mongoose.Types.ObjectId[];
}

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 3,
        maxlength: 30,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    tokens: [{
        token: {
          type: String,
          required: true
        }
    }],
    locations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Location' }],
    plants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plant' }],
});

userSchema.virtual('vPlants', {
    ref: 'Plant',
    localField: '_id',
    foreignField: 'userId',
    justOne: false
});

// const User = mongoose.model('User', userSchema);
export type { IUser };

export const User = mongoose.model<IUser>('User', userSchema);
