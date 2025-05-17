// 토마토파스타 메뉴 설명 페이지

import styled from "styled-components";
import deletebtn from "@assets/main/deletebtn.png";
import { FontBold, FontMedium, FontRegular } from "@style/font.style";
import { IconList, icons } from "./IconList";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { newListState } from "@services/store/ingredients";
import { TypeIngredient } from "type/ingredients";

type Props = {
  isIconEditable: boolean;
  isEditing: boolean;
  isDeletable: boolean;
  item: TypeIngredient;
  index: number;
  initialList: TypeIngredient[];
  maxAmount?: number | undefined;
};

const Item = ({
  isIconEditable,
  isEditing,
  isDeletable,
  item,
  index,
  initialList,
  maxAmount,
}: Props) => {
  const [isOpenList, setIsOpenList] = useState(false);
  const [newList, setNewList] = useRecoilState(newListState);

  const saveToLocalStorage = (data: TypeIngredient[]) => {
    localStorage.setItem("tempIngredients", JSON.stringify(data));
    window.dispatchEvent(new Event("storage"));
  };

  useEffect(() => {
    setNewList(initialList);
  }, []);

  const { name, price, ingredientId } = item;

  const deleteNewItem = () => {
    const updated = newList.filter((i: TypeIngredient) => i.ingredientId !== ingredientId);
    setNewList(updated);
    saveToLocalStorage(updated);
  };

  const handlePlus = () => {
    const updated = newList.map((i: TypeIngredient) =>
      i.ingredientId === ingredientId ? { ...i, amount: i.amount + 0.25 } : i
    );
    setNewList(updated);
    saveToLocalStorage(updated);
  };

  const handleMinus = () => {
    if (!isDeletable && item.amount === 0) return;

    const updated = newList.map((i: TypeIngredient) =>
      i.ingredientId === ingredientId
        ? { ...i, amount: Math.max(i.amount - 0.25, 0) }
        : i
    );
    setNewList(updated);
    saveToLocalStorage(updated);
  };

  return (
    <Div>
      <div className="left-container">
        <img
          className="icon"
          src={item.iconId ? icons[item.iconId - 1] : icons[0]}
          onClick={() => {
            isIconEditable && setIsOpenList(!isOpenList);
          }}
          alt=""
        />

        <Detail>
          <div className="info">
            <div className="scroll-name">
              <FontMedium size="13px">{name}</FontMedium>
            </div>
            <FontMedium size="12px" className="price">{price}</FontMedium>
          </div>
        </Detail>
      </div>

      <CountWrapper>
        {isEditing && (
          <div onClick={handleMinus}>
            <FontRegular size="18px" className="minus">-</FontRegular>
          </div>
        )}
        <Count>
          <FontBold size="11px">{item.amount}</FontBold>
        </Count>
        {isEditing && (
          <div className="plus" onClick={handlePlus}>
            <FontRegular size="18px">+</FontRegular>
          </div>
        )}
      </CountWrapper>

      {isDeletable && <DeleteBtn src={deletebtn} onClick={deleteNewItem} alt="삭제" />}

      {isIconEditable && isOpenList && (
        <div className="icon-list">
          <IconList setIsOpenList={setIsOpenList} ingredientId={item.ingredientId} />
        </div>
      )}
    </Div>
  );
};

export default Item;

// ✅ 스타일 정의
const Div = styled.div`
  position: relative;
  width: 90%;
  max-width: 315px;
  height: 40px;
  border-radius: 10px;
  background: #FFD880;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;

  .left-container {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  .icon {
    width: 40px;
    height: 40px;
  }

  .icon-list {
    position: absolute;
    left: 60px;
    z-index: 1;
  }
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  .info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: flex-start;
  }

  .scroll-name {
    max-width: 150px;
    overflow-x: auto;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
  }

  .price {
    color: var(--grey2);
  }
`;

const Count = styled.div`
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  border-radius: 40px;
  background-color: #fff;
  line-height: 26px;
  text-align: center;
`;

const CountWrapper = styled.div`
  width: 55px;
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;

  .minus {
    margin-bottom: 3px;
  }
`;

