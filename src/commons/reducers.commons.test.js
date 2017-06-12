import { arrayToDictionary } from './reducers.commons';

describe('arrayToDictionary', () => {
  test('should return recipes dictionary', () => {
    // Given
    const data = [
      {
        "id": 1,
        "title": "Tomato Cucumber Avocado Salad",
        "image_name": "tomato-cucumber-avocado-salad.jpg",
        "instructions": "Add cherry tomatoes, cucumber, avocado, red onion and garlic in a medium salad bowl.\r\n\r\nSprinkle minced parsley. Pour olive oil over salad, and season with salt and pepper.\r\n\r\nNote: Add avocado right before serving if you are planning to refrigerate the salad.",
        "servings": 4
      },
      {
        "id": 2,
        "title": "Spicy Garlic Rosemary Shrimp & Pasta",
        "image_name": "spicy-garlic-rosemary-shrimp-pasta.jpg",
        "instructions": "Boil pasta per package directions to al dente. While it is cooking, prepare shrimp.\r\n\r\nHeat a large skillet over moderate heat, then add olive oil and garlic and cook briefly, until golden. Add shrimp, then sprinkle with rosemary and pepper flakes. Cook, stirring, until just cooked through, about 3 minutes. Remove from heat. Season with salt and pepper to taste.\r\n\r\nWhen pasta is ready, drain and immediately spray lightly but evenly with olive oil cooking spray, tossing to coat. Portion into dishes and top with shrimp. Squeeze lemon juice over top and serve. ",
        "servings": 3
      },
      {
        "id": 3,
        "title": "Butter and Herb Poached Shrimp",
        "image_name": "butter-and-herb-poached-shrimp.jpg",
        "instructions": "In a sauce pan on Medium heat add water and butter. Allow the butter to completely melt (about 2 minutes). Add Basil, Cayenne Pepper, Salt, Pepper, Paprika and Garlic Powder. Cook on Medium heat for about 2-3 minutes stirring slowly so that the butter is infused with the flavors. Lower the heat to Low.\r\n\r\nAdd Shrimp and stir slowly until shrimp turns a nice coral color and the tails curl. \r\n\r\n(3 Minutes with Extra Large Shrimp max 4-5 Minutes)\r\n\r\nBe careful not to over cook the shrimp or it will become rubbery. ",
        "servings": 2
      }
    ];

    // When
    const result = arrayToDictionary(data);

    // Then
    expect(result).toEqual({
      [data[0].id]: data[0],
      [data[1].id]: data[1],
      [data[2].id]: data[2]
    });
  });
});
