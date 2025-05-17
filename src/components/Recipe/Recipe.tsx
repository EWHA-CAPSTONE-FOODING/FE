// 레시피 카드 (박스) 렌더링, 화살표 클릭 시 레시피 상세 페이지 (/recipes/:id) -> Detail.tsx




import { FontMedium, FontRegular } from "@style/font.style";
import unsaved from "@assets/recipe/unsaved.png";
import saved from "@assets/recipe/saved.png";
import arrow from "@assets/recipe/arrow.svg";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { TypeRecipe } from "type/recipe";
import { deleteRecipesHeart, postRecipesHeart } from "@services/api/recipes";
import { useState } from "react";

type Props = {
  recipe: TypeRecipe;
  isHistory?: boolean;
};

const Recipe = ({ recipe, isHistory }: Props) => {
  const { recipeId, name, heart, image, mainIng, total, createdAt, historyId } =
    recipe;
  const navigate = useNavigate();
  const [isHeart, setIsHeart] = useState(heart);

  const requestHeart = () => {
    recipeId &&
      postRecipesHeart(recipeId)
        .then(res => {
          setIsHeart(true);
        })
        .catch(err => console.log(err));
  };

  const cancelHeart = () => {
    recipeId &&
      deleteRecipesHeart(recipeId)
        .then(res => {
          setIsHeart(false);
        })
        .catch(err => console.log(err));
  };

  return (
    <Div>
      <div className="left-container">
        <Img src={image} />

        <Detail
          onClick={() => {
            !isHistory
              ? navigate(`/recipes/${recipeId}`)
              : navigate(`/history/${historyId}`);
          }}
        >
          <div className="name">
            <FontMedium size="14px">{name}</FontMedium>
          </div>
          {!isHistory ? (
            <div className="gray">
              <FontMedium size="12px">주요재료: {mainIng}</FontMedium>
            </div>
          ) : (
            <div className="gray">
              <FontMedium size="12px">총 사용 금액: {total}원</FontMedium>
            </div>
          )}
        </Detail>
      </div>

      <Btns>
        {!isHistory ? (
          isHeart ? (
            <div onClick={cancelHeart}>
              <img className="save" src={saved} />
            </div>
          ) : (
            <div onClick={requestHeart}>
              <img className="save" src={unsaved} />
            </div>
          )
        ) : (
          <div className="date">
            <FontMedium style={{ color: "#7a7a7a" }}>
              {createdAt?.substring(2).replaceAll("-", "/")}
            </FontMedium>
          </div>
        )}
        <img
          className="arrow"
          src={arrow}
          style={{ display: "none" }} // ✅ 눈에 안 보이게
          onClick={() => {
            !isHistory
              ? navigate(`/recipes/${recipeId}`)
              : navigate(`/history/${historyId}`);
          }}
        />
      </Btns>
    </Div>
  );
};

export default Recipe;

const Div = styled.div`
  width: 100%;
  max-width: 375px;
  margin: 0 auto;  
  box-sizing: border-box;
  height: 70px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #FFD880;
  box-sizing: border-box;
  padding: 13px 9px 13px 13px;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;

  .left-container {
    width: 90%;
    display: flex;
    gap: 15px;
    align-items: center; /* ✅ 이 줄 추가 */
  }
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
  flex-shrink: 0;
`;

const Detail = styled.div`
  height: 57px;
  width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 6px;
  margin-top: 5px;
  

  .gray {
    color: var(--grey2);
  }
`;

const Btns = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;

  gap: 15px;

  .save {
    width: 23px;
    margin-right: 3px;
  }

  .arrow {
    width: 20px;
    margin-right: 5px;
  }
`;
























/* 백엔드용
import { FontMedium, FontRegular } from "@style/font.style";
import unsaved from "@assets/recipe/unsaved.png";
import saved from "@assets/recipe/saved.png";
import arrow from "@assets/recipe/arrow.svg";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { TypeRecipe } from "type/recipe";
import { deleteRecipesHeart, postRecipesHeart } from "@services/api/recipes";
import { useState } from "react";

type Props = {
  recipe: TypeRecipe;
  isHistory?: boolean;
};

const Recipe = ({ recipe, isHistory }: Props) => {
  const { recipeId, name, heart, image, mainIng, total, createdAt, historyId } =
    recipe;
  const navigate = useNavigate();
  const [isHeart, setIsHeart] = useState(heart);

  const requestHeart = () => {
    recipeId &&
      postRecipesHeart(recipeId)
        .then(res => {
          setIsHeart(true);
        })
        .catch(err => console.log(err));
  };

  const cancelHeart = () => {
    recipeId &&
      deleteRecipesHeart(recipeId)
        .then(res => {
          setIsHeart(false);
        })
        .catch(err => console.log(err));
  };

  return (
    <Div>
      <div className="left-container">
        <Img src={image} />

        <Detail
          onClick={() => {
            !isHistory
              ? navigate(`/recipes/${recipeId}`)
              : navigate(`/history/${historyId}`);
          }}
        >
          <div className="name">
            <FontMedium size="14px">{name}</FontMedium>
          </div>
          {!isHistory ? (
            <div className="gray">
              <FontMedium size="12px">주요재료: {mainIng}</FontMedium>
            </div>
          ) : (
            <div className="gray">
              <FontMedium size="12px">총 사용 금액: {total}원</FontMedium>
            </div>
          )}
        </Detail>
      </div>

      <Btns>
        {!isHistory ? (
          isHeart ? (
            <div onClick={cancelHeart}>
              <img className="save" src={saved} />
            </div>
          ) : (
            <div onClick={requestHeart}>
              <img className="save" src={unsaved} />
            </div>
          )
        ) : (
          <div className="date">
            <FontMedium style={{ color: "#7a7a7a" }}>
              {createdAt?.substring(2).replaceAll("-", "/")}
            </FontMedium>
          </div>
        )}
        <img
          className="arrow"
          src={arrow}
          onClick={() => {
            !isHistory
              ? navigate(`/recipes/${recipeId}`)
              : navigate(`/history/${historyId}`);
          }}
        />
      </Btns>
    </Div>
  );
};

export default Recipe;

const Div = styled.div`
  width: 90%;
  box-sizing: border-box;
  height: 81px;
  flex-shrink: 0;
  border-radius: 6px;
  background: var(--grey1);
  box-sizing: border-box;
  padding: 13px 9px 13px 13px;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;

  .left-container {
    width: 90%;
    display: flex;
    gap: 15px;
  }
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
  flex-shrink: 0;
`;

const Detail = styled.div`
  height: 57px;
  width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 2px;

  .gray {
    color: var(--grey2);
  }
`;

const Btns = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;

  gap: 15px;

  .save {
    width: 23px;
    margin-right: 3px;
  }

  .arrow {
    width: 20px;
    margin-right: 5px;
  }
`;
*/
