import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()

export class RecipeService{

	recipesChanged = new Subject<Recipe[]>();

	// private recipes: Recipe[] = [
	// 	new Recipe(
	// 			'Tasty Schnitzel', 
	// 			'A super tasty schintzel',
	// 			'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
	// 			[
	// 				new Ingredient('Meat', 2),
	// 				new Ingredient('French fries', 20)
	// 			]),
	// 	new Recipe(
	// 			'Big Fat Burger', 
	// 			'What else you need to say?', 
	// 			'https://upload.wikimedia.org/wikipedia/commons/9/9a/Big_Mac_hamburger.jpg',
	// 			[
	// 				new Ingredient('Buns', 2),
	// 				new Ingredient('Coke', 1)
	// 			])
	// ];
	private recipes: Recipe[] = [];

	constructor(private slService: ShoppingListService){}

	setRecipes(recipes: Recipe[]){
		this.recipes = recipes;
		this.recipesChanged.next(this.recipes.slice());
	}

	getRecipes(){
		return this.recipes.slice();
	}

	getRecipe(index: number){
		return this.recipes[index];
	}

	addIngredientsToShoppingList(ingredients: Ingredient[]){
		this.slService.addIngredients(ingredients);
	}

	addRecipe(recipe: Recipe){
		this.recipes.push(recipe);
		this.recipesChanged.next(this.recipes.slice());
	}

	updateRecipe(index: number, newRecipe: Recipe){
		this.recipes[index] = newRecipe;
		this.recipesChanged.next(this.recipes.slice());
	}

	deleteRecipe(index: number){
		this.recipes.splice(index, 1);
		this.recipesChanged.next(this.recipes.slice());
	}

}