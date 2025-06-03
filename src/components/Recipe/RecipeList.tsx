// list.map()으로 각각의 레시피를 <Recipe /> 컴포넌트에 넘김





import React, { useEffect } from "react";
import Recipe from "./Recipe";
import styled from "styled-components";
import { getRecipes } from "@services/api/recipes";
import { TypeRecipe } from "type/recipe";

type Props = {
  isHistory: boolean;
  list: TypeRecipe[];
};

const RecipeList = ({ isHistory, list }: Props) => {
  return (
    <List>
      {list &&
        list.map((recipe: TypeRecipe) => {
          return (
            <Recipe
              recipe={recipe}
              isHistory={isHistory}
              key={recipe.recipeId}
            />
          );
        })}
    </List>
  );
};

export default RecipeList;

const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;








