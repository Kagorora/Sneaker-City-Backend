# Kiatu Backend

## Description
Sneaker City is a brand new online-only store for sneaker enthusiasts. This isn’t your average e-commerce shop – it’s a curated  experience that shows just the latest in sneaker trends. 

## Design mockup 
[Link](https://www.figma.com/file/eFI2af0WfChnCVpV7Y9hPa/kiatu?node-id=0%3A1)

## Project Stories
[Link](https://www.pivotaltracker.com/n/projects/2503110)

## Technologies used :gear:
- Node JS
- Express
- Heroku
- ESLint
- PivotalTracker
- Github
- Cloudinary

## Setting up the application :wrench:

##### A. Clone the project
1. From your computer, open terminal. 
2. Run `git clone https://github.com/Kagorora/Sneaker-City-Backend.git` to clone the repository the project.

### Run commands
1. Run `npm install` to install all dependencies.
2. Run `npm run dev` to run the app in development environment. 
3. Run `npm run start` to run the app on a production level

### Deployment 🚀
https://kiatu-backend.herokuapp.com/

### End points / API Implemented
1. Add new Shoe. https://kiatu-backend.herokuapp.com/api/sneakers
2. view a list of the latest sneakers. https://kiatu-backend.herokuapp.com/api/sneakers
3. select a sneaker to view size availability.  https://kiatu-backend.herokuapp.com/api/sneakers/:shoeId
4. Add Size and availlable quantity/size. https://kiatu-backend.herokuapp.com/api/sneakers/sizes/:shoeId
5. add a specific shoe and size to my cart. https://kiatu-backend.herokuapp.com/api/orders/:shoeId
6. review my cart and checkout.  https://kiatu-backend.herokuapp.com/api/orders
7. Remove Product on The cart.  https://kiatu-backend.herokuapp.com/api/orders/:orderId
8. Search Shoe by model.  https://kiatu-backend.herokuapp.com/api/orders/:shoeId


# Author
[Maxime Kagorora](https://github.com/Kagorora)
