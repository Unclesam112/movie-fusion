# Movie-Fusion

This template should help get you started developing with Vue 3 in Vite.


## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

# MovieFusion - Vue3 Movie Web App

![MovieHub Logo](link_to_logo_image)

MovieFusion is a Vue3-based web application that allows users to explore and discover movies, view trending films, access movie details, and create personalized collections. The app utilizes Vue3 for the front-end framework, Vuex for state management, Firebase for user authentication and user data storage, and TMDB API for fetching movie and cast details.

## Features

- **User Authentication**: Secure user authentication through Firebase, allowing users to sign up, log in, and securely store their details.

- **Trending Movies**: Get a glimpse of the latest and most popular movies directly on the homepage.

- **Genre-Based Filtering**: Browse movies based on genres of interest, providing a personalized movie discovery experience.

- **Detailed Movie Information**: Access comprehensive details about each movie, including cast information, release date, and more.

- **Cast Details**: Explore details about the cast of a movie, including their biographies and filmography.

- **Collections**: Users can create personalized collections to categorize and save movies based on their preferences.

- **Vue Toastify for Messages**: Utilize Vue Toastify to display success and error messages in a visually appealing and user-friendly way.

## Tech Stack

- **Vue3**: Front-end framework for building user interfaces.

- **Vuex**: State management library to manage application state in a centralized manner.

- **Firebase**: Backend-as-a-Service for user authentication and data storage.

- **TMDB API**: The Movie Database API to fetch movie and cast details.

- **Vue Toastify**: Vue3-based library for displaying toast notifications.

## Getting Started

### Prerequisites

- Node.js
- Vue CLI

### Installation

1. Clone the repository: `git clone https://github.com/iamunclesam/movie-fusion.git`
2. Navigate to the project directory: `cd movie-fusion`
3. Install dependencies: `npm install`
4. Create a Firebase project and configure your Firebase credentials.
5. Set up the TMDB API key by registering on the TMDB website.
6. Create a `.env` file in the project root and add your Firebase and TMDB API credentials.

```env
VUE_APP_FIREBASE_API_KEY=your-firebase-api-key
VUE_APP_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
VUE_APP_FIREBASE_PROJECT_ID=your-firebase-project-id
VUE_APP_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
VUE_APP_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
VUE_APP_FIREBASE_APP_ID=your-firebase-app-id
VUE_APP_TMDB_API_KEY=your-tmdb-api-key
```

7. Run the app: `npm run dev`


## Deployment

You can deploy the MovieFusion app to various hosting platforms. Here are steps to deploy it to [Netlify](https://www.netlify.com/) as an example:

1. Create an account on Netlify if you don't have one.
2. Connect your GitHub repository to Netlify.
3. Configure the build settings, specifying the build command as `npm run build` and the publish directory as `dist`.
4. Set up environment variables for Firebase and TMDB API keys in the Netlify dashboard.

Once configured, Netlify will automatically build and deploy your MovieHub app whenever changes are pushed to the connected GitHub repository.

## Project Structure

- `src/`: Contains the source code of the Vue3 app.
  - `assets/`: Store static assets like images and icons.
  - `components/`: Reusable Vue components used throughout the app.
  - `router/`: Vue Router configuration.
  - `store/`: Vuex store modules for state management.
  - `views/`: Components representing different views/pages of the app.
  - `services/`: Services for interacting with external APIs (e.g., TMDB API).
- `public/`: Public files, including the `index.html` file.
- `firebase/`: Firebase configuration files.

## Acknowledgments

- Thanks to [Vue.js](https://vuejs.org/) for providing a powerful and flexible front-end framework.
- Appreciation to [TMDB](https://www.themoviedb.org/) for offering an extensive movie database through their API.
- Special thanks to the Vue community and the contributors of various Vue plugins and libraries.

## Future Enhancements

- Implement user reviews and ratings for movies.
- Enhance the user interface for creating and managing collections.
- Add more personalized recommendations based on user preferences.
- Integrate social media sharing features for movie recommendations.




## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.
Feel free to contribute and make MovieFusion even better!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or support, please contact [adeyemis958@gmail.com](mailto:adeyemis958@gmail.com).

Happy movie exploring! 🎬✨
