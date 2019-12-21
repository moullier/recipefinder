let foodIngredientList = [];

let filterToggle = false;

$("#recipes").hide();
$("#filterDiv").hide();
$("#spinnerDiv").hide();

// add ingredients to the list
$("#addIngredientButton").on("click", function() {
  addIngredient();
});

function addIngredient() {
  let newIngredient = $("#foodInputBox").val().trim();
  $("#foodInputBox").val("");
  console.log("new Ingredient = " + newIngredient);

  foodIngredientList.push(newIngredient);

  $("#ingList").empty();
  //create and display new ingredient on web page
    for(let i = 0; i < foodIngredientList.length; i++) {
      let newItem = $("<li>");
      newItem.text(foodIngredientList[i]);
      $("#ingList").append($(newItem));
    }
}

$("#clearIngredientsButton").on("click", function() {
  foodIngredientList = [];
  $("#ingList").empty();
});


$("#showFilterText").on("click", function() {

  if(filterToggle == false) {
    $("#filterDiv").show();
    filterToggle = true;
    $("#showFilterText").text("Hide Filters");
  } else {
    $("#filterDiv").hide();
    filterToggle = false;
    $("#showFilterText").text("Show Filters");
  }
});

// builds the search string and queries the recipe API, displays results
$("#foodSearchButton").on("click", function() {


  $("#spinnerDiv").show();

    // let input = $("#foodInputBox").val();
  let input = "";

  for(let i = 0; i < foodIngredientList.length; i++) {
    input = input + " " + foodIngredientList[i];
  }
  input = input.trim();

  console.log("input = " + input);

  if(input != "") {
  

    $("#recipes").empty();

    var queryURL = "https://api.edamam.com/search?q=" + input + "&app_id=71e0d17f&app_key=a0c9342317580b0fbf06152010ee5e86";
    
    // adding the optional search filters to the query
    if($('#veganCheckbox').is(":checked")) {
      console.log("adding vegan to query");
      queryURL = queryURL + "&health=vegan";
    }
    if($('#vegetarianCheckbox').is(":checked")) {
      console.log("adding vegetarian to query");
      queryURL = queryURL + "&health=vegetarian";
    }
    if($('#peanutfreeCheckbox').is(":checked")) {
      console.log("adding peanut free to query");
      queryURL = queryURL + "&health=peanut-free";
    }
    if($('#alcoholfreeCheckbox').is(":checked")) {
      console.log("adding alcohol free to query");
      queryURL = queryURL + "&health=alcohol-free";
    }    


    
    console.log("queryURL = " + queryURL);



    // Performing our AJAX GET request
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    // After the data comes back from the API
    .then(function(response) {
      
      $("#spinnerDiv").hide();
      
      console.log(response);
      let numOfRecipes = response.hits.length;

      if(numOfRecipes == 0) {
        $("#recipes").empty();
        $("#recipes").text("No results found, please search again");
      } else {

        $("#recipes").show();

        let recipeResultList = $("<ul>");
        recipeResultList.addClass("collapsible popout");
        recipeResultList.attr("data-collapsible", "accordion");

        for(let i = 0; i < numOfRecipes; i++) {

          // create ID strings
          let headerID = "#recipeHeader" + i;
          let recipeBodyID = "#recipe_" + i;

          // create new list element
          let newListElement = $("<li>");
          let newHeaderDiv = $("<div>");
          newHeaderDiv.addClass("collapsible-header");
          newHeaderDiv.attr("id", headerID);
          let newBodyDiv = $("<div>");
          newBodyDiv.addClass("collapsible-body");
          newBodyDiv.attr("id", recipeBodyID);

          // setup the inside of the body div in 3 columns
          let newRow = $("<div>");
          newRow.addClass("row");
          let newCol1 = $("<div>");
          let newCol2 = $("<div>");
          let newCol3 = $("<div>");
          newCol1.addClass("col s12 m4");
          newCol2.addClass("col s12 m4 center");
          newCol3.addClass("col s12 m4");
          newRow.append(newCol1);
          newRow.append(newCol2);
          newRow.append(newCol3);




          // append new collapsible
          newListElement.append(newHeaderDiv);
          newListElement.append(newBodyDiv);
          recipeResultList.append(newListElement);

          console.log("headerID = " + headerID);
          console.log("label = " + response.hits[i].recipe.label);

          $(newHeaderDiv).text(response.hits[i].recipe.label);

          $(newBodyDiv).empty();

          let recipeURL = $("<div>");
          let recipeLink = $("<a>");
          recipeLink.attr("href", response.hits[i].recipe.url);
          recipeLink.attr("target", "_blank");
          recipeLink.text(response.hits[i].recipe.url);
          $(recipeURL).append(recipeLink);

          let recipeThumbnail = $("<img>");
          recipeThumbnail.attr("src", response.hits[i].recipe.image);
          recipeThumbnail.attr("alt", "Picture of " + response.hits[i].recipe.label);
          recipeThumbnail.addClass("responsive-img");
          //$(recipeThumbnail).width(175);
          


          let ingred = $("<ul>");
          let recipeIngList = response.hits[i].recipe.ingredients;
          console.log(recipeIngList);

          // create ingredient list
          for(let j = 0; j < recipeIngList.length; j++) {
            let newEl = $("<li>");
            newEl.text(recipeIngList[j].text);
            ingred.append(newEl);

          }

          let newSpan = $("<span>");
          newSpan.text("Ingredients");
          newSpan.css("font-weight","bold");

          $(newCol1).append(newSpan);
          $(newCol1).append(ingred);


          $(newCol1).append(recipeURL);
          $(newCol2).append(recipeThumbnail);



          // get and display nutrition info
          let totalCalories = Math. round(response.hits[i].recipe.calories);
          let servings = response.hits[i].recipe.yield;
          let calDiv = $("<div>");
          let servingsDiv = $("<div>");
          let calsPerServing = $("<div>");
          calDiv.text("Total Calories: " + totalCalories);
          servingsDiv.text("# of Servings: " + servings);
          calsPerServing.text(Math.round(totalCalories / servings) + " calories per serving");

          let fatQuantity = response.hits[i].recipe.totalNutrients.FAT.quantity;
          fatQuantity = fatQuantity.toFixed(1);
          fatQuantity = fatQuantity + response.hits[i].recipe.totalNutrients.FAT.unit;
          let fatDiv = $("<div>");
          fatDiv.text("Total fat: " + fatQuantity);
          let fatPerServing = $("<div>");
          fatPerServing.text(Math.round(response.hits[i].recipe.totalNutrients.FAT.quantity / servings) + response.hits[i].recipe.totalNutrients.FAT.unit + " fat per serving");

          let proteinQuantity = response.hits[i].recipe.totalNutrients.PROCNT.quantity;
          proteinQuantity = proteinQuantity.toFixed(1);
          proteinQuantity = proteinQuantity + response.hits[i].recipe.totalNutrients.PROCNT.unit;
          let proteinDiv = $("<div>");
          proteinDiv.text("Total protein: " + proteinQuantity);
          let proteinPerServing = $("<div>");
          proteinPerServing.text(Math.round(response.hits[i].recipe.totalNutrients.PROCNT.quantity / servings) + response.hits[i].recipe.totalNutrients.PROCNT.unit + " protein per serving");

          let ingredSpan = $("<span>");
          ingredSpan.text("Nutrition Information");
          ingredSpan.css("font-weight","bold");

          $(newCol3).append(ingredSpan);
          $(newCol3).append(calDiv);
          $(newCol3).append(servingsDiv);
          $(newCol3).append(calsPerServing);
          $(newCol3).append(fatDiv);
          $(newCol3).append(fatPerServing);
          $(newCol3).append(proteinDiv);
          $(newCol3).append(proteinPerServing);

          newBodyDiv.append(newRow);
  
        }
      
      
        $("#recipes").append(recipeResultList);

        // this initializes the collapsibles
        $('.collapsible').collapsible();
      }
    });
  } else {
    $("#spinnerDiv").hide();
    $("#recipes").show();
    $("#recipes").empty();
    $("#recipes").text("Enter an ingredient before searching");
  }
});

// add ingredient if enter is pressed while focus is in the input text box
$('#foodInputBox').keypress(function(event){
  var keycode = (event.keyCode ? event.keyCode : event.which);
  if(keycode == '13'){
    addIngredient();
  }
});