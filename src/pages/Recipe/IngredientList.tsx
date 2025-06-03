import LongBtn from "@components/Buttons/LongBtn";
import GuideText from "@components/Common/GuideText";
import Header from "@components/Header/Header";
import List from "@components/Ingredients/List/List";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { TypeIngredient } from "type/ingredients";
import { useEffect, useState } from "react";

const IngredientList = () => {
  const navigate = useNavigate();

  // ✅ 화면 표시용 mock 리스트
  const mockIngredients: TypeIngredient[] = [
    { ingredientId: 1, name: "링귀니 파스타", amount: 1, price: 7300, iconId: 21 },
    { ingredientId: 2, name: "양파", amount: 1, price: 3300, iconId: 3 },
    { ingredientId: 3, name: "올리브", amount: 15, price: 10400, iconId: 17 },
    { ingredientId: 4, name: "양송이 버섯", amount: 1, price: 0, iconId: 10 },
    { ingredientId: 5, name: "한살림 스파게티소스", amount: 1, price: 0, iconId: 16 },
  ];

  const [ingredientList, setIngredientList] = useState<TypeIngredient[]>([]);

  useEffect(() => {
    setIngredientList(mockIngredients);
  }, []);

  return (
    <Div>
      <Header isBack={true} />
      <GuideText text="사용할 재료와 수량을 선택하세요" />

      {/* ✅ 재료 리스트를 가운데 정렬하기 위한 래퍼 */}
      <ListWrapper>
        <List
          isEditing={true}
          isDeletable={false}
          list={ingredientList}
          isIconEditable={false}
        />
      </ListWrapper>

      <div className="margin" style={{ height: "90px" }} />

      <div className="bottom">
        <LongBtn
          text="선택 완료"
          onClick={() => navigate("/recipes")}
        />
      </div>
    </Div>
  );
};

export default IngredientList;

// ✅ 전체 페이지 레이아웃
const Div = styled.div`
  width: 100%;
  max-width: 375px;
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #fdf4dc;

  .bottom {
    width: 90%;
    max-width: 315px;
    margin: 0 auto;
    position: fixed;
    bottom: 0px;
    padding: 30px 0;
    display: flex;
    justify-content: center;
    background-color: #fdf4dc;
    left: 50%;
    transform: translateX(-50%);
  }
`;

// ✅ 리스트 가운데 정렬을 위한 스타일
const ListWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;



















