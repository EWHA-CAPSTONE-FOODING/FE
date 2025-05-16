
import FitBtn from "@components/Buttons/FitBtn";
import LongBtn from "@components/Buttons/LongBtn";
import Header from "@components/Header/Header";
import List from "@components/Ingredients/List/List";
import { patchIngredients } from "@services/api/ingredients";
import { myListState, newListState } from "@services/store/ingredients";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";

const Editing = () => {
  const navigate = useNavigate();
  const myList = useRecoilValue(myListState);
  const [newList, setNewList] = useRecoilState(newListState);

  const requestChange = () => {
    patchIngredients(newList).then(res => {
      alert("수정이 완료되었습니다.");
      navigate("/");
    });
  };
  useEffect(() => {
    //기존 재료 목록으로 초기화
    setNewList(myList);
  }, []);

  return (
    <Div>
      <Header isBack={false} title="식재료 수정/삭제" />

      <EditBtn>
        <FitBtn text="수정 취소" onClick={() => navigate("/")} />
      </EditBtn>

      <div className="margin">
        <List
          isEditing={true}
          isDeletable={true}
          list={newList}
          isIconEditable={true}
        />
      </div>

      <div className="bottom">
        <LongBtn text="수정 완료" onClick={requestChange} />
      </div>
    </Div>
  );
};

export default Editing;

const Div = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .margin {
    width: 100%;
    margin-bottom: 120px;
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
const EditBtn = styled.div`
  display: flex;
  justify-content: end;
  width: 90%; // 아래 리스트 아이템과 같은 너비
  margin: 11.5px auto 15.5px;
`;
