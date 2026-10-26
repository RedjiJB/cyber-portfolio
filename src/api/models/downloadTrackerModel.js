const mongoose = require('mongoose');

const downloadTrackerSchema = new mongoose.Schema(
  {
    documentType: {
      type: String,
      required: true,
      enum: ['resume', 'portfolio', 'other']
    },
    source: {
      type: String,
      required: true,
      default: 'website'
    },
    referrer: {
      type: String
    },
    ipAddress: {
      type: String
    },
    userAgent: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

// Indexes for faster queries
downloadTrackerSchema.index({ documentType: 1 });
downloadTrackerSchema.index({ createdAt: -1 });
downloadTrackerSchema.index({ source: 1 });

const DownloadTracker = mongoose.model('DownloadTracker', downloadTrackerSchema);

module.exports = DownloadTracker;