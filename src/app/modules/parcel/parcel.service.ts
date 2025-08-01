import { Types } from 'mongoose';
import { TParcel, TStatusLog } from './parcel.interface';
import { Parcel } from './parcel.model';
import { User } from '../user/user.model';

const generateTrackingId = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `UT-${timestamp}-${random}`;
};

const createParcel = async (
  senderId: string,
  payload: Omit<TParcel, 'senderId' | 'trackingId' | 'status' | 'statusHistory'>,
) => {
  const parcelData: Partial<TParcel> = { ...payload };
  parcelData.senderId = new Types.ObjectId(senderId);
  parcelData.trackingId = generateTrackingId();
  parcelData.status = 'pending';
  parcelData.statusHistory = [{ status: 'pending', timestamp: new Date() }];
  const result = await Parcel.create(parcelData);
  return result;
};

const getMyParcels = async (senderId: string) => {
  const result = await Parcel.find({ senderId }).sort({ createdAt: -1 });
  return result;
};

const cancelParcel = async (parcelId: string, senderId: string) => {
  const parcel = await Parcel.findById(parcelId);
  if (!parcel) throw new Error('Parcel not found!');
  if (parcel.senderId.toString() !== senderId)
    throw new Error('You are not authorized to cancel this parcel!');
  if (parcel.status !== 'pending')
    throw new Error(`Cannot cancel parcel with status '${parcel.status}'.`);
  return Parcel.findByIdAndUpdate(
    parcelId,
    {
      $set: { status: 'cancelled' },
      $push: { statusHistory: { status: 'cancelled', timestamp: new Date() } },
    },
    { new: true },
  );
};

const getAllParcels = async () => {
  return Parcel.find({}).sort({ createdAt: -1 });
};

const updateParcelStatus = async (
  parcelId: string,
  status: TStatusLog['status'],
) => {
  const parcel = await Parcel.findById(parcelId);
  if (!parcel) throw new Error('Parcel not found!');
  if (parcel.status === 'delivered' || parcel.status === 'cancelled')
    throw new Error(`Cannot update parcel that is already '${parcel.status}'.`);
  return Parcel.findByIdAndUpdate(
    parcelId,
    {
      $set: { status: status },
      $push: { statusHistory: { status: status, timestamp: new Date() } },
    },
    { new: true },
  );
};

const getMyDeliveries = async (receiverId: string) => {
  const receiver = await User.findById(receiverId);
  if (!receiver) throw new Error('Receiver not found!');
  return Parcel.find({
    receiverPhoneNumber: receiver.phoneNumber,
  }).sort({ createdAt: -1 });
};

const confirmDelivery = async (parcelId: string, receiverId: string) => {
  const parcel = await Parcel.findById(parcelId);
  if (!parcel) throw new Error('Parcel not found!');

  const receiver = await User.findById(receiverId);
  if (!receiver) throw new Error('Receiver not found!');

  if (parcel.receiverPhoneNumber !== receiver.phoneNumber)
    throw new Error('You are not authorized to confirm this delivery.');

  if (parcel.status !== 'in-transit')
    throw new Error(
      `Cannot confirm delivery for a parcel with status '${parcel.status}'.`,
    );

  return Parcel.findByIdAndUpdate(
    parcelId,
    {
      $set: { status: 'delivered' },
      $push: { statusHistory: { status: 'delivered', timestamp: new Date() } },
    },
    { new: true },
  );
};

const trackParcelById = async (trackingId: string) => {
  const parcel = await Parcel.findOne({ trackingId }).select(
    'status statusHistory createdAt',
  );

  if (!parcel) {
    throw new Error('Tracking ID not valid.');
  }

  return parcel;
};

export const ParcelService = {
  createParcel,
  getMyParcels,
  cancelParcel,
  getAllParcels,
  updateParcelStatus,
  getMyDeliveries,
  confirmDelivery,
  trackParcelById,
};