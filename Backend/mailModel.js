const mongoose = require('mongoose');

const mailSchema = new mongoose.Schema({
  fromName: { type: String, required: true },
  fromEmail: { type: String, required: true },
  toName: { type: String, required: true },
  toEmail: { type: String, required: true },
  cc: { type: String, default: '' },
  bcc: { type: String, default: '' },
  threadId: { type: Number, default: null },
  messageId: { type: String, default: '' },
  inReplyTo: { type: String, default: '' },
  references: { type: String, default: '' },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  folder: { type: String, default: 'Inbox' },
  uid: { type: Number, default: null },
  sentAt: { type: Date, required: true },
  archivedAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
  replyTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Mail', default: null } // To link replies to original emails
}, { timestamps: true });

// Indexes for commonly queried fields
mailSchema.index({ fromEmail: 1 });
mailSchema.index({ toEmail: 1 });
mailSchema.index({ subject: 1 });
mailSchema.index({ sentAt: -1 });

const Mail = mongoose.model('Mail', mailSchema);

module.exports = Mail;
