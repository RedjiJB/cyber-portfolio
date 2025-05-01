# Project Image Generation

This guide explains how to use the script to generate images for your projects using OpenAI's DALL-E.

## Prerequisites

- Node.js installed
- OpenAI API key

## Setup

1. Install required dependencies:

```bash
npm install openai axios
```

2. Create a `.env` file in the root directory by copying the example:

```bash
cp .env.example .env
```

3. Add your OpenAI API key to the `.env` file:

```
OPENAI_API_KEY=your_actual_api_key_here
```

## Running the Script

1. Run the image generation script:

```bash
node scripts/generate-project-images.js
```

2. The script will:
   - Generate images for each project in your `projects.json` file
   - Save the images to `src/assets/projects/`
   - Update the `projects.json` file with the new image paths

## Security Notes

- Never commit your `.env` file containing your API key to version control
- The `.env` file is included in `.gitignore` to prevent accidental commits
- Keep your API key secure and rotate it if you suspect it has been compromised

## Customization

You can modify the script to change:
- Image size and quality
- Prompt structure
- Image naming convention
- Output directory

## Troubleshooting

If you encounter rate limits, try:
- Increasing the delay between requests
- Requesting fewer images at once
- Checking your OpenAI API usage limits