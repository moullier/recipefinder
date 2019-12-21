# Go Go Gadget Recipe Finder

## Purpose of Application

The purpose of our recipe finder is to take a list of ingredients that the user might have at home, and to generate a list of recipes that they can create using some of those ingredients. There is a page that returns recipes for food, as well as a page that allows the user to enter cocktail ingredients that they have on hand and returns a list of potential drinks that they can mix.

## How to Use

  ### Recipe Finder
  The recipe search is on RecipeFinder.html.  To use the page, the user enter ingredients in the text entry field and adds them to the ingredient list, either by pressing Enter or clicking the "Add Ingredient" button.  Once they have finished their list of ingredients, they can click the "Find Some Recipes" button and the program will search for and return up to 10 relevant recipes based on the entered ingredients.  The user can choose to filter their results on whether the recipe is vegan, vegetarian, peanut-free or alcohol-free as well.  If they want to restart their ingredient list, the "Clear Ingredients" button will remove what has been previously entered.
  ### Drink Finder
  The cocktail search works in largely the same way as the recipe search.  It is located on DrinkFinder.html, and again the user adds one or more cocktail ingredients to a list, and then uses that list to search for relevant cocktails.
  
  
## Technologies Used

  ### The Page Structure
  The pages were built in HTML, with CSS styling applied, as well as Javascript/JQuery used to add the functionality and create dynamic parts of the page, such as the search results.  The APIs were queried with AJAX asynchronous requests.
  ### APIs Used
  The project used two APIs.  The first was [Edamam's Recipe Search API](https://developer.edamam.com/edamam-recipe-api), which contains data for over 1.5 millions recipes from over 500 different recipe websites.  This api returns information including ingredients, a thumbnail image and nutrition/dietary data for the recipes.

  The second API that the project used was [TheCocktailDB API](https://www.thecocktaildb.com/api.php), which contains a database of cocktail recipes.  It contains almost 600 drinks that can be searched by ingredient or name.  It returns ingredients, instructions and a thumbnail image.
   
  ### CSS Styling
  The CSS framework used for this project is Materialize.  The project contains components including Collapsibles to display the recipe results, and a Preloader to indicate when the program is waiting for the queried APIs to return results.  Materialize also has a grid function that we used for some of the layout on the pages, as well as responsive columns that allowed the project to display well on mobile and desktop screens.  We chose Materialize as a flexible Bootstrap alternative with a variety of useful components.

## Additional Features Considered

With more time, features that we considered adding include:

 - An expanded recipe box with a "Print" button which will open that recipe in a new tab with little to no formatting, and automatically bring up the print function for the web browser
 - A functionality to save recipes as favorites
 - Inputting amounts on hand for each ingredient
 - Provide a shopping list (a list of the items which you lack for a recipe)
 - Choosing the number of results desired, or perhaps giving the user a "see next 10 recipes" button/funtion at the bottom of the page
 - Possible additional filters for allergens or food ethnicities

## License
[MIT](https://choosealicense.com/licenses/mit/)