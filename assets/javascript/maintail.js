let drinkIngredientList = [];

$("#addDrinkButton").on("click", function () {
  addStuff();
})

function addStuff () {
  let newIngredient = $("#drinkInputBox").val().trim();
  $("#drinkInputBox").val("");
  drinkIngredientList.push(newIngredient);


  $("#ingList").empty();
  //create and display new ingredient on web page
  for (let i = 0; i < drinkIngredientList.length; i++) {
    let newItem = $("<li>");
    newItem.text(drinkIngredientList[i]);
    $("#ingList").append($(newItem));
  }
};

$('#drinkInputBox').keypress(function(event){
  let keycode = (event.keyCode ? event.keyCode : event.which);
  if(keycode == '13'){
    addStuff();
  }
});

$("#clearDrinksButton").on("click", function () {
  drinkIngredientList = [];
  $("#ingList").empty();
});

$("#DrinkSearchButton").on("click", function showDrinks() {
    function clearBox() {
      $("#recipes").text("");
  }
  clearBox();


  $("#recipes").show();
  let input = "";
  for (let i = 0; i < drinkIngredientList.length; i++) {
    if(i == drinkIngredientList.length - 1) {
      input = input + drinkIngredientList[i]
    } else {
      input = input + drinkIngredientList[i] + ",";
    }
  } 
  input = input.trim();
  if (input != "") {
    
    let tailURL = "https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=" + input
    
    console.log(tailURL)
    $.ajax({
      url: tailURL,
      method: "GET"
    }).then(function (response) {
      $("#recipes").show();
      if (response.drinks == "None Found") {
        $("#recipes").empty();
        $("#recipes").text("Sorry! Couldn't find anything matching that.")
        console.log(response)
      } else {
      for (i = 0; i < response.drinks.length; i++) {
        
        let div = $("#recipes")
        let unorderList = $("<ul>").addClass("collapsible popout").attr("data-collapsible", "accordion")
        let dList = $("<li>")
        dList.addClass("");
        let divHead = $("<div>").addClass("collapsible-header")
        $(divHead).text(response.drinks[i].strDrink)
        let drnkID = response.drinks[i].idDrink
        let divBody = $("<div>").addClass("collapsible-body").attr("id", drnkID)
        let display = $("<p>").attr("id", "recipe_" + i)
        let titleDisplay = $("<p>").text(response.drinks[i].strDrink + ":").attr("style", "font-weight: bold;")

        $(div).append(unorderList)
        $(unorderList).append(dList)
        $(dList).append(divHead)
        $(dList).append(divBody)
        $(divBody).append(titleDisplay)
        $(divBody).append(display)

        // this initializes the collapsibles
        $('.collapsible').collapsible();


        //when you click on text of drink
        // $('#' + drnkID).on('click', function showStuff() {
        function clearStuff() {
          // $(unorder).text("")
        }
        clearStuff();
        //do the next request in here
        let idURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drnkID
        $.ajax({
          url: idURL,
          method: "GET"
        }).then(function (res) {
          // ingredient and measure list
          for (j = 1; j < 15; j++) {

            let ingredNum = "strIngredient" + j;
            let measureNum = "strMeasure" + j;
            let measurement = res.drinks[0][measureNum]
            
            if (res.drinks[0][ingredNum] != null) {
              
              if (measurement == null) {
                measurement = "As desired"
                
              }
              let unorder = $("<ul></ul>")
              let ingList = $("<li></li>").attr("class", "ingredients").text(res.drinks[0][ingredNum] + ":  " + measurement);
              // let measureList = $("<li></li>").attr("class", "measure").text(res.drinks[0][measureNum]);
              console.log("Display == " + display);
              $(display).append(unorder)
              $(unorder).append(ingList)
              // $(unorder).append(measureList)
            }
          }
          let brake = $("<br>")
          let pTag = $("<p>")
          let type = $("<li>").text("Type of drink:   " + res.drinks[0].strCategory)
          let glass = $("<li>").text("Glass used (Optional):   " + res.drinks[0].strGlass)

          $(display).append(pTag)
          $(pTag).append(type)
          $(pTag).append(glass)
          $(pTag).append(brake)

          let drinkImg = $("<img>")
          drinkImg.attr("src", res.drinks[0].strDrinkThumb)
          drinkImg.attr("alt", "Picture of " + res.drinks[0].strDrink)
          let instructions = $("<p>").attr("style", "font-weight: bold;")
          let instructionTitle = $("<p>").attr("style", "font-weight: bold;")
          instructionTitle.text("Instructions: ")

          instructions.text(res.drinks[0].strInstructions)
          $(drinkImg).width(200)
          $(display).append(drinkImg)
          $(display).append(instructionTitle)
          $(instructionTitle).append(instructions)



        })// end of ingredient loop
        // }) //end of second click function
      } // end of first loop
    }// end of else
    })
  } else {
    $("#recipes").show();
    $("#recipes").empty();
    $("#recipes").text("Please provide a drink to search for.")
  }
})
function showIngredient() {
}
$("#clickMe").on("click", function () {
  let input = $("#input").val()
  var queryURL = "https://api.edamam.com/search?q=" + input + "&app_id=71e0d17f&app_key=a0c9342317580b0fbf06152010ee5e86";
  // Performing our AJAX GET request
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // After the data comes back from the API
    .then(function (response) {
      // console.log(response);
    });
});



// $("#addDrinkButton").on("click", f