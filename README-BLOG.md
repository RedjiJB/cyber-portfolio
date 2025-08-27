# Blog Management Guide

## Current Architecture

The blog system uses a modern JavaScript module-based approach with these components:

```
src/utils/
├── blogData.js      # Central blog post data and configuration
└── blogManager.js   # Blog management utilities (deprecated)

public/
├── content/blog/
│   ├── images/      # All blog images
│   └── posts/       # Markdown files for blog content
└── blog-images/     # Legacy image directory
```

## Interactive Blog Carousel

The blog features an interactive carousel component with:
- ✅ Smooth navigation with autoplay
- ✅ Manual controls (play/pause, next/prev)
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ Direct navigation to individual blog posts
- ✅ Progress indicators

## Quick Start: Adding a New Blog Post

### Step 1: Prepare Your Image
```bash
# Copy your image to the appropriate location
cp /path/to/your-image.jpg public/content/blog/images/
```

### Step 2: Add to Blog Data
Edit `/src/utils/blogData.js` and add your post to the `blogPosts` array:

```javascript
{
  id: "your-post-id",
  slug: "your-amazing-blog-post", 
  title: "Your Amazing Blog Post Title",
  date: "2025-08-27",
  author: "Your Name",
  category: "Co op Student", // or "D Central" or "Extracurricular Projects"
  tags: ["Cybersecurity", "Tutorial", "Networking"],
  description: "A compelling 2-3 sentence summary that makes readers want to click and read more about your topic.",
  image: "/content/blog/images/your-image.jpg",
  readingTime: 7,
  featured: false
}
```

### Step 3: Create Markdown Content (Optional)
For posts with extensive content, create a markdown file:

```bash
# Create markdown file
echo "# Your Blog Post Title\n\nYour content here..." > public/content/blog/posts/your-post-slug.md
```

### Step 4: Image Guidelines
- Place images in `public/content/blog/images/`
- Use web path: `/content/blog/images/filename.jpg`
- Recommended size: 1200x630px
- Format: JPG or PNG
- Keep file size under 500KB

### Blog Categories
Choose from three available categories:
- **"D Central"** - Security sovereignty and democratic technology research
- **"Co op Student"** - Technical learning and academic project showcases  
- **"Extracurricular Projects"** - Independent innovation and development

### Available Tags
Current tags in the system:
- Hardware, Linux, Development, Setup, Cybersecurity
- Drones, AI, Security, IoT, Autonomous Systems, Open Source
- Python, VLSM, Networking, Project Planning, Network Design
- International Development, Haiti, Policy Analysis

Feel free to create new tags as needed!

### Field Explanations

- **id**: Unique number (use next available number)
- **title**: Post title (will appear in cards and headers)
- **excerpt**: Short description for blog cards
- **content**: Full article content (supports basic HTML)
- **author**: Your name
- **date**: Publication date (YYYY-MM-DD format)
- **readTime**: Estimated reading time
- **tags**: Array of category tags for filtering
- **featured**: Set to `true` to make it the featured post
- **image**: Path to header image
- **slug**: URL-friendly version of title

### Pro Tips

1. **Featured Posts**: Only set `featured: true` for your best content
2. **SEO-Friendly Slugs**: Use lowercase, hyphens, no spaces
3. **Tags**: Use existing tags when possible for better filtering
4. **Content Length**: Aim for 500-2000 words for good engagement
5. **Images**: Always include a relevant header image
6. **IDs**: Use sequential numbers (current highest ID + 1)

### Example: Complete Blog Post Entry

```json
{
  "id": 4,
  "title": "Advanced Network Security Monitoring",
  "excerpt": "Learn how to implement comprehensive network monitoring solutions using open-source tools and industry best practices.",
  "content": "<p>Network security monitoring is a critical component of any robust cybersecurity strategy. In this comprehensive guide, we'll explore the essential tools and techniques needed to build an effective monitoring system.</p><h2>Key Components</h2><p>The foundation of network security monitoring relies on several core components...</p>",
  "author": "Your Name",
  "date": "2024-01-25",
  "readTime": "15 min read",
  "tags": ["Networking", "Security", "Monitoring"],
  "featured": false,
  "image": "/images/network-monitoring.jpg",
  "slug": "advanced-network-security-monitoring"
}
```

### Quick Commands

**Add new image:**
```bash
cp /path/to/image.jpg content/blog/images/
```

**Check blog structure:**
```bash
tree content/blog/
```

**Validate JSON syntax:**
```bash
python3 -m json.tool src/settings/blog.json
```

**List all blog images:**
```bash
ls -la content/blog/images/
```

## Content Organization Benefits

1. **Centralized**: All blog content in one place
2. **Organized**: Separate folders for images, posts, drafts
3. **Scalable**: Easy to add new content types
4. **Portable**: Easy to backup and move
5. **Version Control**: Track all content changes

The blog page will automatically update with your new post once you save the JSON file!
