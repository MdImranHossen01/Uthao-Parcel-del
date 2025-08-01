import { Schema, model } from 'mongoose';
import { TParcel, TStatusLog } from './parcel.interface';

const statusLogSchema = new Schema<TStatusLog>(
  {
    status: {
      type: String,
      enum: ['pending', 'picked-up', 'in-transit', 'delivered', 'cancelled'],
      required: true,
    },
    timestamp: { type: Date, default: Date.now },
    notes: { type: String },
  },
  { _id: false },
);

const parcelSchema = new Schema<TParcel>(
  {
    senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiverName: { type: String, required: true },
    receiverPhoneNumber: { type: String, required: true },
    receiverAddress: { type: String, required: true },
    pickupAddress: { type: String, required: true },
    parcelDescription: { type: String, required: true },
    parcelWeight: { type: Number, required: true },
    trackingId: { type: String, unique: true, required: true },
    status: {
      type: String,
      enum: ['pending', 'picked-up', 'in-transit', 'delivered', 'cancelled'],
      default: 'pending',
    },
    statusHistory: [statusLogSchema],
  },
  { timestamps: true },
);

export const Parcel = model<TParcel>('Parcel', parcelSchema);