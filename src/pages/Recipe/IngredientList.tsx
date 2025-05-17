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























/*
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
    { ingredientId: 1, name: "링귀니 파스타 1인분(120g)", amount: 1, price: 7300, iconId: 1 },
    { ingredientId: 2, name: "양파", amount: 0.5, price: 3500, iconId: 2 },
    { ingredientId: 3, name: "올리브", amount: 15, price: 10400, iconId: 3 },
    { ingredientId: 4, name: "파마산치즈", amount: 1, price: 7500, iconId: 4 },
    { ingredientId: 5, name: "토마토홀 1캔(400g)", amount: 1, price: 5140, iconId: 5 },
  ];

  const [ingredientList, setIngredientList] = useState<TypeIngredient[]>([]);

  useEffect(() => {
    setIngredientList(mockIngredients);
  }, []);

  return (
    <Div>
      <Header isBack={true} />
      <GuideText text="사용할 재료와 수량을 선택하세요" />


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




















/*
import LongBtn from "@components/Buttons/LongBtn";
import GuideText from "@components/Common/GuideText";
import Header from "@components/Header/Header";
import List from "@components/Ingredients/List/List";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { TypeIngredient } from "type/ingredients";

const IngredientList = () => {
  const [ingredientList, setIngredientList] = useState<TypeIngredient[]>([]);
  const [maxAmountList, setMaxAmountList] = useState<{ amount: number }[]>([]);

  // ✅ 테스트용 mock 데이터
  const mockIngredients: TypeIngredient[] = [
    { ingredientId: 1, name: "토마토", amount: 2, price: 1000, iconId: 1 },
    { ingredientId: 2, name: "파스타면", amount: 1, price: 2000, iconId: 2 },
    { ingredientId: 3, name: "올리브오일", amount: 1, price: 1500, iconId: 3 },
  ];

  useEffect(() => {
    const initList = mockIngredients.map(el => ({ ...el, amount: 0 }));
    const initMax = mockIngredients.map(el => ({ amount: el.amount }));

    setIngredientList(initList);
    setMaxAmountList(initMax);
  }, []);

  const handleComplete = () => {
    const selected = ingredientList.filter(item => item.amount > 0);
    if (selected.length === 0) {
      alert("하나 이상의 재료를 선택해주세요!");
      return;
    }

    alert("선택된 재료:\n" + selected.map(i => `${i.name} x ${i.amount}`).join("\n"));
  };

  return (
    <Div>
      <Header isBack={true} />
      <GuideText text="사용할 재료와 수량을 선택하세요" />

      <List
        isEditing={true}
        isDeletable={false}
        list={ingredientList}
        maxAmountList={maxAmountList}
        isIconEditable={false}
      />

      <div className="margin" style={{ height: "90px" }} />

      <div className="bottom">
        <LongBtn text="선택 완료" onClick={handleComplete} />
      </div>
    </Div>
  );
};

export default IngredientList;

const Div = styled.div`
  width: 100%;
  max-width: 375px;
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #fff;

  .bottom {
    width: 100%;
    max-width: 375px;
    position: fixed;
    bottom: 0px;
    padding: 30px;
    display: flex;
    justify-content: center;

    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
  }
`;













/*
import LongBtn from "@components/Buttons/LongBtn";
import GuideText from "@components/Common/GuideText";
import Header from "@components/Header/Header";
import List from "@components/Ingredients/List/List";
import { myListState, newListState } from "@services/store/ingredients";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { TypeIngredient } from "type/ingredients";

const IngredientList = () => {
  const navigate = useNavigate();
  const { name, id } = useParams();
  let param: string;
  if (name) {
    param = name; //직접 입력 레시피
  } else {
    param = String(id); //제공된 레시피
  }
  const myList = useRecoilValue(myListState);
  const [maxAmountList, setMaxAmountList] = useState([]) as any[];
  const [newList, setNewList] = useRecoilState(newListState);

  useEffect(() => {
    //수량을 0으로 초기화
    setNewList([]);
    myList.map((el: TypeIngredient) => {
      setMaxAmountList((prev: any[]) => [...prev, { amount: el.amount }]);
      setNewList((prev: any[]) => [...prev, { ...el, amount: 0 }]);
    });
  }, []);

  return (
    <Div>
      <Header isBack={true} />
      <GuideText text="사용할 재료와 수량을 선택하세요" />

      <List
        isEditing={true}
        isDeletable={false}
        list={newList}
        maxAmountList={maxAmountList}
        isIconEditable={false}
      />
      <div className="margin" style={{ height: "90px" }} />

      <div className="bottom">
        <LongBtn
          text="선택 완료"
          onClick={() =>
            name
              ? navigate(`/recipes/new/${param}/confirmation`)
              : navigate(`/recipes/${param}/confirmation`)
          }
        />
      </div>
    </Div>
  );
};

export default IngredientList;

const Div = styled.div`
  width: 100%;
  max-width: 375px;
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: red;

  .bottom {
    width: 100%;
    max-width: 375px;
    position: fixed;
    bottom: 0px;
    padding: 30px;
    display: flex;
    justify-content: center;
    
    left: 50%;
    transform: translateX(-50%);
  }
`;
*/
