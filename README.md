# StructSphere

A powerful system modeling application for visualizing and managing complex entity relationships, diagrams, and system architectures. Built with React, TypeScript, and integrated with Google Gemini AI for intelligent assistance.

# Live here:
🚀 **[Live Demo](https://junale.github.io/StructSphere)**

# Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installing](#installing)
  - [Running the project](#running-the-project)
  - [Dev tools](#dev-tools)
- [AI Assistant](#ai-assistant)
- [Contributing](#contributing)
- [Architecture](#architecture)
  - [Folder Structure](#folder-structure)
  - [State Management](#state-management)
  - [Styling](#styling)


# Features

- **Entity Management**: Define and organize entities that represent components in your system
- **Diagram Creation**: Build visual representations of your system architecture
- **Node System**: Create instances of entities within diagrams with hierarchical sub-diagram support
- **Relationship Mapping**: Define and visualize connections between nodes with automatic edge label positioning
- **Force-Directed Layout**: Automatic graph layout with customizable physics parameters
- **AI Assistant**: Chat with an intelligent AI agent powered by Google Gemini that can:
  - Query your entities, diagrams, nodes, and relationships
  - Create and update system components through natural language
  - Provide insights about your system architecture
  - Support function calling with configurable models (Gemini 2.0 Flash, Gemini 1.5 Pro, etc.)
- **Import/Export**: Backup and share your projects as JSON files
- **Persistent Storage**: All data stored locally in your browser with localStorage
- **Customizable Settings**: Configure layout physics, AI behavior, and visualization parameters

# Getting Started

## Prerequisites

- **Bun**: This project uses Bun as a package manager and runtime. Install it from the [official website](https://bun.sh/)
- **Node.js**: Required for development tooling. Install from the [official website](https://nodejs.org/)
- **Gemini API Key** (optional): For AI assistant features, get your free API key from [Google AI Studio](https://aistudio.google.com/apikey)

## Installing

Clone the repository:

```bash
# SSH
git clone git@github.com:yourusername/StructSphere.git

# HTTPS
git clone https://github.com/yourusername/StructSphere.git
```

Navigate to the project directory and install dependencies:

```bash
cd StructSphere
bun install
```

## Running the project

Start the development server:

```bash
bun run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Dev tools

This project uses **Biome** for linting and formatting. Run the linter:

```bash
bun run lint
```

Build for production:

```bash
bun run build
```

Preview production build:

```bash
bun run preview
```

# AI Assistant

StructSphere includes an intelligent AI assistant powered by Google Gemini that can help you work with your system models.

## Setup

1. Get a free API key from [Google AI Studio](https://aistudio.google.com/apikey)
2. Open Settings in StructSphere
3. Enter your API key in the "AI Assistant Settings" section
4. (Optional) Customize the AI model and max iterations

## Capabilities

The AI assistant can:

- **Query Data**: List and search entities, diagrams, nodes, and relationships
- **Create Components**: Add new entities, diagrams, nodes, and relationships through conversation
- **Update Items**: Modify existing system components
- **System Analysis**: Get insights and overviews of your architecture

## Example Queries

- "Show me all entities"
- "Create a new entity called 'User Service' with description 'Handles user authentication'"
- "List all diagrams"
- "What nodes are in the main-diagram?"
- "Create a relationship between node-a and node-b in diagram-1"

# Contributing

Contributions are welcome! Please create an issue on github to discuss your proposed changes.

# Architecture

StructSphere follows a feature-based architecture with clear separation of concerns.

## Folder Structure

```
src/
├── Chat/              # AI assistant 
├── Diagram/           # Diagram 
├── Entity/            # Entity 
├── Node/              # Node instances
├── Relationship/      # Entity 
├── Visualizer/        # Graph 
├── Settings/          # Application 
├── ImportExport/      # Data import/export
├── Shared/            # Shared utilities
etc. 
```

## State Management

StructSphere uses **React Context API** for state management:

- Each feature (Entities, Diagrams, Nodes, etc.) has its own Context Provider
- Data is persisted to `localStorage` automatically
- The `SystemContext` orchestrates all providers
- Settings are globally accessible and control layout physics and AI behavior

## Styling

- **TailwindCSS 4.1**: Utility-first CSS framework for rapid UI development
- **Custom gradients**: Dynamic color schemes for visual hierarchy
- **Responsive design**: Mobile-friendly layouts with `md:` breakpoints
- **Force-directed graphs**: Canvas-based visualization with automatic layout

## Key Technologies

- **React 18.3** + **TypeScript**: Type-safe component development
- **Vite**: Fast build tool and dev server
- **React Router 7**: Client-side routing
- **Google Gemini API**: AI-powered chat assistant with function calling
- **Biome**: Fast linter and formatter (replaces ESLint + Prettier)