#!/bin/bash

# Docker Development Environment Setup Script for React Portfolio
# This script provides easy commands to manage your containerized development environment

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker first."
        exit 1
    fi
    print_success "Docker is running"
}

# Function to build the development image
build_dev() {
    print_status "Building development Docker image..."
    docker-compose build dev
    print_success "Development image built successfully"
}

# Function to start the development environment
start_dev() {
    print_status "Starting development environment..."
    docker-compose up dev
}

# Function to start in detached mode
start_dev_detached() {
    print_status "Starting development environment in detached mode..."
    docker-compose up -d dev
    print_success "Development environment started in background"
    print_status "Frontend: http://localhost:3000"
    print_status "API: http://localhost:5000"
}

# Function to stop all services
stop_dev() {
    print_status "Stopping development environment..."
    docker-compose down
    print_success "Development environment stopped"
}

# Function to restart services
restart_dev() {
    print_status "Restarting development environment..."
    docker-compose restart dev
    print_success "Development environment restarted"
}

# Function to view logs
logs_dev() {
    print_status "Showing development logs..."
    docker-compose logs -f dev
}

# Function to clean up
cleanup() {
    print_status "Cleaning up Docker containers, images, and volumes..."
    docker-compose down -v --rmi all --remove-orphans
    print_success "Cleanup completed"
}

# Function to show status
status() {
    print_status "Development environment status:"
    docker-compose ps
}

# Function to shell into container
shell() {
    print_status "Opening shell in development container..."
    docker-compose exec dev sh
}

# Function to show help
show_help() {
    echo "React Portfolio Docker Development Environment"
    echo ""
    echo "Usage: $0 [command]"
    echo ""
    echo "Commands:"
    echo "  build           Build the development Docker image"
    echo "  start           Start development environment (foreground)"
    echo "  start-bg        Start development environment (background/detached)"
    echo "  stop            Stop development environment"
    echo "  restart         Restart development environment"
    echo "  logs            Show and follow logs"
    echo "  status          Show status of containers"
    echo "  shell           Open shell in development container"
    echo "  cleanup         Stop and remove all containers, images, and volumes"
    echo "  help            Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 build         # Build the development image"
    echo "  $0 start-bg      # Start in background"
    echo "  $0 logs          # View logs"
    echo "  $0 stop          # Stop everything"
}

# Main script logic
main() {
    case "${1:-help}" in
        "build")
            check_docker
            build_dev
            ;;
        "start")
            check_docker
            start_dev
            ;;
        "start-bg"|"start-detached")
            check_docker
            start_dev_detached
            ;;
        "stop")
            check_docker
            stop_dev
            ;;
        "restart")
            check_docker
            restart_dev
            ;;
        "logs")
            check_docker
            logs_dev
            ;;
        "status")
            check_docker
            status
            ;;
        "shell")
            check_docker
            shell
            ;;
        "cleanup")
            check_docker
            cleanup
            ;;
        "help"|"--help"|"-h")
            show_help
            ;;
        *)
            print_error "Unknown command: $1"
            show_help
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@"