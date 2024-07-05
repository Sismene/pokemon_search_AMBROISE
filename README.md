# Pokémon Search App
**by Théo AMBROISE**


A web application built with Vue.js, TypeScript, and Tailwind CSS that allows users to search for Pokémon and view detailed information.

## Features

- Search for Pokémon by name
- View detailed information about each Pokémon, including its type, abilities, stats, and moves
- Responsive design with a clean and modern UI

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/download/) (version 12 or higher)
- [npm](https://www.npmjs.com/get-npm) (version 6 or higher)

## Getting Started

Follow these steps to get the project up and running on your local machine:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/pokemon-search-app.git
    cd pokemon-search-app
    ```

2. **Install the dependencies:**

    ```bash
    npm install
    ```

3. **Run the development server:**

    ```bash
    npm run serve
    ```

   The application will be available at `http://localhost:8080`.

## Project Structure

- `src/`: Contains the source code of the application
    - `assets/`: Contains static assets like images and JSON files
    - `components/`: Contains Vue components
    - `views/`: Contains view components (if applicable)
    - `App.vue`: The root component
    - `main.ts`: The entry point of the application
    - `router/index.ts`: The router configuration
- `public/`: Contains public assets and the `index.html` file

## How It Works

### Search Functionality

The `SearchBar` component allows users to input a Pokémon name. As the user types, the query is updated and passed to the `SearchAndDetail` component.

### Displaying Search Results

The `PokemonList` component displays a list of Pokémon that match the search query. When a user selects a Pokémon from the list, the `selectedPokemonName` is updated.

### Displaying Pokémon Details

The `PokemonDetail` component fetches and displays detailed information about the selected Pokémon, including its type, abilities, stats, and moves.

### Styling

The application uses Tailwind CSS for styling. The background color of the page is a subtle gray to differentiate it from the detail sections, which have a white background.