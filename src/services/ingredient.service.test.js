import ingredientService from './ingredient.service';

describe('IngredientService', () => {
  let recipes;
  let selectedRecipes;

  beforeEach(() => {
    recipes = {
      1: {
        "id": 1,
        "title": "Tomato Cucumber Avocado Salad",
        "image_name": "tomato-cucumber-avocado-salad.jpg",
        "instructions": "instructions.",
        "servings": 4,
        "ingredients": [
          {
            "display_index": 0,
            "name": "cherry tomatoes",
            "department": "Produce",
            "quantity": 237,
            "unit": "ml"
          },
          {
            "display_index": 1,
            "name": "cucumber",
            "department": "Produce",
            "quantity": 237,
            "unit": "ml"
          },
          {
            "display_index": 4,
            "name": "garlic",
            "department": "Produce",
            "quantity": 2,
            "unit": "cloves"
          },
          {
            "display_index": 5,
            "name": "parsley",
            "department": "Produce",
            "quantity": 15,
            "unit": "ml"
          },
          {
            "display_index": 6,
            "name": "olive oil",
            "department": "Condiments",
            "quantity": 15,
            "unit": "ml"
          }
        ]
      },
      2: {
        "id": 2,
        "title": "Spicy Garlic Rosemary Shrimp & Pasta",
        "image_name": "spicy-garlic-rosemary-shrimp-pasta.jpg",
        "instructions": "instructions.",
        "servings": 3,
        "ingredients": [
          {
            "display_index": 0,
            "name": "pasta",
            "department": "Pasta",
            "quantity": 0.226796185,
            "unit": "kg"
          },
          {
            "display_index": 1,
            "name": "shrimp",
            "department": "Seafood",
            "quantity": 0.45359237,
            "unit": "kg"
          },
          {
            "display_index": 4,
            "name": "garlic",
            "department": "Produce",
            "quantity": 2,
            "unit": "cloves"
          },
          {
            "display_index": 7,
            "name": "salt and pepper",
            "department": "Spices",
            "quantity": 1,
            "unit": ""
          }
        ]
      },
      3: {
        "id": 3,
        "title": "Butter and Herb Poached Shrimp",
        "image_name": "butter-and-herb-poached-shrimp.jpg",
        "instructions": "instructions.",
        "servings": 2,
        "ingredients": [
          {
            "display_index": 0,
            "name": "shrimp",
            "department": "Seafood",
            "quantity": 300,
            "unit": "g"
          },
          {
            "display_index": 6,
            "name": "garlic Powder ",
            "department": "Spices",
            "quantity": 2.46446079160853,
            "unit": "ml"
          },
          {
            "display_index": 7,
            "name": "salt and pepper",
            "department": "Spices",
            "quantity": 0,
            "unit": ""
          }
        ]
      }
    };
  });

  describe('cleanRecipesIngredientsUnits', () => {
    test('should unify recipes ingredients units and quantities', ()=> {
      // Given
      const recipesArray = Object.values(recipes);

      // When
      const result = ingredientService.cleanRecipesIngredientsUnits(recipesArray);
  
      // Then
      expect(result).toEqual([
        {
          "id": 1,
          "image_name": "tomato-cucumber-avocado-salad.jpg",
          "ingredients": [
            {
              "department": "Produce",
              "name": "cherry tomatoes",
              "quantity": 237,
              "unit": "ml"
            },
            {
              "department": "Produce",
              "name": "cucumber",
              "quantity": 237,
              "unit": "ml"
            },
            {
              "department": "Produce",
              "name": "garlic",
              "quantity": 0.25,
              "unit": ""
            },
            {
              "department": "Produce",
              "name": "parsley",
              "quantity": 15,
              "unit": "ml"
            },
            {
              "department": "Condiments",
              "name": "olive oil",
              "quantity": 15,
              "unit": "ml"
            }
          ],
          "instructions": "instructions.",
          "servings": 4,
          "title": "Tomato Cucumber Avocado Salad"
        },
        {
          "id": 2,
          "image_name": "spicy-garlic-rosemary-shrimp-pasta.jpg",
          "ingredients": [
            {
              "department": "Pasta",
              "name": "pasta",
              "quantity": 227,
              "unit": "g"
            },
            {
              "department": "Seafood",
              "name": "shrimp",
              "quantity": 454,
              "unit": "g"
            },
            {
              "department": "Produce",
              "name": "garlic",
              "quantity": 0.25,
              "unit": ""
            },
            {
              "department": "Spices",
              "name": "salt and pepper",
              "quantity": 1,
              "unit": ""
            }
          ],
          "instructions": "instructions.",
          "servings": 3,
          "title": "Spicy Garlic Rosemary Shrimp & Pasta"
        },
        {
          "id": 3,
          "image_name": "butter-and-herb-poached-shrimp.jpg",
          "ingredients": [
            {
              "department": "Seafood",
              "name": "shrimp",
              "quantity": 300,
              "unit": "g"
            },
            {
              "department": "Spices",
              "name": "garlic Powder ",
              "quantity": 2,
              "unit": "ml"
            },
            {
              "department": "Spices",
              "name": "salt and pepper",
              "quantity": 0,
              "unit": ""
            }
          ],
          "instructions": "instructions.",
          "servings": 2,
          "title": "Butter and Herb Poached Shrimp"
        }
      ]);
    })
  });

  describe('cleanIngredientUnits', () => {
    test('should unify ingredient units and quantities', ()=> {
      // Given
      const ingredients = [
        ...recipes[1].ingredients,
        ...recipes[2].ingredients
      ]
      // When
      const result = ingredientService.cleanIngredientsUnits(ingredients);
  
      // Then
      expect(result).toEqual([
        {
          "department": "Produce",
          "name": "cherry tomatoes",
          "quantity": 237,
          "unit": "ml"
        },
        {
          "department": "Produce",
          "name": "cucumber",
          "quantity": 237,
          "unit": "ml"
        },
        {
          "department": "Produce",
          "name": "garlic",
          "quantity": 0.25,
          "unit": ""
        },
        {
          "department": "Produce",
          "name": "parsley",
          "quantity": 15,
          "unit": "ml"
        },
        {
          "department": "Condiments",
          "name": "olive oil",
          "quantity": 15,
          "unit": "ml"
        },
        {
          "department": "Pasta",
          "name": "pasta",
          "quantity": 227,
          "unit": "g"
        },
        {
          "department": "Seafood",
          "name": "shrimp",
          "quantity": 454,
          "unit": "g"
        },
        {
          "department": "Produce",
          "name": "garlic",
          "quantity": 0.25,
          "unit": ""
        },
        {
          "department": "Spices",
          "name": "salt and pepper",
          "quantity": 1,
          "unit": ""
        }
      ]);
    })
  });

  describe('computeRecipesIngredientsForOnePerson', () => {
    test('should compute recipe and ingredients for one person', () => {
      // Given
      const recipesCleanedArray = [
        {
          "id": 1,
          "image_name": "tomato-cucumber-avocado-salad.jpg",
          "ingredients": [
            {
              "department": "Produce",
              "name": "cherry tomatoes",
              "quantity": 237,
              "unit": "ml"
            },
            {
              "department": "Produce",
              "name": "cucumber",
              "quantity": 237,
              "unit": "ml"
            },
            {
              "department": "Produce",
              "name": "garlic",
              "quantity": 0.25,
              "unit": ""
            },
            {
              "department": "Produce",
              "name": "parsley",
              "quantity": 15,
              "unit": "ml"
            },
            {
              "department": "Condiments",
              "name": "olive oil",
              "quantity": 15,
              "unit": "ml"
            }
          ],
          "instructions": "instructions.",
          "servings": 4,
          "title": "Tomato Cucumber Avocado Salad"
        },
        {
          "id": 2,
          "image_name": "spicy-garlic-rosemary-shrimp-pasta.jpg",
          "ingredients": [
            {
              "department": "Pasta",
              "name": "pasta",
              "quantity": 227,
              "unit": "g"
            },
            {
              "department": "Seafood",
              "name": "shrimp",
              "quantity": 454,
              "unit": "g"
            },
            {
              "department": "Produce",
              "name": "garlic",
              "quantity": 0.25,
              "unit": ""
            },
            {
              "department": "Spices",
              "name": "salt and pepper",
              "quantity": 1,
              "unit": ""
            }
          ],
          "instructions": "instructions.",
          "servings": 3,
          "title": "Spicy Garlic Rosemary Shrimp & Pasta"
        },
        {
          "id": 3,
          "image_name": "butter-and-herb-poached-shrimp.jpg",
          "ingredients": [
            {
              "department": "Seafood",
              "name": "shrimp",
              "quantity": 300,
              "unit": "g"
            },
            {
              "department": "Spices",
              "name": "garlic Powder ",
              "quantity": 2,
              "unit": "ml"
            },
            {
              "department": "Spices",
              "name": "salt and pepper",
              "quantity": 0,
              "unit": ""
            }
          ],
          "instructions": "instructions.",
          "servings": 2,
          "title": "Butter and Herb Poached Shrimp"
        }
      ];

      // When
      const result = ingredientService.computeRecipesIngredientsForOnePerson(recipesCleanedArray)

      // Then
      expect(result).toEqual([
        {
          "id": 1,
          "image_name": "tomato-cucumber-avocado-salad.jpg",
          "ingredients": [
            {
              "department": "Produce",
              "name": "cherry tomatoes",
              "quantity": 59.25,
              "unit": "ml"
            },
            {
              "department": "Produce",
              "name": "cucumber",
              "quantity": 59.25,
              "unit": "ml"
            },
            {
              "department": "Produce",
              "name": "garlic",
              "quantity": 0.0625,
              "unit": ""
            },
            {
              "department": "Produce",
              "name": "parsley",
              "quantity": 3.75,
              "unit": "ml"
            },
            {
              "department": "Condiments",
              "name": "olive oil",
              "quantity": 3.75,
              "unit": "ml"
            }
          ],
          "instructions": "instructions.",
          "servings": 4,
          "title": "Tomato Cucumber Avocado Salad"
        },
        {
          "id": 2,
          "image_name": "spicy-garlic-rosemary-shrimp-pasta.jpg",
          "ingredients": [
            {
              "department": "Pasta",
              "name": "pasta",
              "quantity": 75.66666666666667,
              "unit": "g"
            },
            {
              "department": "Seafood",
              "name": "shrimp",
              "quantity": 151.33333333333334,
              "unit": "g"
            },
            {
              "department": "Produce",
              "name": "garlic",
              "quantity": 0.08333333333333333,
              "unit": ""
            },
            {
              "department": "Spices",
              "name": "salt and pepper",
              "quantity": 0.3333333333333333,
              "unit": ""
            }
          ],
          "instructions": "instructions.",
          "servings": 3,
          "title": "Spicy Garlic Rosemary Shrimp & Pasta"
        },
        {
          "id": 3,
          "image_name": "butter-and-herb-poached-shrimp.jpg",
          "ingredients": [
            {
              "department": "Seafood",
              "name": "shrimp",
              "quantity": 150,
              "unit": "g"
            },
            {
              "department": "Spices",
              "name": "garlic Powder ",
              "quantity": 1,
              "unit": "ml"
            },
            {
              "department": "Spices",
              "name": "salt and pepper",
              "quantity": 0,
              "unit": ""
            }
          ],
          "instructions": "instructions.",
          "servings": 2,
          "title": "Butter and Herb Poached Shrimp"
        }
      ]);
    })
  })

  describe('quantitiesForOnePerson', () => {
    test('should divide quantities for 1 person', ()=> {
      // Given
      const servings = recipes[1].servings;
      const ingredients = recipes[1].ingredients;

      // When
      const result = ingredientService.quantitiesForOnePerson(servings, ingredients);

      // Then
      expect(result).toEqual([
        {
          "department": "Produce",
          "display_index": 0,
          "name": "cherry tomatoes",
          "quantity": 59.25,
          "unit": "ml"
        },
        {
          "department": "Produce",
          "display_index": 1,
          "name": "cucumber",
          "quantity": 59.25,
          "unit": "ml"
        },
        {
          "department": "Produce",
          "display_index": 4,
          "name": "garlic",
          "quantity": 0.5,
          "unit": "cloves"
        },
        {
          "department": "Produce",
          "display_index": 5,
          "name": "parsley",
          "quantity": 3.75,
          "unit": "ml"
        },
        {
          "department": "Condiments",
          "display_index": 6,
          "name": "olive oil",
          "quantity": 3.75,
          "unit": "ml"
        }
      ]);
    })
  });

  describe('getSelectedRecipeIds', () => {
    test('should filter unselected recipes', () => {
      // Given
      selectedRecipes = {
        1: {
          id: 1,
          selected: true
        },
        2: {
          id: 2,
          selected: false
        },
        3: {
          id: 3,
          selected: true
        }
      };

      // When
      const result = ingredientService.getSelectedRecipeIds(selectedRecipes);

      // Then
      expect(result).toEqual({
        [selectedRecipes[1].id]: {
          id: selectedRecipes[1].id
        },
        [selectedRecipes[3].id]: {
          id: selectedRecipes[3].id
        }
      });
    });

    test('should filter not present recipes', () => {
      // Given
      selectedRecipes = {
        1: {
          id: 1,
          selected: true
        },
        3: {
          id: 3,
          selected: true
        }
      };

      // When
      const result = ingredientService.getSelectedRecipeIds(selectedRecipes);

      // Then
      expect(result).toEqual({
        [selectedRecipes[1].id]: {
          id: selectedRecipes[1].id
        },
        [selectedRecipes[3].id]: {
          id: selectedRecipes[3].id
        }
      });
    });
  });

  describe('getSelectedRecipesObjects', () => {
    test('should filter selected recipes', () => {
      // Given
      const selectedRecipesIds = {
        [selectedRecipes[1].id]: {
          id: selectedRecipes[1].id
        },
        [selectedRecipes[3].id]: {
          id: selectedRecipes[3].id
        }
      };

      // When
      const result = ingredientService.getSelectedRecipesObjects(selectedRecipesIds, recipes);

      // Then
      expect(result).toEqual({
        [recipes[1].id]: recipes[1],
        [recipes[3].id]: recipes[3]
      });
    });
  });

  describe('getIngredients', () => {
    test('should return ingredients from recipes array', () => {
      // Given
      const selectedRecipesObjects = {
        [recipes[1].id]: recipes[1],
        [recipes[3].id]: recipes[3]
      };
  
      // When
      const result = ingredientService.getIngredients(selectedRecipesObjects);
  
      // Then
      expect(result).toEqual([
        ...recipes[1].ingredients,
        ...recipes[3].ingredients
      ]);
    });
  });

  describe('getIngredientsByName', () => {
    test('should return ingredients, grouped by name', () => {
      // Given
      const selectedIngredients = [
        ...recipes[2].ingredients,
        ...recipes[3].ingredients
      ];

      // When
      const result = ingredientService.getIngredientsByName(selectedIngredients);

      // Then
      expect(result).toEqual({
        "garlic": [
          {"department": "Produce", "display_index": 4, "name": "garlic", "quantity": 2, "unit": "cloves"}
        ],
        "garlic Powder": [
          {"department": "Spices", "display_index": 6, "name": "garlic Powder ", "quantity": 2.46446079160853, "unit": "ml"}
        ],
        "pasta": [
          {"department": "Pasta", "display_index": 0, "name": "pasta", "quantity": 0.226796185, "unit": "kg"}
        ],
        "salt and pepper": [
          {"department": "Spices", "display_index": 7, "name": "salt and pepper", "quantity": 1, "unit": ""},
          {"department": "Spices", "display_index": 7, "name": "salt and pepper", "quantity": 0, "unit": ""}
        ],
        "shrimp": [
          {"department": "Seafood", "display_index": 1, "name": "shrimp", "quantity": 0.45359237, "unit": "kg"},
          {"department": "Seafood", "display_index": 0, "name": "shrimp", "quantity": 300, "unit": "g"}
        ]
      });
    });
  });

  describe('getIngredientsByUnit', () => {
    test('should group ingredients by same units', () => {
      // Given
      const ingredientsByName = [
        {"department": "Produce", "display_index": 4, "name": "garlic", "quantity": 2, "unit": "cloves"},
        {"department": "Produce", "display_index": 4, "name": "garlic", "quantity": 1.2, "unit": "cloves"}
      ];

      // When
      const result = ingredientService.getIngredientsByUnit(ingredientsByName);

      // Then
      expect(result).toEqual({
        "cloves": [
          {"department": "Produce", "display_index": 4, "name": "garlic", "quantity": 2, "unit": "cloves"},
          {"department": "Produce", "display_index": 4, "name": "garlic", "quantity": 1.2, "unit": "cloves"}
        ]
      });
    });

    test('should group ingredients by different units', () => {
      // Given
      const ingredientsByName = [
        {"department": "Seafood", "display_index": 1, "name": "shrimp", "quantity": 0.45359237, "unit": "kg"},
        {"department": "Seafood", "display_index": 0, "name": "shrimp", "quantity": 300, "unit": "g"}
      ];

      // When
      const result = ingredientService.getIngredientsByUnit(ingredientsByName);

      // Then
      expect(result).toEqual({
        "kg": [
          {"department": "Seafood", "display_index": 1, "name": "shrimp", "quantity": 0.45359237, "unit": "kg"}
        ],
        "g": [
          {"department": "Seafood", "display_index": 0, "name": "shrimp", "quantity": 300, "unit": "g"}
        ]
      });
    });
  });

  describe('getIngredientsByDepartment', () => {
    test('should group ingredients by same units', () => {
      // Given
      const ingredients = [
        { "department": "Produce", "display_index": 4, "name": "garlic", "quantity": 2, "unit": "cloves" },
        { "department": "Spices", "display_index": 6, "name": "garlic Powder ", "quantity": 2.46446079160853, "unit": "ml" },
        { "department": "Pasta", "display_index": 0, "name": "pasta", "quantity": 0.226796185, "unit": "kg" },
        { "department": "Seafood", "display_index": 1, "name": "shrimp", "quantity": 0.45359237, "unit": "kg" },
        { "department": "Seafood", "display_index": 0, "name": "shrimp", "quantity": 300, "unit": "g" }
      ];

      // When
      const result = ingredientService.getIngredientsByDepartment(ingredients);

      // Then
      expect(result).toEqual({
        "Produce": [
          { "department": "Produce", "display_index": 4, "name": "garlic", "quantity": 2, "unit": "cloves" }
        ],
        "Spices": [
          { "department": "Spices", "display_index": 6, "name": "garlic Powder ", "quantity": 2.46446079160853, "unit": "ml" }
        ],
        "Pasta": [
          { "department": "Pasta", "display_index": 0, "name": "pasta", "quantity": 0.226796185, "unit": "kg" }
        ],
        "Seafood": [
          { "department": "Seafood", "display_index": 1, "name": "shrimp", "quantity": 0.45359237, "unit": "kg" },
          { "department": "Seafood", "display_index": 0, "name": "shrimp", "quantity": 300, "unit": "g" }
        ]
      });
    });
  });

  describe('computeIngredientQuantities', () => {
    test('should add add ingredients quantities', () => {
      // Given
      const ingredientsByName = [
        {"department": "Seafood", "display_index": 1, "name": "shrimp", "quantity": 454, "unit": "g"},
        {"department": "Seafood", "display_index": 0, "name": "shrimp", "quantity": 300, "unit": "g"}
      ];

      // When
      const result = ingredientService.computeIngredientQuantities(ingredientsByName);

      // Then
      expect(result).toEqual({
        "department": "Seafood", "display_index": 0, "name": "shrimp", "quantity": 754, "unit": "g"
      });
    });
  });

  describe('computeIngredients', () => {
    test('should add same ingredients with same unit', () => {
      // Given
      const ingredientsByName = [
        { "department": "Produce", "display_index": 4, "name": "garlic", "quantity": 2, "unit": "cloves" },
        { "department": "Produce", "display_index": 4, "name": "garlic", "quantity": 1.2, "unit": "cloves" },
        { "department": "Spices", "display_index": 7, "name": "salt and pepper", "quantity": 1, "unit": "" },
        { "department": "Spices", "display_index": 7, "name": "salt and pepper", "quantity": 0, "unit": "" },
        { "department": "Seafood", "display_index": 1, "name": "shrimp", "quantity": 0.45359237, "unit": "kg" },
        { "department": "Seafood", "display_index": 0, "name": "shrimp", "quantity": 300, "unit": "g" }
      ];

      // When
      const result = ingredientService.computeIngredients(ingredientsByName);

      // Then
      expect(result).toEqual([
        { "department": "Produce", "display_index": 4, "name": "garlic", "quantity": 3.2, "unit": "cloves" },
        { "department": "Spices", "display_index": 7, "name": "salt and pepper", "quantity": 1, "unit": "" },
        { "department": "Seafood", "display_index": 1, "name": "shrimp", "quantity": 0.45359237, "unit": "kg" },
        { "department": "Seafood", "display_index": 0, "name": "shrimp", "quantity": 300, "unit": "g" }
      ]);
    });
  });
  
});