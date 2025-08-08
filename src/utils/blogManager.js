import blogData from './blogData';

class BlogManager {
  constructor() {
    this.config = blogData.config;
    this.posts = blogData.posts;
  }

  // Get all blog posts with metadata
  getAllPosts() {
    return this.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  // Get a single post by slug
  getPostBySlug(slug) {
    const post = this.posts.find(p => p.slug === slug || p.id === slug);
    if (!post) return null;

    // Posts that have markdown files should load content dynamically (only the two active posts)
    const postsWithMarkdown = [
      'subnet-designer-project-start',
      'haiti-security-missions'
    ];

    if (postsWithMarkdown.includes(post.slug)) {
      return {
        ...post,
        loadContent: true // Flag to load content dynamically
      };
    }

    return post;
  }

  // Get post content from markdown file
  async getPostContent(slug) {
    try {
      const post = this.getPostBySlug(slug);
      if (!post) {
        throw new Error('Post not found');
      }
      
      // If the post is coming soon, return a placeholder content
      if (post.comingSoon) {
        return `# ${post.title}

**Coming Soon**

This article is currently being written and will be available soon. Check back later for the full content.`;
      }
      
      const filename = this.slugToFileMap[slug];
      if (!filename) {
        throw new Error(`No file mapping found for slug: ${slug}`);
      }
      
      const response = await fetch(`${process.env.PUBLIC_URL}/content/blog/posts/${filename}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch content: ${response.status}`);
      }
      
      return await response.text();
    } catch (error) {
      console.error('Error loading post content:', error);
      return `# Error Loading Content

Sorry, we couldn't load this blog post. Please try again later.`;
    }
  }

  // Generate placeholder content for posts
  generatePlaceholderContent(post) {
    return `# ${post.title}

${post.description}

## Overview

This is a comprehensive article about ${post.title.toLowerCase()}. The content covers key concepts and practical insights related to ${post.tags.join(', ')}.

## Key Topics

${post.tags.map(tag => `- **${tag}**: Detailed exploration of ${tag.toLowerCase()} concepts and applications`).join('\n')}

## Conclusion

This article provides valuable insights into ${post.category.toLowerCase()} and related technologies, offering both theoretical understanding and practical guidance.

---

*Published on ${new Date(post.date).toLocaleDateString()} by ${post.author}*`;
  }

  // Calculate estimated reading time
  calculateReadingTime(content) {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
  }

  // Get featured posts
  getFeaturedPosts() {
    return this.posts.filter(post => post.featured).slice(0, this.config.blog.featuredPosts);
  }

  // Get posts by category
  getPostsByCategory(category) {
    return this.posts.filter(post => post.category === category);
  }

  // Get posts by tag
  getPostsByTag(tag) {
    return this.posts.filter(post => post.tags.includes(tag));
  }

  // Search posts
  searchPosts(query) {
    const searchTerm = query.toLowerCase();
    return this.posts.filter(post => 
      post.title.toLowerCase().includes(searchTerm) ||
      post.description.toLowerCase().includes(searchTerm) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  // Get all unique tags
  getAllTags() {
    const allTags = this.posts.flatMap(post => post.tags);
    return [...new Set(allTags)];
  }
}

// Export a singleton instance
const blogManager = new BlogManager();
export default blogManager;
