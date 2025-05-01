const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters']
    },
    content: {
      type: String,
      required: [true, 'Blog content is required']
    },
    excerpt: {
      type: String,
      required: [true, 'Blog excerpt is required'],
      maxlength: [500, 'Excerpt cannot be more than 500 characters']
    },
    coverImage: {
      type: String,
      default: '/assets/blog/default-cover.jpg'
    },
    categories: [{
      type: String,
      required: [true, 'At least one category is required'],
      enum: {
        values: ['Blockchain', 'AI', 'Web Development', 'Cybersecurity', 'DeFi', 'Programming', 'Research'],
        message: '{VALUE} is not a supported category'
      }
    }],
    featured: {
      type: Boolean,
      default: false
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    readTime: {
      type: Number,
      default: function() {
        // Calculate read time based on content length (avg reading speed: 200 words per minute)
        const wordCount = this.content.split(/\s+/).length;
        return Math.ceil(wordCount / 200);
      }
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Add a slug based on the title
blogSchema.virtual('slug').get(function() {
  return this.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
});

// Format the date for display
blogSchema.virtual('formattedDate').get(function() {
  return new Date(this.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Indexes for faster queries
blogSchema.index({ categories: 1 });
blogSchema.index({ featured: 1 });
blogSchema.index({ createdAt: -1 });
blogSchema.index({ author: 1 });

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;