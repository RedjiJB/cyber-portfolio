# Blog Content Directory

This directory contains all blog-related content in a centralized location.

## Directory Structure

```
content/blog/
├── images/          # All blog post images
├── posts/           # Individual post files (Markdown format)
├── drafts/          # Draft posts not yet published
└── README.md        # This documentation
```

## Adding New Content

### 1. Images
- Place all blog images in `images/` directory
- Recommended size: 1200x630px
- Formats: JPG, PNG, WebP
- Keep file size under 500KB
- Use descriptive filenames: `cybersecurity-fundamentals.jpg`

### 2. Blog Posts
Two options for creating posts:

**Option A: Quick Posts (JSON)**
- Edit `/src/settings/blog.json` directly
- Best for shorter posts and quick updates

**Option B: Individual Files (Markdown)**
- Create `.md` files in `posts/` directory
- Use front matter for metadata
- Better for longer, complex posts

### 3. Drafts
- Save work-in-progress posts in `drafts/` directory
- Move to `posts/` when ready to publish

## Image Usage

Images are automatically accessible via web path:
- File location: `content/blog/images/my-image.jpg`
- Web path: `/blog-images/my-image.jpg`
- JSON reference: `"image": "/blog-images/my-image.jpg"`

## Example Post File

Create `posts/example-post.md`:

```markdown
---
id: 4
title: "My New Blog Post"
excerpt: "A brief description of the post content"
author: "Your Name"
date: "2024-01-20"
readTime: "5 min read"
tags: ["Cybersecurity", "Tutorial"]
featured: false
image: "/blog-images/example-post.jpg"
slug: "my-new-blog-post"
---

# My New Blog Post

Your markdown content goes here...

## Section 1

More content...
```

## Quick Commands

```bash
# Add new image
cp /path/to/image.jpg content/blog/images/

# Create new post
touch content/blog/posts/new-post.md

# List all images
ls -la content/blog/images/

# Count posts
ls content/blog/posts/*.md | wc -l
```

## Tips

1. **Consistent Naming**: Use kebab-case for filenames
2. **Image Optimization**: Compress images before adding
3. **Backup**: This directory contains all your blog content
4. **Version Control**: Add this directory to git for versioning
