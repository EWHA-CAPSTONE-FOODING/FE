import icon1 from "@assets/ingredients/icon1.png";
import styled from "styled-components";
import { IconList, icons } from "./IconList";
import { FontBold, FontRegular } from "@style/font.style";
import { useState } from "react";
import { TypeIngredient } from "type/ingredients";

type Props = {
  inputs: TypeIngredient;
  setInputs?: React.Dispatch<React.SetStateAction<TypeIngredient>>;
  isList?: boolean;
  setInputList?: React.Dispatch<React.SetStateAction<TypeIngredient[]>>;
  inputList?: TypeIngredient[];
};

const ItemInput = ({
  inputs,
  setInputs,
  isList,
  setInputList,
  inputList,
}: Props) => {
  const [isOpenList, setIsOpenList] = useState(false);
  const { ingredientId, iconId, name, price, amount } = inputs;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const nextInputs = {
      ...inputs,
      [name]: value,
    };

    if (isList) {
      if (inputList) {
        const newArray = [...inputList];

        const indexToModify = newArray.findIndex(
          item => item.ingredientId === ingredientId,
        );

        if (indexToModify !== -1) {
          newArray[indexToModify] = nextInputs;
          setInputList && setInputList(newArray);
        }
      }
    } else {
      setInputs && setInputs(nextInputs);
    }
  };

  const handlePlus = () => {
    const nextInputs = {
      ...inputs,
      amount: amount + 0.25,
    };

    if (isList) {
      if (inputList) {
        const newArray = [...inputList];

        const indexToModify = newArray.findIndex(
          item => item.ingredientId === ingredientId,
        );

        if (indexToModify !== -1) {
          newArray[indexToModify] = nextInputs;
          setInputList && setInputList(newArray);
        }
      }
    } else {
      setInputs && setInputs(nextInputs);
    }
  };

  const handleMinus = () => {
    if (amount === 0.25) return;

    const nextInputs = {
      ...inputs,
      amount: amount - 0.25,
    };

    if (isList) {
      if (inputList) {
        const newArray = [...inputList];

        const indexToModify = newArray.findIndex(
          item => item.ingredientId === ingredientId,
        );

        if (indexToModify !== -1) {
          newArray[indexToModify] = nextInputs;
          setInputList && setInputList(newArray);
        }
      }
    } else {
      setInputs && setInputs(nextInputs);
    }
  };

  return (
    <Div>
      <div className="left-container">
        <img
          className="icon"
          src={iconId && icons[iconId - 1]}
          onClick={() => {
            setIsOpenList(!isOpenList);
          }}
        />

        <Detail>
          <input
            name="name"
            className="name"
            placeholder="재료명을 입력하세요"
            value={name}
            onChange={handleChange}
          />

          <input
            type="number"
            name="price"
            className="price"
            placeholder="가격을 입력하세요"
            value={price || "가격을 입력하세요"}
            onChange={handleChange}
          />
        </Detail>
      </div>

      <CountWrapper>
        <div className="minus" onClick={handleMinus}>
          <FontRegular size="20px">-</FontRegular>
        </div>

        <Count>
          <FontBold size="12px">{amount}</FontBold>
        </Count>

        <div className="plus" onClick={handlePlus}>
          <FontRegular size="20px">+</FontRegular>
        </div>
      </CountWrapper>


      {isOpenList && (
        <div className="icon-list">
          {isList ? (
            <IconList
              setIsOpenList={setIsOpenList}
              ingredientId={ingredientId}
            />
          ) : (
            <IconList
              inputs={inputs}
              setInputs={setInputs}
              ingredientId={ingredientId}
              setIsOpenList={setIsOpenList}
            />
          )}
        </div>
      )}
    </Div>
  );
};

export default ItemInput;



const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f7f7f8;
  color: #999;
  padding: 14px 18px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  margin-bottom: 12px;
  box-sizing: border-box;
  gap: 8px;
  position: relative;

  .icon {
    width: 50px;
  }

  .icon-list {
    position: absolute;
    top: 10px;
    left: 70px;
    z-index: 1;
  }

  .left-container {
    display: flex;
    gap: 15px;
  }
