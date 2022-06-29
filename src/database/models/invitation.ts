import mongoose from 'mongoose';
import { IInvitationDocument } from 'src/types/invitation.interface';

const InvitationSchema = new mongoose.Schema(
  {
    businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'business' },
    email: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ['accepted', 'pending', 'declined'],
      default: 'pending',
      required: true,
    },
  },
  { timestamps: true }
);

export const Invitation =
  mongoose.models.invitations ||
  mongoose.model<IInvitationDocument>(
    'invitation',
    InvitationSchema,
    'invitations'
  );
