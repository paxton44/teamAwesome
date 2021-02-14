$("#drink-dropdown").on("click", function () {

})

$(document).ready(function () {
var confirm = ('yes')


window.onload = function () {
  if (confirm) {
    document.getElementById('yes').onclick = function () {
      document.getElementById('modal').style.display = 'none'
      console.log(onclick);
      //why is the on click null?

    }
  }
  //  else {
  // //redirect to modalNo.html




  //  }

};

//making no button function we might need to deploy the 2nd html page as its own entity so we have a live url to redirect to.
document.getElementById('no').onclick = function () {
  location.href = "https://www.bbc.com/";
};



var drinkVal;

$("#drink-dropdown").on("change", function (e) {
  // drinkVal.stopImmediatePropagation();
  // return false;
  //  $( "ul" ).empty();
  $("h1").empty();
  $("p").empty();
  $("#drink-image").empty();
  drinkVal = $("#drink-dropdown").val();

  

  var myLink = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkVal}`;
  // var e = $("#drink-dropdown").val();
  // var result = e.options[e.selectedIndex]

  e.preventDefault();
  console.log(drinkVal);
  // mojito API
  fetch(myLink)
    .then(function (drinkVal) {
      return drinkVal.json();
    })
    .then(function (data) {
      console.log(data);
      drinkData(data);
    });




});

let drinkName;

function drinkData(data) {
  let drink = data.drinks[0];
  const drinkDiv = document.getElementById("drink-content");

  // strDrink
  drinkName = drink.strDrink;
    console.log(drinkName);

    fetch("https://api.pexels.com/v1/search?query=" + drinkName, {
        headers: {
          Authorization: "563492ad6f9170000100000134e84897333d4b1f95f23ba765c754d6"
        }
      })
      .then(resp => {

        return resp.json()
      })
      .then(data => {
          console.log(data)
          var drinkimages = {
            moscowMule: {
              img: data.photos[0].src.medium
            },
            "Gin + Tonic": {
              img: data.photos[1].src.medium
            },
            "Mojito": {
              img: data.photos[0].src.medium
            },
            "Pina Colada": {
              img: data.photos[1].src.medium
            },
            "Margarita": {
              img: data.photos[0].src.medium
            }
          }
          console.log(drinkName)
        console.log(drinkimages[drinkName])
        var imgEL = document.createElement('img');
        imgEL.setAttribute("src", drinkimages[drinkName].img)

        document.getElementById('drink-image').appendChild(imgEL);

  
          
          
          
      })

  // empty out div 

  const heading = document.createElement("h1");
  heading.innerHTML = drinkName;
  drinkDiv.appendChild(heading);

  for (var i = 0; i < 15; i++) {
    // ingredients with drink measurements
    //
    const drinkIngredients = document.createElement("p");
    drinkDiv.appendChild(drinkIngredients);
    const value = drink[`strIngredient${i}`] + ": " + drink[`strMeasure${i}`];
    // console.log(drink[`strIngredient${i}`] + ": " + drink[`strMeasure${i}`])
    // add drink name
    if (drink[`strIngredient${i}`] != null) {
      listItem = document.createElement("p");
      listItem.innerHTML = value;
      $("p").attr("id", i + 1);
      listItem.className = "drink-p"
      drinkIngredients.appendChild(listItem);
    }


  }



  // instructions
  const drinkInstructions = document.createElement('p');
  drinkInstructions.className = "drink-p"



  drinkDiv.appendChild(drinkInstructions);
  const getInstructions = drink.strInstructions

  drinkInstructions.append(getInstructions);
}
});
