# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2025-08-08] - Blog System Refactor

### Added
- New blog management system with centralized blog data configuration
- BlogManager class for dynamic markdown content loading
- Coming soon functionality for blog posts
- Student project blog category filtering
- Enhanced blog post card component with conditional rendering

### Changed
- Migrated blog posts from JSON configuration to centralized blogData.js
- Updated blog post dates to 2025-08-08
- Modified blog display to show only student projects and D Central "coming soon" posts
- Improved blog post card styling and interaction handling
- Enhanced markdown content with tables, visuals, and better formatting

### Removed
- Legacy blog configuration files
- Unused blog post assets and images
- Multiple blog post entries, keeping only subnet designer and Haiti security posts

### Fixed
- Blog post loading and routing issues
- Missing default export in BlogManager
- Markdown content rendering for blog posts

### Technical
- Refactored blog architecture for better maintainability
- Implemented dynamic markdown loading from public content directory
- Added support for "coming soon" blog posts with placeholder content
- Updated component structure for better separation of concerns
