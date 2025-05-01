const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters']
    },
    overview: {
      type: String,
      required: [true, 'Project overview is required'],
      trim: true
    },
    problem: {
      type: String,
      trim: true
    },
    features: [{
      type: String,
      trim: true
    }],
    image: {
      type: String,
      default: '/assets/recentprojects/default-project.png'
    },
    technologies: [{
      type: String,
      required: [true, 'At least one technology is required']
    }],
    demoUrl: {
      type: String,
      trim: true
    },
    githubUrl: {
      type: String,
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Project category is required'],
      enum: {
        values: ['Blockchain', 'AI', 'Cross-Disciplinary', 'Networking', 'Cybersecurity', 'IoT', 'Web Development'],
        message: '{VALUE} is not a supported category'
      }
    },
    featured: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Add a slug based on the title
projectSchema.virtual('slug').get(function() {
  return this.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
});

// Add a createdAtFormatted field
projectSchema.virtual('createdAtFormatted').get(function() {
  return new Date(this.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });
});

// Index for faster queries
projectSchema.index({ category: 1 });
projectSchema.index({ featured: 1 });
projectSchema.index({ createdAt: -1 });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;