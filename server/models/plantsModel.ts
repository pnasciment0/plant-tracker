import mongoose, { Document, Model } from 'mongoose';
import { IUser } from './usersModel'; // assuming this is the right path to import IUser

const Schema = mongoose.Schema;

interface IPlant {
  userId: IUser['_id'];
  species: string;
  location: string;
  name: string;
  wateringFrequency: number;
  lastWatered: Date;
  notes?: string;
  fertilizerFrequency?: number;
  lastFertilized?: Date;
  potSize?: number;
  pottedOn?: Date;
  soilMix?: string;
  createdAt: Date;
  updatedAt?: Date;
}

interface IPlantModel extends Model<IPlant> {}

const plantSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  species: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  wateringFrequency: {
    type: Number,
    required: true
  },
  lastWatered: {
    type: Date,
    required: true
  },
  notes: {
    type: String
  },
  fertilizerFrequency: {
    type: Number
  },
  lastFertilized: {
    type: Date
  },
  potSize: {
    type: Number
  },
  pottedOn: {
    type: Date
  },
  soilMix: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
      type: Date,
  },
});

export type { IPlant };

export const Plant = mongoose.model<IPlantModel>('Plant', plantSchema);