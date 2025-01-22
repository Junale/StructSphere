# React Template

This is a template for a React project with a basic setup for a development environment.
It enforce a good practice for a React project by using several tools and libraries.

# Table of Contents

- [React Template](#react-template)
- [Table of Contents](#table-of-contents)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installing](#installing)
  - [Running the project](#running-the-project)
  - [Dev tools](#dev-tools)
- [Contributing](#contributing)
- [Architecture](#architecture)
  - [Folder Structure](#folder-structure)
  - [Components](#components) 
    - [UI](#ui)
      - [Styling](#styling)
    - [Logic](#logic)
- [Tests](#running-the-tests)
- [CI/CD](#CI/CD)
- [License](#license)

# Getting Started
To get started with this project, you need to follow the steps below.

## Prerequisites
This react project uses bun as a package manager and vite as a build tool. You need to have bun installed on your machine. You can install it by following the instructions on the [official website](https://bun.sh/). 
You also need to have node.js installed on your machine. You can install it by following the instructions on the [official website](https://nodejs.org/).

## Installing
First you need to clone the repository on your machine. You can do this by running the following command in your terminal:

ssh:
```bash
git clone git@github.com:Junale/react-template.git
```

https:
```bash
git clone https://github.com/Junale/react-template.git
```

Then you need to install the dependencies by running the following command in the root of the project:

```bash
bun install
```

## Running the project
To run the project, you need to run the following command in the root of the project:

```bash
bun run dev
```

## Dev tools
This project uses ESLint and Prettier for linting and formatting the code. You can run the following command in the root of the project to lint and format the code:

```bash
bun run lint
```

Using vscode, you can install the ESLint and Prettier extensions to lint and format the code automatically.

# Contributing
If you want to contribute to this project, you can follow the steps below:

1. Create an issue on the repository to discuss/describe the changes you want to make.

2. Create a new branch following the pattern `feat/<issue-number>/<short-description>` for new features or `fix/<issue-number>/<short-description>` for bug fixes.

3. Make the changes you want to make.

4. Create a pull request to the `main` branch.

5. Wait for the review of the pull request.

6. After the review, the pull request will be merged.

# Architecture
This project uses a simple architecture to uptimize for easy testing and maintenance. The architecture is described below.

## Folder Structure
The project is divided into several folders. Each folder has a specific purpose. The folders are described below:

-  **.github/**: Contains GitHub-specific configurations, including workflows for CI/CD.
- **.storybook/**: Configuration files for Storybook, a tool for developing UI components in isolation.
- **public/**: Static assets that are served directly, such as images and HTML files.
- **src/**: The main source code of the project, including components, logic, and styles.
  - **logic/**: Contains business logic, types and higher-order components.
  - **ui/**: UI components.
- **test/**: Contains test files and stories for components.

## Components
The components are divided into two categories: UI and Logic.
This makes it easier to test the components and to maintain the project.
This will allow you to test the logic of the components without having to test the UI and vice versa.

### UI
The UI components are the components that are responsible for the visual representation of the application. These components should not contain any logic. They should only receive props and render the UI based on these props.

#### Styling
The UI components uses TailwindCSS for styling. TailwindCSS is a utility-first CSS framework that allows you to build custom designs without having to write custom CSS. You can find more information about TailwindCSS on the [official website](https://tailwindcss.com/).

### Logic
The logic components are the components that are responsible for the business logic of the application. These components should not contain any UI. They should only contain the logic of the application. 
They consists of Higher-Order Components (HOC) which are functions that take a component and return a new component with additional logic.
You can find more information about HOC on the [official React documentation](https://reactjs.org/docs/higher-order-components.html).


# Tests
This project uses Storybook for testing the components. Storybook is a tool for developing UI components in isolation. It allows you to develop components without having to run the entire application. You can find more information about Storybook on the [official website](https://storybook.js.org/).

This tool can be run in two ways:

1. **Development mode**: This mode allows you to develop the components in isolation. You can run this mode by running the following command in the root of the project:

```bash
bun run storybook
```

2. **Automated tests**: This mode allows you to run automated tests for the components. You can run this mode by running the following command in the root of the project:

```bash
bun run test-storybook
```

# CI/CD
This project uses GitHub Actions for CI/CD. GitHub Actions is a tool that allows you to automate tasks in your GitHub repository. You can find more information about GitHub Actions on the [official website](https://docs.github.com/en/actions).

The project has workflows for testing that are triggered when a pull request is created or when a push is made to the `main` branch. The workflows are defined in the `.github/workflows` folder.

# License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.