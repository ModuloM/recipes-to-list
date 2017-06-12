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
        "instructions": "Add cherry tomatoes, cucumber, avocado, red onion and garlic in a medium salad bowl.\r\n\r\nSprinkle minced parsley. Pour olive oil over salad, and season with salt and pepper.\r\n\r\nNote: Add avocado right before serving if you are planning to refrigerate the salad.",
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
        "instructions": "Boil pasta per package directions to al dente. While it is cooking, prepare shrimp.\r\n\r\nHeat a large skillet over moderate heat, then add olive oil and garlic and cook briefly, until golden. Add shrimp, then sprinkle with rosemary and pepper flakes. Cook, stirring, until just cooked through, about 3 minutes. Remove from heat. Season with salt and pepper to taste.\r\n\r\nWhen pasta is ready, drain and immediately spray lightly but evenly with olive oil cooking spray, tossing to coat. Portion into dishes and top with shrimp. Squeeze lemon juice over top and serve. ",
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
        "instructions": "In a sauce pan on Medium heat add water and butter. Allow the butter to completely melt (about 2 minutes). Add Basil, Cayenne Pepper, Salt, Pepper, Paprika and Garlic Powder. Cook on Medium heat for about 2-3 minutes stirring slowly so that the butter is infused with the flavors. Lower the heat to Low.\r\n\r\nAdd Shrimp and stir slowly until shrimp turns a nice coral color and the tails curl. \r\n\r\n(3 Minutes with Extra Large Shrimp max 4-5 Minutes)\r\n\r\nBe careful not to over cook the shrimp or it will become rubbery. ",
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