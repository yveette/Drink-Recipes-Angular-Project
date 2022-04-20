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

## Application Pages

### Home Page (logged out user)

Invites the user to log in to their account or to register. Shows information about most liked recipe and most commented recipe.

![Home Page View](https://github.com/yveette/Drink-Recipes-Angular-Project/blob/main/readme_files/home_page.png)

### Home Page (logged in user)

Navigation have changed.

![Home Page View](https://github.com/yveette/Drink-Recipes-Angular-Project/blob/main/readme_files/home_page_1.png)

### Register Page (logged out user)

Register a user inside the database with **username**, **email** and **password**. Password inside the database is **hashed** (with bcrypt) and both passwords must match!

After successful registration redirects to the **Home page**, with an already logged-in user.

![Registration Page View](https://github.com/yveette/Drink-Recipes-Angular-Project/blob/main/readme_files/registration_page.png)

### Login Page (logged out user)

Logging an already registered user with the correct **email** and **password**.

After successful login redirects to the **Home page**, with an already logged-in user.

![Login Page View](https://github.com/yveette/Drink-Recipes-Angular-Project/blob/main/readme_files/login_page.png)

### Logout Page (logged in user)

The logout action is available to logged-in users. Upon success, clear any session information and redirect the user to the **Home page**.

### All recipes (for user)

There is a search field for recipes by their name.

List of all recipes. Each recipe shows information about the recipe name, author and count of likes and comments. There is a [Detail] button which leads to details page of the chosen recipe.

![Recipes Page View](https://github.com/yveette/Drink-Recipes-Angular-Project/blob/main/readme_files/all_user.png)

Each recipe have flip design like below:

![Recipes Page View](https://github.com/yveette/Drink-Recipes-Angular-Project/blob/main/readme_files/all_detail.png)


### All recipes (for guest)

There is a welcome component that reminds the guest to log in or register.

![Recipes Page View](https://github.com/yveette/Drink-Recipes-Angular-Project/blob/main/readme_files/all_guest.png)


### Details Page - (for logged in users and logged out users)

All users should be able to view details about the recipe. Clicking the Details button in a recipe card should display the Details page.

If the currently logged-in user is the author of the post, the **Edit** and **Delete** buttons should be displayed, otherwise they should not be available.

If logged-in user isn't the author of the recipe, he can make a like and dislike of the recipe. Also all logged-in users can create comments and make like and dislikes of them.

Information about the recipe:

- Recipe name
- Recipe created date
- Recipe description
- Recipe author
- Recipe ingredients
- Recipe comments

<details>
    <summary>Details Page (logged out users)</summary>
If there are no logged-in users, no buttons should be displayed. User can see only count of likes, also comments and their count of likes.

![Details Page View](https://github.com/yveette/Drink-Recipes-Angular-Project/blob/main/readme_files/details_1.png)
</details>

<details>
    <summary>Details Page (logged in users who didn't like)</summary>
If the user is not owner of the recipe can give a like, same with the comments.

![Details Page View](https://github.com/yveette/Drink-Recipes-Angular-Project/blob/main/readme_files/details_2.png)
</details>

<details>
    <summary>Details Page (logged in users who liked)</summary>
Notify the user that already liked the recipe or the comment.

![Details Page View](https://github.com/yveette/Drink-Recipes-Angular-Project/blob/main/readme_files/details_3.png)
</details>

<details>
    <summary>Details Page (logged in users who is the author)</summary>
User see Edit and Delete button for the current recipe.

![Details Page View](https://github.com/yveette/Drink-Recipes-Angular-Project/blob/main/readme_files/details_4.png)
</details>

### Create Recipe Page (logged in user)

The Create page is available to logged-in users. It contains a form for adding new recipe.

Upon success, redirect the user to the All Recipes page.

![Create Page View](https://github.com/yveette/Drink-Recipes-Angular-Project/blob/main/readme_files/create_page.png)

### Delete Recipe (logged in user and creator of the current recipe)

Every author should be able to click over the [**Delete**] button - deleting the current recipe from the database and the user should be redirected to the All Recipes page.

### Edit Recipe (logged in user and creator of the current recipe)

The Edit page is available to logged-in users and it allows authors to edit their recipes. Clicking the [**Edit**] button of a particular recipe on the **Details page** should display the **Edit page**, with all fields filled with the data for the recipe. It contains a form with input fields for all relevant properties. Upon success, redirect the user to the Details page for the current recipe.

![Edit Page View](https://github.com/yveette/Drink-Recipes-Angular-Project/blob/main/readme_files/edit_page.png)

### Profile Page (logged in user)

Logged-in users can see their profile page which shows information about their recipes and liked recipes. 

![Profile Page View](https://github.com/yveette/Drink-Recipes-Angular-Project/blob/main/readme_files/profile_page_1.png)

Users can edit their profile information.

![Profile Page View](https://github.com/yveette/Drink-Recipes-Angular-Project/blob/main/readme_files/profile_page_2.png)

### 404 Page Not Found

If Guests (not logged in) trying to access а page that it should not be able to, you must redirect them to the Login page.

If Users (logged in) trying to access а page that it should not be able to, you must redirect them to the Home page.

Use the following view for invalid paths:

![Not Found Page View](https://github.com/yveette/Drink-Recipes-Angular-Project/blob/main/readme_files/not_found.png)

## Validation and Error Handling

The application should notify the users about the result of their actions.

In case of error, you should display div with class "error-message".

The user sees the last error, which disappears after 5 seconds.

### Login / Register

- The **Username** is required and should be at least 5 characters long.
- The **email** is required and should be valid: "peter@gmail.com"
- The password is required and should be at least 5 characters long.
- The repeat password should be equal to the password.

![Register Validate Page View](https://github.com/yveette/Drink-Recipes-Angular-Project/blob/main/readme_files/valid_1.png)

### Recipe

- The **Recipe name** is required and should be at least 3 characters long.
- The **Image link** is required and should be valid.
- The **Description** is required and should be at least 10 characters long.
- The **Ingredients** are required and should complete custom validation - "Write ingredients separated with comma and new line!" and "Ingredients must be at least two!"

![Create Recipe Page View](https://github.com/yveette/Drink-Recipes-Angular-Project/blob/main/readme_files/valid_2.png)