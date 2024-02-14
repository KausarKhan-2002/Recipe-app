let searchBtn = document.querySelector("#searchBtn");
let searchBox = document.querySelector("#searchBox");
let recipeContainer = document.querySelector(".recipe-container");
let recipeDetailsContent = document.querySelector(".recipe-details-content");
let recipeClosebtn = document.querySelector(".recipe-closebtn");

// Original URL
// "https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata";

// Modified URL
const URL = "https://www.themealdb.com/api/json/v1/1/search.php?s";

// Fetch Ingridients
const fetchIngridients = (meal) => {
  let ingredientsList = "";
  // console.log(meal);
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient) {
      const measure = meal[`strMeasure${i}`];
      ingredientsList += `<li>${measure} ${ingredient}</li>`;
    } else {
      break;
    }
  }
  return ingredientsList;
};

// Reciepe Details Hide
recipeClosebtn.addEventListener("click", () => {
  recipeDetailsContent.parentElement.style.display = "none";
});

// Reciepe Details
const recipeDetails = (meal) => {
  recipeDetailsContent.innerHTML = `
  <h2 class="recipeName">${meal.strMeal} Dish</h2>
  <h3>Ingredients:</h3>
  <ul class="ingredientsList">${fetchIngridients(meal)}</ul>
  <div>
    <h3>Instructions:</h3>
    <p class="recipeInstructions">${meal.strInstructions}</p>
  </div>
  `;
  recipeDetailsContent.parentElement.style.display = "block";
};

// Fetching meals on the basis of input value.
const fetchMeals = async (getInputVal) => {
  recipeContainer.innerHTML = "<h3>Fetching Recipies...</h3>";
  const mealResponse = await fetch(`${URL}=${getInputVal}`);
  const mealData = await mealResponse.json();
  // console.log(mealData);
  recipeContainer.innerHTML = "";
  mealData.meals.forEach((meal) => {
    const mealDiv = document.createElement("div");
    mealDiv.classList.add("recipe");
    mealDiv.innerHTML = `
        <img src ="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h2>
        <p><span>${meal.strArea}</span> <small>Dish</small></p>
        <p><small>Belongs to</small> <span>${meal.strCategory}</span> <small>Category</small></p>
        `;
    const button = document.createElement("button");
    button.textContent = "View reciepe";
    mealDiv.appendChild(button);

    // recipe button behaviour
    button.addEventListener("click", () => {
      recipeDetails(meal);
    });

    recipeContainer.append(mealDiv);
  });
};

// Get Input Value
searchBtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  const getInputVal = searchBox.value.trim();
  fetchMeals(getInputVal);
});
