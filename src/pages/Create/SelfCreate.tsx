import FitBtn from "@components/Buttons/FitBtn";
import LongBtn from "@components/Buttons/LongBtn";
import Header from "@components/Header/Header";
import ItemInput from "@components/Ingredients/Item/ItemInput";
import List from "@components/Ingredients/List/List";
import { newListState } from "@services/store/ingredients";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { TypeIngredient } from "type/ingredients";

const SelfCreate = () => {
  const [newList, setNewList] = useRecoilState(newListState);
  const [inputs, setInputs] = useState<TypeIngredient>({
    iconId: 1,
    name: "",
    price: 0,
    amount: 1,
    ingredientId: 0,
  });
  const navigate = useNavigate();

  // ✅ 이름 → iconId 매핑
  const nameToIconId: Record<string, number> = {
    "달걀": 6,
    "대파": 29,
    "참치캔": 14,
    "두부": 20,
    "떡": 5,
    "링귀니 파스타": 21,
    "올리브": 17,
    "어묵": 28
  };

  // ✅ 이름이 바뀔 때 자동 iconId 설정
  useEffect(() => {
    const matchedIconId = nameToIconId[inputs.name.trim()];
    if (matchedIconId) {
      setInputs(prev => ({ ...prev, iconId: matchedIconId }));
    }
  }, [inputs.name]);

  const addNewItem = () => {
    if (inputs.name === "" || inputs.price === undefined || inputs.amount === 0) return;

    setNewList((prev: TypeIngredient[]) => [
      ...prev,
      { ...inputs, ingredientId: Math.random() },
    ]);

    setInputs({
      iconId: 1,
      name: "",
      price: 0,
      amount: 1,
      ingredientId: 0,
    });
  };

  const requestSelfCreate = () => {
    if (newList.length > 0) {
      const existing = localStorage.getItem("tempIngredients");
      let mergedList: TypeIngredient[] = [];

      try {
        const parsed: TypeIngredient[] = existing ? JSON.parse(existing) : [];
        const updated = [...parsed];

        newList.forEach((newItem: TypeIngredient) => {
          const matchIndex = updated.findIndex(
            item => item.name === newItem.name && item.price === newItem.price
          );

          if (matchIndex !== -1) {
            updated[matchIndex].amount += newItem.amount;
          } else {
            updated.push(newItem);
          }
        });

        mergedList = updated;
      } catch (err) {
        console.error("병합 실패:", err);
        mergedList = [...newList];
      }

      localStorage.setItem("tempIngredients", JSON.stringify(mergedList));
      alert("등록이 완료되었습니다.");
      navigate("/statistics");
      setNewList([]);
    } else {
      alert("등록할 식재료가 없습니다.");
    }
  };

  useEffect(() => {
    setNewList([]);
  }, []);

  return (
    <Div>
      <Header isBack={true} title=" " />

      <ContentWrapper>
        <div className="input">
          <ItemInput inputs={inputs} setInputs={setInputs} />
        </div>

        <div className="btn">
          <AddButton onClick={addNewItem}>추가하기</AddButton>
        </div>

        <div className="margin">
          <List
            isEditing={false}
            isDeletable={true}
            list={newList}
            isIconEditable={false}
          />
        </div>
      </ContentWrapper>

      <div className="bottom">
        <LongBtn text="등록 완료" onClick={requestSelfCreate} />
      </div>
    </Div>
  );
};

export default SelfCreate;

/* 💅 스타일은 그대로 유지 */

const Div = styled.div`
  width: 375px;
  margin: 0 auto;
  position: relative;
  background-color: #fdf4dc;
  min-height: 100vh;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  width: 100%;
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  padding-bottom: 200px;
  box-sizing: border-box;
  background-color: #fdf4dc0;

  .input {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .btn {
    width: 100%;
    margin: 11px auto 25px;
    display: flex;
    flex-direction: column;
    align-items: end;
  }

  .margin {
    margin-bottom: 120px;
    width: 100%;
  }
`;

