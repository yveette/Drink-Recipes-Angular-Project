# Drink-Recipes-Angular-Project
This app was created for my project defence @ SoftUni for my Angular course.

The project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.7.

Angular web application for reading and creating recipes, also like and comment on them.

## Built with:

### Frontend:

- Angular 13.2.7
- Angular Material
- Angular animations
- NgRx / store
- NgRx / effects
- Bootstrap
- HTML
- CSS
- SCSS
- Font Awesome 5

### Backend & Database:

- MongoDB
- Mongoose
- Node.JS
- Express

## Permissions:

| **Permissions for recipes**    | User | Guest | 
| :--------------------------    | :---: | :---: |
| View Home page                 | ✅   | ✅   |
| View About page                | ✅   | ✅   |
| See All Recipes                | ✅   | ✅   |
| See Recipe Details Page        | ✅   | ✅   |
| Search for Recipe              | ✅   | ✅   |
| Create new Recipe              | ✅   | ❌   |
| Edit recipe * owner            | ✅   | ❌   |
| Delete recipe * owner          | ✅   | ❌   |
| See likes of a Recipe          | ✅   | ✅   |
| Like a Recipe                  | ✅   | ❌   |
| Dislike a Recipe * if liked    | ✅   | ❌   |
| See all Comments               | ✅   | ✅   |
| See all Comments likes         | ✅   | ✅   |
| Create a Comment               | ✅   | ❌   |
| Like a Comment                 | ✅   | ❌   |
| Dislike a Comment * if liked   | ✅   | ❌   |
| Login                          | ❌   | ✅   |
| Register                       | ❌   | ✅   |
| Logout                         | ✅   | ❌   |
| Profile                        | ✅   | ❌   |
| Edit Profile                   | ✅   | ❌   |

## Drink Recipes

Angular web application for posting recipes, making comments and learning new recipes. You can give likes to recipes and comments to other people. Don't miss the opportunity to have the most liked or commented recipe. This is my exam project for the SoftUni Angular course.

## Start the app

To start the application install all dependecies for the client and the rest-api with `npm install`. 

Start the rest-api with `npm start`.

Then start the client with `ng serve`. 

This will navigate to `http://localhost:4200/` in the browser.