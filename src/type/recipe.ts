import { TypeIngredient } from "./ingredients";

export type TypeRecipe = {
  recipeId?: number;
  name: string;
  image: string;
  mainIng: string;
  instructions: string[];
  advantage: string[];
  heart: boolean;
  ingredients?: TypeIngredient[];
  video?: string;
  total?: number;
  createdAt?: string;
  historyId?: number;
};
