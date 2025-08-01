import express from 'express';
import { auth } from '../../middlewares/auth';
import { ParcelController } from './parcel.controller';

const router = express.Router();

// == SENDER ROUTES ==
router.post('/', auth('sender'), ParcelController.createParcel);
router.get('/my-parcels', auth('sender'), ParcelController.getMyParcels);
router.patch(
  '/:parcelId/cancel',
  auth('sender'),
  ParcelController.cancelParcel,
);

// == ADMIN ROUTES ==
router.get('/all', auth('admin'), ParcelController.getAllParcels);
router.patch(
  '/:parcelId/update-status',
  auth('admin'),
  ParcelController.updateParcelStatus,
);

// == RECEIVER ROUTES ==
router.get(
  '/my-deliveries',
  auth('receiver'),
  ParcelController.getMyDeliveries,
);
router.patch(
  '/:parcelId/confirm-delivery',
  auth('receiver'),
  ParcelController.confirmDelivery,
);

// == PUBLIC ROUTE ==
router.get('/track/:trackingId', ParcelController.trackParcelById);

export const ParcelRoutes = router;