const Bottom = styled.div`
  width: 100%;
  padding: 0 20px;
  padding-bottom: 40px;
  display: flex;
  justify-content: center;
  background-color: #fff;

  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
  box-sizing: border-box;
`;

const AddButton = styled.button`
  background-color: #FFD880;
  color: #3d3d3d;
  font-weight: bold;
  padding: 10px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background-color: #ff7a30;
  }
`;




















/*
import FitBtn from "@components/Buttons/FitBtn";
import LongBtn from "@components/Buttons/LongBtn";
import Header from "@components/Header/Header";
import ItemInput from "@components/Ingredients/Item/ItemInput";
import List from "@components/Ingredients/List/List";
// import { postIngredientsTyping } from "@services/api/ingredients"; ✅ 주석 처리
import { newListState } from "@services/store/ingredients";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { TypeIngredient } from "type/ingredients";

const SelfCreate = () => {
  const [newList, setNewList] = useRecoilState(newListState);
  const [inputs, setInputs] = useState<TypeIngredient>({
    iconId: 1,
    name: "",
    price: 0,
    amount: 1,
    ingredientId: 0,
  });
  const navigate = useNavigate();

  const addNewItem = () => {
    if (inputs.name === "" || inputs.price === undefined || inputs.amount === 0) return;

    setNewList((prev: TypeIngredient[]) => [
      ...prev,
      { ...inputs, ingredientId: Math.random() },
    ]);

    // 입력창 초기화
    setInputs({
      iconId: 1,
      name: "",
      price: 0,
      amount: 1,
      ingredientId: 0,
    });
  };

  const requestSelfCreate = () => {
    if (newList.length > 0) {
      const existing = localStorage.getItem("tempIngredients");
      let mergedList: TypeIngredient[] = [];
  
      try {
        const parsed: TypeIngredient[] = existing ? JSON.parse(existing) : [];
  
        // 기존 목록 복사
        const updated = [...parsed];
  
        newList.forEach((newItem: TypeIngredient) => {
          const matchIndex = updated.findIndex(
            item => item.name === newItem.name && item.price === newItem.price
          );
  
          if (matchIndex !== -1) {
            // 동일한 항목이 있다면 수량만 더하기
            updated[matchIndex].amount += newItem.amount;
          } else {
            // 없다면 새 항목 추가
            updated.push(newItem);
          }
        });
  
        mergedList = updated;
      } catch (err) {
        console.error("병합 실패:", err);
        mergedList = [...newList];
      }
  
      localStorage.setItem("tempIngredients", JSON.stringify(mergedList));
      alert("등록이 완료되었습니다.");
      navigate("/statistics");
      setNewList([]);
    } else {
      alert("등록할 식재료가 없습니다.");
    }
  };
  

  useEffect(() => {
    setNewList([]); // ✅ 초기엔 아무것도 안 보이게
  }, []);

  return (
    <Div>
      <Header isBack={true} title="식재료 등록" />

      <ContentWrapper>
        <div className="input">
          <ItemInput inputs={inputs} setInputs={setInputs} />
        </div>

        <div className="btn">
          <AddButton onClick={addNewItem}>추가하기</AddButton>
        </div>

        <div className="margin">
          <List
            isEditing={false}
            isDeletable={true}
            list={newList}
            isIconEditable={false}
          />
        </div>
      </ContentWrapper>

      <div className="bottom">
        <LongBtn text="등록 완료" onClick={requestSelfCreate} />
      </div>
    </Div>
  );
};

export default SelfCreate;

// 💅 스타일은 그대로 유지
const Div = styled.div`
  width: 375px;
  margin: 0 auto;
  position: relative;
  background-color: red;
  min-height: 100vh;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  width: 100%;
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  padding-bottom: 200px;
  box-sizing: border-box;
  background-color: black;

  .input {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .btn {
    width: 100%;
    margin: 11px auto 25px;
    display: flex;
    flex-direction: column;
    align-items: end;
  }

  .margin {
    margin-bottom: 120px;
    width: 100%;
  }
`;

const Bottom = styled.div`
  width: 100%;
  padding: 0 20px;
  padding-bottom: 40px;
  display: flex;
  justify-content: center;
  background-color: #fff;

  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
  box-sizing: border-box;
`;

const AddButton = styled.button`
  background-color: rgb(255, 198, 65);
  color: #3d3d3d;
  font-weight: bold;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #ff7a30;
  }
`;

















/*
import FitBtn from "@components/Buttons/FitBtn";
import LongBtn from "@components/Buttons/LongBtn";
import Header from "@components/Header/Header";
import ItemInput from "@components/Ingredients/Item/ItemInput";
import List from "@components/Ingredients/List/List";
// import { postIngredientsTyping } from "@services/api/ingredients"; ✅ 주석 처리
import { newListState } from "@services/store/ingredients";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { TypeIngredient } from "type/ingredients";

const SelfCreate = () => {
  const [newList, setNewList] = useRecoilState(newListState);
  const [inputs, setInputs] = useState<TypeIngredient>({
    iconId: 1,
    name: "",
    price: 0,
    amount: 1,
    ingredientId: 0,
  });
  const navigate = useNavigate();

  const addNewItem = () => {
    if (inputs.name === "" || inputs.price === undefined || inputs.amount === 0) return;

    setNewList((prev: TypeIngredient[]) => [
      ...prev,
      { ...inputs, ingredientId: Math.random() },
    ]);

    // 입력창 초기화
    setInputs({
      iconId: 1,
      name: "",
      price: 0,
      amount: 1,
      ingredientId: 0,
    });
  };

  const requestSelfCreate = () => {
    if (newList.length > 0) {
      // ✅ 백엔드 없이 테스트용 저장
      localStorage.setItem("tempIngredients", JSON.stringify(newList));
      alert("등록이 완료되었습니다.");
      navigate("/statistics");
      setNewList([]);
    } else {
      alert("등록할 식재료가 없습니다.");
    }
  };

  useEffect(() => {
    setNewList([]); // ✅ 초기엔 아무것도 안 보이게
  }, []);

  return (
    <Div>
      <Header isBack={true} title="식재료 등록" />

      <ContentWrapper>
        <div className="input">
          <ItemInput inputs={inputs} setInputs={setInputs} />
        </div>

        <div className="btn">
          <AddButton onClick={addNewItem}>추가하기</AddButton>
        </div>

        <div className="margin">
          <List
            isEditing={true}
            isDeletable={true}
            list={newList}
            isIconEditable={true}
          />
        </div>
      </ContentWrapper>

      <div className="bottom">
        <LongBtn text="등록 완료" onClick={requestSelfCreate} />
      </div>
    </Div>
  );
};

export default SelfCreate;

const Div = styled.div`
  width: 375px;
  margin: 0 auto;
  position: relative;
  background-color: red;
  min-height: 100vh;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  width: 100%;
  flex: 1;
  padding: 20px;
  padding-bottom: 200px;
  box-sizing: border-box;
  overflow-y: auto;
  background-color: black;

  .input {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .btn {
    width: 100%;
    margin: 11px auto 25px;
    display: flex;
    flex-direction: column;
    align-items: end;
  }

  .margin {
    margin-bottom: 120px;
    width: 100%;
  }
`;

const Bottom = styled.div`
  width: 100%;
  padding: 0 20px;
  padding-bottom: 40px;
  display: flex;
  justify-content: center;
  background-color: #fff;
  margin-top: auto;
  margin-bottom: 40px;
  box-sizing: border-box;
`;

const AddButton = styled.button`
  background-color: rgb(255, 198, 65);
  color: #3d3d3d;
  font-weight: bold;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #ff7a30;
  }
`;


















/* 백엔드 연결버전일수도?
import FitBtn from "@components/Buttons/FitBtn";
import LongBtn from "@components/Buttons/LongBtn";
import Header from "@components/Header/Header";
import ItemInput from "@components/Ingredients/Item/ItemInput";
import List from "@components/Ingredients/List/List";
import { postIngredientsTyping } from "@services/api/ingredients";
import { newListState } from "@services/store/ingredients";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { TypeIngredient } from "type/ingredients";

const SelfCreate = () => {
  const [newList, setNewList] = useRecoilState(newListState);
  const [inputs, setInputs] = useState<TypeIngredient>({
    iconId: 1,
    name: "",
    price: 0,
    amount: 1,
    ingredientId: 0,
  });
  const navigate = useNavigate();

  const addNewItem = () => {
    if (inputs.name === "" || inputs.price === undefined || inputs.amount === 0) return;

    setNewList((prev: TypeIngredient[]) => [
      ...prev,
      { ...inputs, ingredientId: Math.random() },
    ]);

    // 입력창 초기화
    setInputs({
      iconId: 1,
      name: "",
      price: 0,
      amount: 1,
      ingredientId: 0,
    });
  };

  const requestSelfCreate = () => {
    postIngredientsTyping(newList)
      .then(() => {
        alert("등록이 완료되었습니다.");
        navigate("/statistics"); // ➡️ 이동 페이지
        setNewList([]);
      })
      .catch(() => alert("등록 오류"));
  };

  useEffect(() => {
    setNewList([]); // ✅ 초기엔 아무것도 안 보여야 하므로 비워줌
  }, []);

  return (
    <Div>
      <Header isBack={true} title="식재료 등록" />

      <ContentWrapper>
        <div className="input">
          <ItemInput inputs={inputs} setInputs={setInputs} />
        </div>

        <div className="btn">
          <AddButton onClick={addNewItem}>추가하기</AddButton>
        </div>

        <div className="margin">
          <List
            isEditing={true}
            isDeletable={true}
            list={newList}
            isIconEditable={true}
          />
        </div>
      </ContentWrapper>

      <div className="bottom">
        <LongBtn text="등록 완료" onClick={requestSelfCreate} />
      </div>
    </Div>
  );
};

export default SelfCreate;

const Div = styled.div`
  width: 375px;
  margin: 0 auto;
  position: relative;
  background-color: red;
  min-height: 100vh;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  width: 100%;
  flex: 1;
  padding: 20px;
  padding-bottom: 200px;
  box-sizing: border-box;
  overflow-y: auto; // ✅ 추가
  background-color: black;

  .input {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .btn {
    width: 100%;
    margin: 11px auto 25px;
    display: flex;
    flex-direction: column;
    align-items: end;
  }

  .margin {
    margin-bottom: 120px;
    width: 100%;
  }
`;

const Bottom = styled.div`
  width: 100%;
  padding: 0 20px;
  padding-bottom: 40px;
  display: flex;
  justify-content: center;
  background-color: #fff;
  margin-top: auto;
  margin-bottom: 40px

  
  box-sizing: border-box;
`;


const AddButton = styled.button`
  background-color:rgb(255, 198, 65);
  color: #3D3D3D;
  font-weight: bold;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #ff7a30;
  }
`;
*/


















