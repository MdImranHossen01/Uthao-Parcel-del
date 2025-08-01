import { Request, Response } from 'express';
import { ParcelService } from './parcel.service';
import { catchAsync } from '../../utils/catchAsync';

const createParcel = catchAsync(async (req: Request, res: Response) => {
  const senderId = req.user?.userId;
  const parcelData = req.body;
  const result = await ParcelService.createParcel(senderId as string, parcelData);
  res.status(201).json({
    success: true,
    message: 'Parcel created successfully!',
    data: result,
  });
});

const getMyParcels = catchAsync(async (req: Request, res: Response) => {
  const senderId = req.user?.userId;
  const result = await ParcelService.getMyParcels(senderId as string);
  res.status(200).json({
    success: true,
    message: 'Parcels retrieved successfully!',
    data: result,
  });
});

const cancelParcel = catchAsync(async (req: Request, res: Response) => {
  const { parcelId } = req.params;
  const senderId = req.user?.userId as string;
  const result = await ParcelService.cancelParcel(parcelId, senderId);
  res.status(200).json({
    success: true,
    message: 'Parcel cancelled successfully!',
    data: result,
  });
});

const getAllParcels = catchAsync(async (req: Request, res: Response) => {
  const result = await ParcelService.getAllParcels();
  res.status(200).json({
    success: true,
    message: 'All parcels retrieved successfully!',
    data: result,
  });
});

const updateParcelStatus = catchAsync(async (req: Request, res: Response) => {
  const { parcelId } = req.params;
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({
      success: false,
      message: 'Status is required.',
    });
  }
  const result = await ParcelService.updateParcelStatus(parcelId, status);
  res.status(200).json({
    success: true,
    message: 'Parcel status updated successfully!',
    data: result,
  });
});

const getMyDeliveries = catchAsync(async (req: Request, res: Response) => {
  const receiverId = req.user?.userId as string;
  const result = await ParcelService.getMyDeliveries(receiverId);
  res.status(200).json({
    success: true,
    message: 'My deliveries retrieved successfully!',
    data: result,
  });
});

const confirmDelivery = catchAsync(async (req: Request, res: Response) => {
  const { parcelId } = req.params;
  const receiverId = req.user?.userId as string;

  const result = await ParcelService.confirmDelivery(parcelId, receiverId);

  res.status(200).json({
    success: true,
    message: 'Delivery confirmed successfully!',
    data: result,
  });
});

const trackParcelById = catchAsync(async (req: Request, res: Response) => {
  const { trackingId } = req.params;
  const result = await ParcelService.trackParcelById(trackingId);

  res.status(200).json({
    success: true,
    message: 'Parcel status retrieved successfully!',
    data: result,
  });
});

export const ParcelController = {
  createParcel,
  getMyParcels,
  cancelParcel,
  getAllParcels,
  updateParcelStatus,
  getMyDeliveries,
  confirmDelivery,
  trackParcelById,
};