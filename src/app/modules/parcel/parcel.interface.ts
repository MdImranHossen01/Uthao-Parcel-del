// src/app/modules/parcel/parcel.interface.ts
import { Types } from 'mongoose';

export type TStatusLog = {
  status: 'pending' | 'picked-up' | 'in-transit' | 'delivered' | 'cancelled';
  timestamp: Date;
  notes?: string;
};

export type TParcel = {
  senderId: Types.ObjectId;
  receiverName: string;
  receiverPhoneNumber: string;
  receiverAddress: string;
  pickupAddress: string;
  parcelDescription: string;
  parcelWeight: number;
  trackingId: string;
  status: 'pending' | 'picked-up' | 'in-transit' | 'delivered' | 'cancelled';
  statusHistory: TStatusLog[];
};