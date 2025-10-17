# Hanzi Trainer

Hanzi Training is a web application designed to help users learn and practice Chinese characters (Hanzi) through interactive exercises, quizzes, and handwriting recognition. The app provides a variety of training sets, dictionary lookup, and stroke order practice to support learners at all levels.

## Features

- **Interactive Training**: Practice writing Hanzi with real-time feedback and stroke order recognition.
- **Dictionary Lookup**: Search for Chinese characters and view their meanings, pronunciations, and example words.
- **Custom Training Sets**: Use built-in or custom sets to focus on specific characters or vocabulary.
- **Quiz Mode**: Test your knowledge with quizzes and track your progress.
- **Handwriting Recognition**: Draw characters on a canvas and get instant feedback.
- **Settings**: Customize your learning experience with various configuration options.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
  ```sh
  git clone https://github.com/simonkoennecke/hanzi-trainer.git
  cd hanzi-trainer
  ```
2. Install dependencies:
  ```sh
  npm install
  # or
  yarn install
  ```

### Running the App

Start the development server:
```sh
npm run dev
# or
yarn dev
```

Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

### Building for Production

To build the app for production:
```sh
npm run build
# or
yarn build
```

The output will be in the `dist/` directory.

### Linting

To check for linting errors:
```sh
npm run lint
# or
yarn lint
```

## Project Structure

- `src/` - Main source code
  - `Page/` - Application pages (Dictionary, Training, Settings, etc.)
  - `Geometry/` - Geometry and handwriting recognition utilities
  - `Context/` - React context providers and configuration
  - `assets/` - Static assets
- `public/` - Static files and data (character sets, manifest, etc.)
- `script/` - Utility scripts for data processing to create the FUSE index

## Data Files

- `public/characters.json` - List of Chinese characters
- `public/default-training-sets.json` - Predefined training sets
- `public/fuse-index.json` - Search index for fast dictionary lookup

## Contributing

Contributions are welcome! Please open issues or submit pull requests for bug fixes, new features, or improvements.

## License

This project is licensed under the MIT License.