const DeleteBtn = styled.img`
  width: 16px;
  height: 13px;
  cursor: pointer;
  position: absolute;
  top: 40px; // 가격 텍스트와 비슷한 높이로
  right: 100px;
  transform: translateY(-50%);
`;



















/*
import styled from "styled-components";
import deletebtn from "@assets/main/deletebtn.png";
import { FontBold, FontMedium, FontRegular } from "@style/font.style";
import { IconList, icons } from "./IconList";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { newListState } from "@services/store/ingredients";
import { TypeIngredient } from "type/ingredients";

type Props = {
  isIconEditable: boolean;
  isEditing: boolean;
  isDeletable: boolean;
  item: TypeIngredient;
  index: number;
  initialList: TypeIngredient[];
  maxAmount?: number | undefined;
};

const Item = ({
  isIconEditable,
  isEditing,
  isDeletable,
  item,
  index,
  initialList,
  maxAmount,
}: Props) => {
  const [isOpenList, setIsOpenList] = useState(false);
  const [newList, setNewList] = useRecoilState(newListState);

  // localStorage 저장 함수
  const saveToLocalStorage = (data: TypeIngredient[]) => {
    localStorage.setItem("tempIngredients", JSON.stringify(data));
    window.dispatchEvent(new Event("storage")); // Fridge에서 다시 불러오게
  };

  useEffect(() => {
    setNewList(initialList);
  }, []);

  const { name, price, ingredientId } = item;

  const deleteNewItem = () => {
    const updated = newList.filter((i: TypeIngredient) => i.ingredientId !== ingredientId);
    setNewList(updated);
    saveToLocalStorage(updated);
  };

  const handlePlus = () => {
    const updated = newList.map((i: TypeIngredient) =>
      i.ingredientId === ingredientId
        ? { ...i, amount: i.amount + 0.25 }
        : i
    );
    setNewList(updated);
    saveToLocalStorage(updated);
  };

  const handleMinus = () => {
    if (!isDeletable && item.amount === 0) return;

    const updated = newList.map((i: TypeIngredient) =>
      i.ingredientId === ingredientId
        ? { ...i, amount: Math.max(i.amount - 0.25, 0) }
        : i
    );
    setNewList(updated);
    saveToLocalStorage(updated);
  };

  return (
    <Div>
      <div className="left-container">
        <img
          className="icon"
          src={item.iconId ? icons[item.iconId - 1] : icons[0]}
          onClick={() => {
            isIconEditable && setIsOpenList(!isOpenList);
          }}
        />

        <Detail>
          <div className="name">
            <FontMedium size="14px">{name}</FontMedium>
          </div>
          <div className="price">
            <FontMedium size="12px">{price}</FontMedium>
          </div>
        </Detail>
      </div>

      <CountWrapper>
        {isEditing && (
          <div onClick={handleMinus}>
            <FontRegular size="18px" className="minus">-</FontRegular>
          </div>
        )}
        <Count>
          <FontBold size="11px">{item.amount}</FontBold>
        </Count>
        {isEditing && (
          <div className="plus" onClick={handlePlus}>
            <FontRegular size="18px">+</FontRegular>
          </div>
        )}
      </CountWrapper>

      {isDeletable && <DeleteBtn src={deletebtn} onClick={deleteNewItem} />}

      {isIconEditable && isOpenList && (
        <div className="icon-list">
          <IconList
            setIsOpenList={setIsOpenList}
            ingredientId={item.ingredientId}
          />
        </div>
      )}
    </Div>
  );
};

export default Item;

// 👇 스타일은 기존 코드 그대로 유지 👇
const Div = styled.div`
  position: relative;
  width: 100%;
  max-width: 315px;
  height: 45px;
  border-radius: 6px;
  background: var(--grey1);
  padding: 8px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;

  .left-container {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  .icon {
    width: 40px;
    height: 40px;
  }

  .icon-list {
    position: absolute;
    left: 60px;
    z-index: 1;
  }
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 2px;

  .price {
    color: var(--grey2);
  }
`;

const Count = styled.div`
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  border-radius: 40px;
  background-color: #fff;
  line-height: 26px;
  text-align: center;
`;

const CountWrapper = styled.div`
  width: 55px;
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;

  .minus {
    margin-bottom: 3px;
  }
`;

const DeleteBtn = styled.img`
  width: 16px;
  height: 16px;
  filter: drop-shadow(1px 2px 5.9px rgba(0, 0, 0, 0.15));
  position: absolute;
  top: -6px;
  right: 6px;
`;









































/*import styled from "styled-components";
import deletebtn from "@assets/main/deletebtn.png";
import { FontBold, FontMedium, FontRegular } from "@style/font.style";
import { IconList, icons } from "./IconList";
import { useEffect, useState } from "react";

import { useRecoilState } from "recoil";
import { newListState } from "@services/store/ingredients";

type Props = {
  isIconEditable: boolean;
  isEditing: boolean;
  isDeletable: boolean;
  item: any;
  index: any;
  initialList: any[];
  maxAmount?: number | undefined;
};

const Item = ({
  isIconEditable,
  isEditing,
  isDeletable,
  item,
  index,
  initialList,
  maxAmount,
}: Props) => {
  const [isOpenList, setIsOpenList] = useState(false);
  const [newList, setNewList] = useRecoilState(newListState);

  useEffect(() => {
    setNewList(initialList);
  }, []);

  const { name, price, date, ingredientId } = item;

  const deleteNewItem = () => {
    let arr = [...newList];
    setNewList(arr.filter(item => item.ingredientId !== ingredientId));
  };

  const handlePlus = () => {
    if (item.amount === maxAmount) return;
    let arr = [...newList];
    setNewList(
      arr.map(item =>
        item.ingredientId === ingredientId
          ? { ...item, amount: item.amount + 0.25 }
          : item
      )
    );
  };

  const handleMinus = () => {
    if (isDeletable && item.amount === 0.25) {
      return;
    } else if (!isDeletable && item.amount === 0) {
      return;
    }
    let arr = [...newList];
    setNewList(
      arr.map(item =>
        item.ingredientId === ingredientId
          ? { ...item, amount: item.amount - 0.25 }
          : item
      )
    );
  };

  return (
    <Div>
      <div className="left-container">
        <img
          className="icon"
          src={icons[item.iconId - 1]}
          onClick={() => {
            isIconEditable && setIsOpenList(!isOpenList);
          }}
        />

        <Detail>
          <div className="name">
            <FontMedium size="14px">{name}</FontMedium>
          </div>
          <div className="price">
            <FontMedium size="12px">{price}</FontMedium>
          </div>
          {item.date && (
            <div className="date">
              <FontRegular size="10px">등록일 :{date}</FontRegular>
            </div>
          )}
        </Detail>
      </div>

      <CountWrapper>
        {isEditing && (
          <div onClick={handleMinus}>
            <FontRegular size="18px" className="minus">-</FontRegular>
          </div>
        )}
        <Count>
          <FontBold size="11px">{item.amount}</FontBold>
        </Count>
        {isEditing && (
          <div className="plus" onClick={handlePlus}>
            <FontRegular size="18px">+</FontRegular>
          </div>
        )}
      </CountWrapper>

      {isDeletable && <DeleteBtn src={deletebtn} onClick={deleteNewItem} />}

      {isIconEditable && isOpenList && (
        <div className="icon-list">
          <IconList
            setIsOpenList={setIsOpenList}
            ingredientId={item.ingredientId}
          />
        </div>
      )}
    </Div>
  );
};

export default Item;

const Div = styled.div`
  position: relative;
  width: 90%;
  height: 65px;
  border-radius: 6px;
  background: var(--grey1);
  padding: 8px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;

  .left-container {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  .icon {
    width: 40px;
    height: 40px;
  }

  .icon-list {
    position: absolute;
    left: 60px;
    z-index: 1;
  }
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 2px;

  .price,
  .date {
    color: var(--grey2);
  }
`;

const Count = styled.div`
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  border-radius: 40px;
  background-color: #fff;
  line-height: 26px;
  text-align: center;
`;

const CountWrapper = styled.div`
  width: 55px;
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;

  .minus {
    margin-bottom: 3px;
  }
`;

const DeleteBtn = styled.img`
  width: 16px;
  height: 16px;
  filter: drop-shadow(1px 2px 5.9px rgba(0, 0, 0, 0.15));
  position: absolute;
  top: -6px;
  right: 6px;
`;
*/