PROJECT NAME: FoodieFinds

Description

Duration: 2 Week Sprint

This project serves a few purposes.
[x] Aids the user narrow their choices in making restaurant picks
[x] Tracks users' favorite restaurants
[x] Tracks users' wishlist restaurants (called Drool List in App) 

To see the fully functional site, please visit: https://foodie-finds.herokuapp.com/#/home

Screenshots

'/images/HomePage.png' - HomePage
'/images/Favorites.png' - Favorites
'/images/Wishlist.png' - Wishlist(Drool List)

Prerequisites

NPM
Node.js v18
React v17 - MarkerF in Map.jsx only works for newer React versions

Installation

[x]Retrieve Google API key
  [x]Set up google cloud account to get API key
  [x]Note: Google no longer provides free API services - Must provide billing information
  [x]Enable API services for Geocoding, Places, JS Map
[x]Create .env file
[x]Call the google API Key REACT_APP_MAPS_API_KEY and set its value in parenthesis
[x]Create SERVER_SESSION_SECRET, set its value to w/ever is your choosing

Create Database - instructions in database.sql file
[x] The queries in the tables.sql file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on Postgres, so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries.

Open up your editor of choice and run an npm install
Run npm run server in your terminal
Run npm run client in your terminal
The npm run client command will open up a new browser tab for you!

Usage
[x] Upon opening of app, you will be met with the homepage
[x] Input an address to receive a list of restaurants nearby when clicking 'search nearby'
   [x] List is limited to a radius around address which can be changed in the GoogleAPI GET Places Request
[x] Buttons to add to favorites add those restaurants to those lists
[x] Navigate to Favorites to see the current list along with corresponding restaurant markers on the JS GoogleMap
[x] Navigate to Drool List to see the current list

Built With

PERN Stack,
GoogleAPIs,
MUI

Acknowledgement

Thanks to Prime Digital Academy who equipped and helped me to make this application a reality.

Support

If you have suggestions or issues, please email me at diegob12@live.com
