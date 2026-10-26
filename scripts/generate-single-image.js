require('dotenv').config();
const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');
const axios = require('axios');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Directory to save images
const imagesDir = path.join(__dirname, '../src/assets/recentprojects');

async function generateImage(projectName, filename) {
  try {
    console.log(`Generating image for: ${projectName}`);
    
    const response = await openai.images.generate({
      prompt: `Create a minimalist, professional tech icon or illustration representing "${projectName}". Use a simple color palette with clean lines. Make it suitable for a tech portfolio website. No text or labels. Modern tech style.`,
      n: 1,
      size: "1024x1024",
    });

    const imageUrl = response.data[0].url;
    console.log(`Image generated for: ${projectName}`);
    
    // Download the image
    const imageResponse = await axios({
      url: imageUrl,
      method: 'GET',
      responseType: 'stream'
    });
    
    // Save the image
    const imagePath = path.join(imagesDir, filename);
    const writer = fs.createWriteStream(imagePath);
    
    imageResponse.data.pipe(writer);
    
    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        console.log(`Image saved to: ${imagePath}`);
        resolve(filename);
      });
      writer.on('error', reject);
    });
  } catch (error) {
    console.error(`Error generating image for ${projectName}:`, error);
    throw error;
  }
}

// Check command-line arguments
const projectName = process.argv[2];
const outputFilename = process.argv[3];

if (!projectName || !outputFilename) {
  console.error('Usage: node generate-single-image.js "Project Name" output-filename.png');
  process.exit(1);
}

// Generate the image
generateImage(projectName, outputFilename)
  .then(() => {
    console.log('Image generation completed successfully!');
  })
  .catch(error => {
    console.error('Error generating image:', error);
    process.exit(1);
  });