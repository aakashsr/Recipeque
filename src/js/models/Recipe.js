import axios from 'axios';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
            console.log(res);

        } catch (error) {
            alert('Something went wrong!')
        }
    }

    // Assuming for every 3 ingredients is taking 15 mins
    calcTime() {
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 15);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    parseIngredients() {

        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];

        const newIngredients = this.ingredients.map(el => {

            // 1. Uniform units
            let ingredient = el.toLowerCase();

            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            })


            // 2. remove parenthesis
            ingredient = ingredient.replace(/ *\([^)]*\) */g, '');


            // 3. Parse ingredients into count , unit and ingredient
            const arrIng = ingredient.split(' ');
            console.log(arrIng);

            // getting index of unit in the ingredient string
            const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2));
            console.log(unitIndex);


            let objIng;
            if (unitIndex > -1) {
                // Assuming that everything that comes before units ,is a number
                // Ex. 4 1/2 cups , arrCount is [4, 1/2]
                // Ex. 4 cups , arrCount is [4]
                const arrCount = arrIng.slice(0, unitIndex);
                console.log(arrCount);

                let count;
                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join('')
                }


            } else if (parseInt(arrIng[0], 10)) {
                // there is no unit , but first element is number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join('')
                }

            } else if (unitIndex === -1) {
                // there is no unit or number at 1st position
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }
            return objIng;
        });

        this.ingredients = newIngredients;
    }
}