`;



const Detail = styled.div`
  height: 57px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 10px;
  

  input {
    border: none;
    outline: none;
    background-color: var(--grey1);
    font-family: Noto Sans KR;
  }

  .price {
    width: 90%;
    color: var(--grey2);


    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  .name {
    width: 90%;

    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-top: 4px;
  }
`;

const Count = styled.div`
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  border-radius: 40px;
  background-color: #fff;

  line-height: 27px;
`;

const CountWrapper = styled.div`
  width: 58px;
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;

  .minus {
    margin-bottom: 5px;
  }
`;







/*
import icon1 from "@assets/ingredients/icon1.png";
import styled from "styled-components";
import { IconList, icons } from "./IconList";
import { FontBold, FontRegular } from "@style/font.style";
import { useState } from "react";
import { TypeIngredient } from "type/ingredients";

type Props = {
  inputs: TypeIngredient;
  setInputs?: React.Dispatch<React.SetStateAction<TypeIngredient>>;
  isList?: boolean;
  setInputList?: React.Dispatch<React.SetStateAction<TypeIngredient[]>>;
  inputList?: TypeIngredient[];
};

const ItemInput = ({
  inputs,
  setInputs,
  isList,
  setInputList,
  inputList,
}: Props) => {
  const [isOpenList, setIsOpenList] = useState(false);
  const { ingredientId, iconId, name, price, amount } = inputs;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const nextInputs = {
      ...inputs,
      [name]: value,
    };

    if (isList) {
      if (inputList) {
        const newArray = [...inputList];

        const indexToModify = newArray.findIndex(
          item => item.ingredientId === ingredientId,
        );

        if (indexToModify !== -1) {
          newArray[indexToModify] = nextInputs;
          setInputList && setInputList(newArray);
        }
      }
    } else {
      setInputs && setInputs(nextInputs);
    }
  };

  const handlePlus = () => {
    const nextInputs = {
      ...inputs,
      amount: amount + 0.25,
    };

    if (isList) {
      if (inputList) {
        const newArray = [...inputList];

        const indexToModify = newArray.findIndex(
          item => item.ingredientId === ingredientId,
        );

        if (indexToModify !== -1) {
          newArray[indexToModify] = nextInputs;
          setInputList && setInputList(newArray);
        }
      }
    } else {
      setInputs && setInputs(nextInputs);
    }
  };

  const handleMinus = () => {
    if (amount === 0.25) return;

    const nextInputs = {
      ...inputs,
      amount: amount - 0.25,
    };

    if (isList) {
      if (inputList) {
        const newArray = [...inputList];

        const indexToModify = newArray.findIndex(
          item => item.ingredientId === ingredientId,
        );

        if (indexToModify !== -1) {
          newArray[indexToModify] = nextInputs;
          setInputList && setInputList(newArray);
        }
      }
    } else {
      setInputs && setInputs(nextInputs);
    }
  };

  return (
    <Div>
      <div className="left-container">
        <img
          className="icon"
          src={iconId && icons[iconId - 1]}
          onClick={() => {
            setIsOpenList(!isOpenList);
          }}
        />

        <Detail>
          <input
            name="name"
            className="name"
            placeholder="재료명을 입력하세요"
            value={name}
            onChange={handleChange}
          />

          <input
            type="number"
            name="price"
            className="price"
            placeholder="가격을 입력하세요"
            value={price || "가격을 입력하세요"}
            onChange={handleChange}
          />
        </Detail>
      </div>

      <CountWrapper>
        <div className="minus" onClick={handleMinus}>
          <FontRegular size="20px">-</FontRegular>
        </div>

        <Count>
          <FontBold size="12px">{amount}</FontBold>
        </Count>

        <div className="plus" onClick={handlePlus}>
          <FontRegular size="20px">+</FontRegular>
        </div>
      </CountWrapper>


      {isOpenList && (
        <div className="icon-list">
          {isList ? (
            <IconList
              setIsOpenList={setIsOpenList}
              ingredientId={ingredientId}
            />
          ) : (
            <IconList
              inputs={inputs}
              setInputs={setInputs}
              ingredientId={ingredientId}
              setIsOpenList={setIsOpenList}
            />
          )}
        </div>
      )}
    </Div>
  );
};

export default ItemInput;



const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f7f7f8;
  color: #999;
  padding: 14px 18px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  margin-bottom: 12px;
  box-sizing: border-box;
  gap: 8px;
  position: relative;

  .icon {
    width: 50px;
  }

  .icon-list {
    position: absolute;
    top: 10px;
    left: 70px;
    z-index: 1;
  }

  .left-container {
    display: flex;
    gap: 15px;
  }
`;



const Detail = styled.div`
  height: 57px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 2px;

  input {
    border: none;
    outline: none;
    background-color: var(--grey1);
    font-family: Noto Sans KR;
  }

  .price {
    width: 90%;
    color: var(--grey2);

    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  .name {
    width: 90%;

    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

const Count = styled.div`
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  border-radius: 40px;
  background-color: #fff;

  line-height: 27px;
`;

const CountWrapper = styled.div`
  width: 58px;
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;

  .minus {
    margin-bottom: 5px;
  }
`;
*/
















/*
import icon1 from "@assets/ingredients/icon1.png";
import styled from "styled-components";
import { IconList, icons } from "./IconList";
import { FontBold, FontRegular } from "@style/font.style";
import { useState } from "react";
import { TypeIngredient } from "type/ingredients";

type Props = {
  inputs: TypeIngredient;
  setInputs?: React.Dispatch<React.SetStateAction<TypeIngredient>>;
  isList?: boolean;
  setInputList?: React.Dispatch<React.SetStateAction<TypeIngredient[]>>;
  inputList?: TypeIngredient[];
};

const ItemInput = ({
  inputs,
  setInputs,
  isList,
  setInputList,
  inputList,
}: Props) => {
  const [isOpenList, setIsOpenList] = useState(false);
  const { ingredientId, iconId, name, price, amount } = inputs;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const nextInputs = {
      ...inputs,
      [name]: value,
    };

    if (isList) {
      if (inputList) {
        const newArray = [...inputList];

        const indexToModify = newArray.findIndex(
          item => item.ingredientId === ingredientId,
        );

        if (indexToModify !== -1) {
          newArray[indexToModify] = nextInputs;
          setInputList && setInputList(newArray);
        }
      }
    } else {
      setInputs && setInputs(nextInputs);
    }
  };

  const handlePlus = () => {
    const nextInputs = {
      ...inputs,
      amount: amount + 0.25,
    };

    if (isList) {
      if (inputList) {
        const newArray = [...inputList];

        const indexToModify = newArray.findIndex(
          item => item.ingredientId === ingredientId,
        );

        if (indexToModify !== -1) {
          newArray[indexToModify] = nextInputs;
          setInputList && setInputList(newArray);
        }
      }
    } else {
      setInputs && setInputs(nextInputs);
    }
  };

  const handleMinus = () => {
    if (amount === 0.25) return;

    const nextInputs = {
      ...inputs,
      amount: amount - 0.25,
    };

    if (isList) {
      if (inputList) {
        const newArray = [...inputList];

        const indexToModify = newArray.findIndex(
          item => item.ingredientId === ingredientId,
        );

        if (indexToModify !== -1) {
          newArray[indexToModify] = nextInputs;
          setInputList && setInputList(newArray);
        }
      }
    } else {
      setInputs && setInputs(nextInputs);
    }
  };

  return (
    <Div>
      <div className="left-container">
        <img
          className="icon"
          src={iconId && icons[iconId - 1]}
          onClick={() => {
            setIsOpenList(!isOpenList);
          }}
        />

        <Detail>
          <input
            name="name"
            className="name"
            placeholder="재료명을 입력하세요"
            value={name}
            onChange={handleChange}
          />

          <input
            type="number"
            name="price"
            className="price"
            placeholder="가격을 입력하세요"
            value={price || "가격을 입력하세요"}
            onChange={handleChange}
          />
        </Detail>
      </div>

      <CountWrapper>
        <div className="minus" onClick={handleMinus}>
          <FontRegular size="20px">-</FontRegular>
        </div>

        <Count>
          <FontBold size="12px">{amount}</FontBold>
        </Count>

        <div className="plus" onClick={handlePlus}>
          <FontRegular size="20px">+</FontRegular>
        </div>
      </CountWrapper>


      {isOpenList && (
        <div className="icon-list">
          {isList ? (
            <IconList
              setIsOpenList={setIsOpenList}
              ingredientId={ingredientId}
            />
          ) : (
            <IconList
              inputs={inputs}
              setInputs={setInputs}
              ingredientId={ingredientId}
              setIsOpenList={setIsOpenList}
            />
          )}
        </div>
      )}
    </Div>
  );
};

export default ItemInput;



const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--grey1);
  padding: 14px 18px;
  border-radius: 6px;

  position: relative;
  width: 90%;
  height: 81px;
  
  box-sizing: border-box;
  gap: 8px;

  .icon {
    width: 50px;
  }

  .icon-list {
    position: absolute;
    top: 10px;
    left: 70px;
    z-index: 1;
  }

  .left-container {
    display: flex;
    gap: 15px;
  }
`;

const Detail = styled.div`
  height: 57px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 2px;

  input {
    border: none;
    outline: none;
    background-color: var(--grey1);
    font-family: Noto Sans KR;
  }

  .price {
    width: 90%;
    color: var(--grey2);

    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  .name {
    width: 90%;

    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

const Count = styled.div`
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  border-radius: 40px;
  background-color: #fff;

  line-height: 27px;
`;

const CountWrapper = styled.div`
  width: 58px;
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;

  .minus {
    margin-bottom: 5px;
  }
`;
*/