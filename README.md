PROJECT NAME: FoodieFinds

Description

Duration: 2 Week Sprint

Directly above this is how long it took you to develop the project. Your project description goes here. What problem did you solve? How did you solve it?

This project serves a few purposes.
x Aids the user narrow their choices in making restaurant picks
x Tracks users' favorite restaurants
x Tracks users' wishlist restaurants (called Drool List in App) 

To see the fully functional site, please visit: TBD

Screenshots

'/images/HomePage.png' - HomePage
'/images/Favorites.png' - Favorites
'/images/Wishlist.png' - Wishlist(Drool List)

Prerequisites

NPM
Node.js v18
React v17 - MarkerF in Map.jsx only works for newer React versions

Installation

Retrieve Google API key
  Set up google cloud account to get API key
  Note: Google no longer provides free API services - Must provide billing information
  Enable API services for Geocoding, Places, JS Map
Create .env file
Call the google API Key REACT_APP_MAPS_API_KEY and set its value in parenthesis
Create SERVER_SESSION_SECRET, set its value to w/ever is your choosing

Create Database - instructions in database.sql file
The queries in the tables.sql file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on Postgres, so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries.

Open up your editor of choice and run an npm install
Run npm run server in your terminal
Run npm run client in your terminal
The npm run client command will open up a new browser tab for you!

Usage
x Upon opening of app, you will be met with the homepage
x Input an address to receive a list of restaurants nearby when clicking 'search nearby'
    List is limited to a radius around address which can be changed in the GoogleAPI GET Places Request
x Buttons to add to favorites add those restaurants to those lists
x Navigate to Favorites to see the current list along with corresponding restaurant markers on the JS GoogleMap
x Navigate to Drool List to see the current list

Built With

PERN Stack
GoogleAPIs
MUI

Acknowledgement

Thanks to Prime Digital Academy who equipped and helped me to make this application a reality.

Support

If you have suggestions or issues, please email me at diegob12@live.com