/*
import FitBtn from "@components/Buttons/FitBtn";
import LongBtn from "@components/Buttons/LongBtn";
import Header from "@components/Header/Header";
import ItemInput from "@components/Ingredients/Item/ItemInput";
import List from "@components/Ingredients/List/List";
import { postIngredientsTyping } from "@services/api/ingredients";
import { newListState } from "@services/store/ingredients";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { TypeIngredient } from "type/ingredients";

//식재료를 직접 등록하는 페이지
const SelfCreate = () => {
  const [newList, setNewList] = useRecoilState(newListState);
  const [inputs, setInputs] = useState<TypeIngredient>({
    iconId: 1,
    name: "",
    price: 0,
    amount: 1,
    ingredientId: 0,
  });
  const navigate = useNavigate();

  const addNewItem = () => {
    if (inputs.name === "" || inputs.price === undefined || inputs.amount === 0)
      return;

    setNewList((prev: TypeIngredient[]) => [
      ...prev,
      { ...inputs, ingredientId: Math.random() },
    ]);

    setInputs({
      iconId: 1,
      name: "",
      price: 0,
      amount: 1,
      ingredientId: 0,
    });
  };

  const requestSelfCreate = () => {
    postIngredientsTyping(newList)
      .then(res => {
        alert("등록이 완료되었습니다.");
        navigate("/statistics");
        setNewList([]);
      })
      .catch(err => alert("등록 오류"));
  };

  useEffect(() => {
    //초기화
    setNewList([]);
  }, []);

  return (
    <Div>
      <Header isBack={true} title="식재료 등록" />

      <ContentWrapper>
        <div className="input">
          <ItemInput inputs={inputs} setInputs={setInputs} />
        </div>

        <div className="btn">
          <FitBtn text="추가하기" onClick={addNewItem} />
        </div>

        <div className="margin">
          <List
            isEditing={true}
            isDeletable={true}
            list={newList}
            isIconEditable={true}
          />
        </div>
      </ContentWrapper>

      <Bottom>
        <StyledButton>
          <LongBtn text="등록 완료" onClick={requestSelfCreate} />
        </StyledButton>
      </Bottom>
    </Div>
  );
};

export default SelfCreate;

const Div = styled.div`
  width: 375px;
  margin: 0 auto;
  position: relative;
  background-color: white;
  min-height: 100vh;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  width: 100%;
  flex: 1;
  padding: 20px;
  padding-bottom: 100px;
  box-sizing: border-box;

  .input {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .btn {
    width: 100%;
    margin: 11px auto 25px;
    display: flex;
    flex-direction: column;
    align-items: end;
  }

  .margin {
    margin-bottom: 120px;
    width: 100%;
  }
`;

const Bottom = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  background-color: #fff;
  position: fixed;
  bottom: 20px;
  box-sizing: border-box;
`;

const StyledButton = styled.div`
  width: 90%;
`;
*/













