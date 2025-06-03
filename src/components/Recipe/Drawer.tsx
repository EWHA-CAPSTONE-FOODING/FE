




















import LongBtn from "@components/Buttons/LongBtn";
import List from "@components/Ingredients/List/List";
import { FontBold, FontMedium } from "@style/font.style";
import styled from "styled-components";


import { useNavigate } from "react-router-dom";
import { TypeRecipe } from "type/recipe";

type Props = {
  detail: TypeRecipe;
  recipeId: number;
};

const Drawer = ({ detail, recipeId }: Props) => {
  const navigate = useNavigate();
  const { name, mainIng, ingredients, video, instructions, advantage } = detail;

  return (
    <Div>
      <Top>
        <FontBold size="20px">{name}</FontBold>
      </Top>

      <div className="scrollable-area">
        {/* 📌 주요 재료 */}
        <div className="main-ingredients">
          <FontBold size="14px">주요 재료</FontBold>
          <FontMedium size="13px">{mainIng}</FontMedium>
        </div>

        {/* 📌 내가 가진 재료 */}
        <div className="my-ingredients">
          <FontBold size="14px">내가 가진 재료</FontBold>

          <List
            isEditing={false}
            isDeletable={false}
            list={ingredients}
            isIconEditable={false}
          />
        </div>

        {/* 📌 조리법 */}
        {instructions && (
          <div className="section">
            <FontBold size="14px">조리법</FontBold>
            <ul className="list">
              {instructions.map((step, idx) => (
                <li key={idx}>
                  <FontMedium size="12px">{step}</FontMedium>
                  </li>
                ))}
                </ul>
                </div>
              )}


        {/* 📌 이 요리의 장점 */}
        {advantage && (
          <div className="section">
            <FontBold size="14px">장점</FontBold>
            <ul className="list">
              {advantage.map((item, idx) => (
                <li key={idx}>
                  <FontMedium size="13px">{item}</FontMedium>
                  </li>
                ))}
                </ul>
                </div>
              )}


        {/* 📌 관련 영상 */}
        <div className="video">
          <FontBold size="14px">조리 영상</FontBold>
          <iframe
          className="youtube"
          src="https://www.youtube.com/embed/jL4CfRfnm1c"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          ></iframe>
          </div>
      </div>

      <Bottom>
        <LongBtn
          text="메뉴 확정하기"
          onClick={() => navigate(`/recipes/${recipeId}/ingredients`)}
        />
      </Bottom>
    </Div>
  );
};

export default Drawer;

const Div = styled.div`
  z-index: 1;
  display: flex;
  width: 100%;
  max-width: 375px;
  margin: 0 auto;
  height: 70%;
  padding: 20px;
  box-sizing: border-box;
  flex-shrink: 0;

  flex-direction: column;
  align-items: center;
  gap: 20px;

  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

  border-radius: 25px 25px 0px 0px;
  background: #fff;
  box-shadow: 0px -20px 10px 0px rgba(138, 138, 138, 0.35);

  .scrollable-area {
    width: 100%;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 30px;
  }

  .main-ingredients {
    width: 100%;
    padding-left: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  .my-ingredients {
    width: 95%;
    padding-left: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 10px;
  }

  .section {
    width: 100%;
    padding-left: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 10px;
  }

  .list {
  list-style-type: disc;
  padding-left: 20px;
  margin-top: 0px;
  }
  
  .list li {
  text-align: left;
  margin-bottom: 2px;
  }
  .list li * {
  text-align: left;  /* ✅ <FontMedium> 내부도 왼쪽 정렬되도록 강제 */
  }


  .video {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 10px;
    width: 100%;
    margin-bottom: 50px;
    padding-left: 20px;
    box-sizing: border-box;

    .youtube {
      width: 95%;
    }
  }
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;

  img {
    width: 23px;
    height: 23px;
  }
`;

const Bottom = styled.div`
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;











