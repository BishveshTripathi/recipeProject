const searchBox = document.querySelector(".search_box");
const searchBtn = document.querySelector(".btn");
const recipeContainer = document.querySelector(".result");
const recipeDetailContent = document.querySelector(".recipe_details_content");
const recipeCloseBtn = document.querySelector(".popup_close_btn");

// main function

const recipeFetching = async (query) => {
  recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>";
  try {
    const data =
      await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}
    `);
    const response = await data.json();
    recipeContainer.innerHTML = "";

    //   looping

    response.meals.forEach((meal) => {
      const recipeDiv = document.createElement("div");
      recipeDiv.classList.add("recipe");
      recipeDiv.innerHTML = `
        <img src='${meal.strMealThumb}'>
        <h3>${meal.strMeal}</h3>
        <p>${meal.strArea} Dish </p>
        <p>Belongs to ${meal.strCategory}</p>
    `;

      const button = document.createElement("button");
      button.textContent = "View Recipe";
      recipeDiv.appendChild(button);

      button.addEventListener("click", () => {
        openRecipePopup(meal);
      });

      recipeContainer.appendChild(recipeDiv);
    });
  } catch (error) {
    recipeContainer.innerHTML = "<h2>Error in fetching recipe</h2>";
  }
};

//function to fetch ingredients and measurements

const fetchIngredients = (meal) => {
  console.log(meal.strIngredient);
  let ingredientList = "";
  for (let i = 0; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient) {
      const measure = meal[`strMeasure${i}`];
      ingredientList += `<li>${measure}${ingredient}</li>`;
      console.log(ingredientList);
    } else {
      break;
    }
  }
  return ingredientList;
};

// function for popup open

const openRecipePopup = (meal) => {
  recipeDetailContent.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul class="IngredientList">${fetchIngredients(meal)}</ul>
        <div class="recipeInstructions">
        <h3>Instructions : </h3>
        <p>${meal.strInstructions}</p>
        </div>
    `;
  recipeDetailContent.parentElement.style.display = "block";
};

recipeCloseBtn.addEventListener("click", () => {
  recipeDetailContent.parentElement.style.display = "none";
});

// button for main function
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchedInput = searchBox.value.trim();
  if (!searchedInput) {
    recipeContainer.innerHTML = `<h2>Search meal in search box</h2>`;
    return;
  }
  recipeFetching(searchedInput);
});
