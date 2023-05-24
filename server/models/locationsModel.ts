import mongoose, { Document, Model, Schema } from 'mongoose';

interface ILocation extends Document {
    userId: Schema.Types.ObjectId,
    name: String,
    plants: Schema.Types.ObjectId[],
    createdAt: Date,
    updatedAt?: Date,
}

interface ILocationModel extends Model<ILocation> {}

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

// const Location: ILocationModel = mongoose.model<ILocation>('Location', locationSchema);

export type { ILocation };

export const Location = mongoose.model<ILocation>('Location', locationSchema);