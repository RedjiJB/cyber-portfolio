require('dotenv').config();
const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');
const axios = require('axios');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // Uses API key from .env file
});

// Path to projects.json
const projectsJsonPath = path.join(__dirname, '../src/settings/projects.json');
// Path to save images
const imagesDir = path.join(__dirname, '../src/assets/projects');

// Ensure the images directory exists
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

async function generateImage(prompt, filename) {
  try {
    console.log(`Generating image for: ${prompt}`);
    
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `High-quality professional illustration of ${prompt}, suitable for a tech portfolio website, digital art style, clean background`,
      n: 1,
      size: "1024x1024",
    });

    const imageUrl = response.data[0].url;
    console.log(`Image generated successfully for: ${prompt}`);
    
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
    console.error(`Error generating image for ${prompt}:`, error);
    throw error;
  }
}

async function updateProjectsJson(imageName, projectId) {
  // Read projects.json
  const projectsJson = JSON.parse(fs.readFileSync(projectsJsonPath, 'utf8'));
  
  // Find the project by ID
  const project = projectsJson.projects.find(p => p.id === projectId);
  
  if (project) {
    // Update the image path
    project.image = `/assets/projects/${imageName}`;
    
    // Write back to projects.json
    fs.writeFileSync(projectsJsonPath, JSON.stringify(projectsJson, null, 2));
    console.log(`Updated projects.json for project ID ${projectId}`);
  } else {
    console.warn(`Project with ID ${projectId} not found.`);
  }
}

async function main() {
  try {
    // Read projects.json
    const projectsData = JSON.parse(fs.readFileSync(projectsJsonPath, 'utf8'));
    const projects = projectsData.projects;
    
    // Process each project
    for (const project of projects) {
      const projectId = project.id;
      const projectTitle = project.title;
      const filename = `project-${projectId}.png`;
      
      // Generate and save image
      await generateImage(projectTitle, filename);
      
      // Update projects.json with the new image path
      await updateProjectsJson(filename, projectId);
      
      // Delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    console.log('All images generated and projects.json updated successfully!');
  } catch (error) {
    console.error('Error in main function:', error);
  }
}

main();