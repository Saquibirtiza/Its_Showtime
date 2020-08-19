## Its Showtime

### Description:

Its Showtime is a web application made with the intention to help its users look for their next movie and also to keep track of their watch history. The app is optimized for desktop but is also responsive for mobile devices. To try the demo go to this link:<br />
https://its-showtime-c39f8.web.app/

### Frameworks and API:

ReactJs was used to build the frontend of the aplication whereas for the database, authentication and hosting, Firebase was the medium of choice. All the information in the website was fetched from the [TMDB](https://developers.themoviedb.org/3/getting-started/introduction) api.

## Key Components:

### Welcome Page:

The Welcome page makes use of sliders to display movies that are trending and also the movies are yet to be released. Users can choose from these movies and see details about it such as rating, genre, runtime etc. The cast of the movie is also available in a separate tab along with a tab showing suggestions similar to the movie currently selected. If the user is logged in, they can add these movies to their watchlist and it will be added to their dashboard. They can also mark the movie as watched to keep track of their watch history.<br />
![Welcome Page demo](demo/gig.gif)

### Search and Signin/Signup:

Users can maintain their own profile using this application by signing in. They can also search for their favorite movies using the searchbar that dynamically shows suggestions as the user types. Firebase authentication helps to verify the email and passowrd during signin or signup process and shows error message if it fails to authenticate.<br />
![Signin demo](demo/signup.gif)

### Dashboard:

Every user has a separate dashboard that shows information about their watchlist. The stats at the top of the page show:

- Name and release date of the next unreleased movie in the list (if any)
- Total hours spent watching movies (even if it is not in the watchlist currently)
- Total number of movies watched till date

Following these information, the dashboard also shows the movies that the user has added to his/her list but has not yet watched. A separate list also keeps track of the user's watched movies that he/she has yet to remove. <br/>
![Dashboard demo](demo/dashboard.gif)
