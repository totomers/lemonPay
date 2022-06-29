import mongoose from 'mongoose';

export type IInvitationDocument = mongoose.Document & {
  businessId: mongoose.Types.ObjectId | string;
  email: string;
  status: 'accepted' | 'pending' | 'declined';
};
