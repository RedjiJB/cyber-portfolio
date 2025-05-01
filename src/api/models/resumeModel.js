const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  institution: {
    type: String,
    required: true
  },
  degree: {
    type: String,
    required: true
  },
  fieldOfStudy: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  description: {
    type: String
  },
  location: {
    type: String
  }
});

const experienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  current: {
    type: Boolean,
    default: false
  },
  description: {
    type: String
  },
  achievements: [String],
  location: {
    type: String
  }
});

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'expert'],
    default: 'intermediate'
  },
  category: {
    type: String,
    required: true
  }
});

const resumeSchema = new mongoose.Schema(
  {
    basics: {
      name: {
        type: String,
        required: true
      },
      label: {
        type: String
      },
      email: {
        type: String,
        required: true
      },
      phone: {
        type: String
      },
      website: {
        type: String
      },
      location: {
        address: String,
        city: String,
        region: String,
        country: String
      },
      summary: {
        type: String,
        required: true
      },
      profiles: [
        {
          network: String,
          username: String,
          url: String,
          icon: String
        }
      ]
    },
    education: [educationSchema],
    work: [experienceSchema],
    skills: [skillSchema],
    languages: [
      {
        language: String,
        fluency: String
      }
    ],
    interests: [
      {
        name: String,
        description: String
      }
    ],
    publications: [
      {
        title: String,
        publisher: String,
        date: Date,
        url: String,
        summary: String
      }
    ],
    certifications: [
      {
        name: String,
        issuer: String,
        date: Date,
        url: String
      }
    ],
    pdfUrl: {
      type: String,
      default: '/blockchain-resume.pdf'
    },
    version: {
      type: Number,
      default: 1
    }
  },
  {
    timestamps: true
  }
);

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;