/*
import FitBtn from "@components/Buttons/FitBtn";
import LongBtn from "@components/Buttons/LongBtn";
import Header from "@components/Header/Header";
import ItemInput from "@components/Ingredients/Item/ItemInput";
import List from "@components/Ingredients/List/List";
import { postIngredientsTyping } from "@services/api/ingredients";
import { newListState } from "@services/store/ingredients";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { TypeIngredient } from "type/ingredients";

//식재료를 직접 등록하는 페이지
const SelfCreate = () => {
  const [newList, setNewList] = useRecoilState(newListState);
  const [inputs, setInputs] = useState<TypeIngredient>({
    iconId: 1,
    name: "",
    price: 0,
    amount: 1,
    ingredientId: 0,
  });
  const navigate = useNavigate();

  const addNewItem = () => {
    if (inputs.name === "" || inputs.price === undefined || inputs.amount === 0)
      return;

    setNewList((prev: TypeIngredient[]) => [
      ...prev,
      { ...inputs, ingredientId: Math.random() },
    ]);

    setInputs({
      iconId: 1,
      name: "",
      price: 0,
      amount: 1,
      ingredientId: 0,
    });
  };

  const requestSelfCreate = () => {
    postIngredientsTyping(newList)
      .then(res => {
        alert("등록이 완료되었습니다.");
        navigate("/main");
        setNewList([]);
      })
      .catch(err => alert("등록 오류"));
  };

  useEffect(() => {
    //초기화
    setNewList([]);
  }, []);

  return (
    <Div>
      <Header isBack={true} title="식재료 등록" />

      <div className="input">
        <ItemInput inputs={inputs} setInputs={setInputs} />
      </div>

      <div className="btn">
        <FitBtn text="추가하기" onClick={addNewItem} />
      </div>

      <div className="margin">
        <List
          isEditing={true}
          isDeletable={true}
          list={newList}
          isIconEditable={true}
        />
      </div>

      <div className="bottom">
        <LongBtn text="등록 완료" onClick={requestSelfCreate} />
      </div>
    </Div>
  );
};

export default SelfCreate;

const Div = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .input {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .btn {
    width: 90%;
    margin: 11px auto 25px;
    display: flex;
    flex-direction: column;
    align-items: end;
  }

  .margin {
    margin-bottom: 120px;
    width: 100%;
  }

  .bottom {
    width: 100%;
    position: fixed; //하단 고정
    bottom: 0px;
    padding: 30px;
    display: flex;
    justify-content: center;
    background-color: #fff;
  }
`;
*/