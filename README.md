# Conway's Game of Life Nodejs
This is a server-side implementation of [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) using Nodejs and Socket io along with a [React](https://github.com/ryuash/game-of-life-react) frontend. 

Ths [server](https://thawing-river-17731.herokuapp.com/) is currently hosted on heroku.
## Quick start
### Prerequisites
If you haven't already, go ahead and download the lastest LTS version of [node](https://nodejs.org/en/) as npm would be needed to complete the installation.
### Installing
`npm install`
### Starting the dev environment
`npm run dev`
A express development server will be started on `http://localhost:8080/`.
##  Available scripts
In the project directory, you can run:
### `npm start`
Runs the server in production mode pointing to the build in the `dist` folder.
### `npm build`
Builds the server for production to the `dist` folder.
### `npm run dev`
Runs the server in development mode on `http://localhost:8080/`.
### `npm test`
Runs any test in the folder marked as *.spec.ts using mocha.
## Heroku
###  Prerequisites

- Create an account at [Heroku](https://signup.heroku.com/)

- Install the [HerokuCLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)

- In your terminal `heroku login`
###  Deploying

- Make sure your terminal location is the root of your project.

- In you terminal `heroku create` or `heroku create [your-project-name]` .
####  Manual deployment

A remote pointing to your new heroku app has already been setup by `heroku create`. To deploy, simply push a master branch to the heroku remote with `git push heroku master`.
####  Other methods of deployment

Heroku has tons of methods around deployment. If manual deployment does not fit you need please check out their [deployment documentation](https://devcenter.heroku.com/categories/deployment) for CI/CD integrations.

##  Technical choices
I decided to use `Nodejs` and `Socket io` to create a realtime server with a web application structure in mind. Nodejs was used for it's single threaded model with event looping that would allow the server to respond in a non blocking manner. Socket io was used for it's realtime bi-directional communication between the server and the client using the websocket protocol.

##  Tradeoffs and comments
I was not able to set up error handling with sockets due to the time constraint. For better error handling in the future, I would implement a try/catch that would emit an error on catch with a key that would allow the frontend to correctly throw a user friendly error message.

To keep the client board as synchronized as possible with little side effects, a brute forced approached was used to sent board updates to all clients. Everytime an event pertaining to the update of the board was triggered, the board would be recalculated on the server-side and a whole new board would be sent back to the clients. A more optimized approach would be to compare the old board with the new board and send an array of cells that needed to be updated, allowing less data to be sent from the server to the client(s). The frontend would then be able to recalculate the board and trigger rerender.
