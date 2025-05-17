
import Header from "@components/Header/Header";
import NavBar from "@components/NavBar/NavBar";
import { FontMedium } from "@style/font.style";
import styled from "styled-components";
import List from "@components/Ingredients/List/List";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TypeIngredient } from "type/ingredients";

const Fridge = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [localData, setLocalData] = useState<TypeIngredient[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = () => {
      const saved = localStorage.getItem("tempIngredients");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setLocalData(parsed);
        } catch (err) {
          console.error("불러오기 실패:", err);
        }
      }
    };

    loadData();
    window.addEventListener("storage", loadData);
    return () => {
      window.removeEventListener("storage", loadData);
    };
  }, []);

  return (
    <Container>
      <TopWhiteSection>
        <Header isBack={false} title=" " />
      </TopWhiteSection>

      <ScrollArea>
        <ContentPadding>
          <IntroBlock>
            <FontMedium size="16px">식재료 등록하기</FontMedium>
            <FontMedium size="12px" className="grey">
              나에게 편한 방법으로 식재료를 등록해보세요.
            </FontMedium>
          </IntroBlock>

          <StyledInputBox onClick={() => setShowCreate(!showCreate)}>
            <span>식재료를 등록해보세요</span>
          </StyledInputBox>

          {showCreate && (
            <OptionWrapper>
              <OptionButton onClick={() => navigate("/create/self")}>
                직접 등록
              </OptionButton>
              <OptionButton onClick={() => navigate("/create/ocr")}>
                텍스트 인식 등록
              </OptionButton>
              <OptionButton onClick={() => navigate("/create/object-detection")}>
                사물 인식 등록
              </OptionButton>
            </OptionWrapper>
          )}

          <TitleBlock>
            <FontMedium size="16px">냉장고</FontMedium>
          </TitleBlock>

          <ScrollableListWrapper>
            {localData.length > 0 ? (
              <List
                isEditing={true}
                isDeletable={true}
                list={localData}
                isIconEditable={false}
              />
            ) : (
              <EmptyMessage>현재 등록된 식재료가 없어요 😢</EmptyMessage>
            )}
          </ScrollableListWrapper>
        </ContentPadding>
      </ScrollArea>

      <NavBarWrapper>
        <NavBar />
      </NavBarWrapper>
    </Container>
  );
};

export default Fridge;
const Container = styled.div`
  width: 100%;
  max-width: 375px;
  padding: 10px 0 10px;
  margin: 0 auto;
  background-color: #fdf4dc;
  min-height: 100vh;
  overflow: hidden; // ⛔ 전체 페이지 스크롤 제거
  display: flex;
  flex-direction: column;
`;

const TopWhiteSection = styled.div`
  flex-shrink: 0;
`;

const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const ContentPadding = styled.div`
  padding: 0 20px;
`;

const IntroBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 4px;
  margin-bottom: 12px;

  .grey {
    color: var(--grey2);
  }
`;

const StyledInputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  color: #999;
  padding: 14px 18px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 12px;
`;

const OptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const OptionButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  background-color: #ff914d;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #ff7a30;
  }
`;

const TitleBlock = styled.div`
  margin-bottom: 14px;
  padding-left: 2px;
  display: flex;
  align-items: center;
`;

const ScrollableListWrapper = styled.div`
  max-height: 570px; 
  overflow-y: auto;
  padding-right: 4px;
  padding-bottom: 20px; 
`;


const EmptyMessage = styled.div`
  width: 100%;
  padding: 40px 0;
  text-align: center;
  font-size: 14px;
  color: #999;
`;

const NavBarWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%); // ✅ 화면 가운데 정렬
  width: 100%;
  max-width: 375px;             // ✅ 모바일 기준 고정
  background-color: #fdf4dc;
  z-index: 1000;                // ✅ 다른 요소 위에 보이도록
`;




















/*
import Header from "@components/Header/Header";
import NavBar from "@components/NavBar/NavBar";
import { FontMedium } from "@style/font.style";
import styled from "styled-components";
import List from "@components/Ingredients/List/List";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TypeIngredient } from "type/ingredients";

const Fridge = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [localData, setLocalData] = useState<TypeIngredient[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = () => {
      const saved = localStorage.getItem("tempIngredients");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setLocalData(parsed);
        } catch (err) {
          console.error("불러오기 실패:", err);
        }
      }
    };

    loadData();

    window.addEventListener("storage", loadData);
    return () => {
      window.removeEventListener("storage", loadData);
    };
  }, []);

  return (
    <Container>
      <TopWhiteSection>
        <Header isBack={false} title="p2" />

        <ContentPadding>
          <IntroBlock>
            <FontMedium size="16px">식재료 등록하기</FontMedium>
            <FontMedium size="12px" className="grey">
              자유롭게 재료를 선택하고 등록해보세요.
            </FontMedium>
          </IntroBlock>

          <StyledInputBox onClick={() => setShowCreate(!showCreate)}>
            <span>식재료를 등록해보세요</span>
          </StyledInputBox>

          {showCreate && (
            <OptionWrapper>
              <OptionButton onClick={() => navigate("/create/self")}>
                직접 등록
              </OptionButton>
              <OptionButton onClick={() => navigate("/create/ocr")}>
                텍스트 인식 등록
              </OptionButton>
              <OptionButton onClick={() => navigate("/create/object-detection")}>
                사물 인식 등록
              </OptionButton>
            </OptionWrapper>
          )}

          <TitleBlock>
            <FontMedium size="16px">냉장고</FontMedium>
          </TitleBlock>

          <ScrollableListWrapper>
            {localData.length > 0 ? (
              <List
                isEditing={true}
                isDeletable={true}
                list={localData}
                isIconEditable={false}
              />
            ) : (
              <EmptyMessage>현재 등록된 식재료가 없어요 😢</EmptyMessage>
            )}
          </ScrollableListWrapper>
        </ContentPadding>
      </TopWhiteSection>

      <NavBarWrapper>
        <NavBar />
      </NavBarWrapper>
    </Container>
  );
};

export default Fridge;

// ✅ 기존 스타일 유지 + 리스트만 스크롤 추가

const Container = styled.div`
  width: 100%;
  max-width: 375px;
  margin: 0 auto;
  position: relative;
  background-color: #fdf4dc;
  min-height: 100vh;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`;

const TopWhiteSection = styled.div`
  width: 100%;
  background-color: #fdf4dc;
  padding: 20px 0 10px;
  box-sizing: border-box;
`;

const ContentPadding = styled.div`
  padding: 0 20px;
`;

const IntroBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 4px;
  margin-bottom: 12px;

  .grey {
    color: var(--grey2);
  }
`;

const StyledInputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f7f7f8;
  color: #999;
  padding: 14px 18px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 12px;
`;

const OptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const OptionButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  background-color: #ff914d;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #ff7a30;
  }
`;

const TitleBlock = styled.div`
  margin-bottom: 14px;
  padding-left: 2px;
  display: flex;
  align-items: center;
`;

const ScrollableListWrapper = styled.div`
  max-height: 550px; 
  overflow-y: auto;
  padding-right: 4px;
`;

const EmptyMessage = styled.div`
  width: 100%;
  padding: 40px 0;
  text-align: center;
  font-size: 14px;
  color: #999;
`;

const NavBarWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`;




















/*import Header from "@components/Header/Header";
import NavBar from "@components/NavBar/NavBar";
import { FontMedium } from "@style/font.style";
import styled from "styled-components";
import List from "@components/Ingredients/List/List";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TypeIngredient } from "type/ingredients";

const Fridge = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [localData, setLocalData] = useState<TypeIngredient[]>([]);
  const navigate = useNavigate();

  // ✅ localStorage 변경을 감지해서 화면 업데이트
  useEffect(() => {
    const loadData = () => {
      const saved = localStorage.getItem("tempIngredients");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setLocalData(parsed);
        } catch (err) {
          console.error("불러오기 실패:", err);
        }
      }
    };

    loadData();

    // 💡 localStorage 변경 시에도 반영되도록 이벤트 리스너 추가
    window.addEventListener("storage", loadData);

    return () => {
      window.removeEventListener("storage", loadData);
    };
  }, []);

  return (
    <Container>
      <TopWhiteSection>
        <Header isBack={false} title="p2" />

        <ContentPadding>
          <IntroBlock>
            <FontMedium size="16px">식재료 등록하기</FontMedium>
            <FontMedium size="12px" className="grey">
              자유롭게 재료를 선택하고 등록해보세요.
            </FontMedium>
          </IntroBlock>

          <StyledInputBox onClick={() => setShowCreate(!showCreate)}>
            <span>식재료를 등록해보세요</span>
          </StyledInputBox>

          {showCreate && (
            <OptionWrapper>
              <OptionButton onClick={() => navigate("/create/self")}>
                직접 등록
              </OptionButton>
              <OptionButton onClick={() => navigate("/create/ocr")}>
                텍스트 인식 등록
              </OptionButton>
              <OptionButton onClick={() => navigate("/create/object-detection")}>
                사물 인식 등록
              </OptionButton>
            </OptionWrapper>
          )}

          <TitleBlock>
            <FontMedium size="16px">냉장고</FontMedium>
          </TitleBlock>

          {localData.length > 0 ? (
            <List
              isEditing={true}
              isDeletable={true}
              list={localData}
              isIconEditable={false}
            />
          ) : (
            <EmptyMessage>현재 등록된 식재료가 없어요 😢</EmptyMessage>
          )}
        </ContentPadding>
      </TopWhiteSection>

      <NavBarWrapper>
        <NavBar />
      </NavBarWrapper>
    </Container>
  );
};

export default Fridge;

// ⬇ 스타일은 그대로
const Container = styled.div`
  width: 375px;
  margin: 0 auto;
  position: relative;
  background-color:  #fdf4dc;
  min-height: 100vh;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`;

const TopWhiteSection = styled.div`
  width: 100%;
  background-color:  #fdf4dc;
  padding: 20px 0 10px;
  box-sizing: border-box;
`;

const ContentPadding = styled.div`
  padding: 0 20px;
`;

const IntroBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 4px;
  margin-bottom: 12px;

  .grey {
    color: var(--grey2);
  }
`;

const StyledInputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f7f7f8;
  color: #999;
  padding: 14px 18px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 12px;
`;

const OptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const OptionButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  background-color: #ff914d;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #ff7a30;
  }
`;

const TitleBlock = styled.div`
  margin-bottom: 14px;
  padding-left: 2px;
  display: flex;
  align-items: center;
`;

const EmptyMessage = styled.div`
  width: 100%;
  padding: 40px 0;
  text-align: center;
  font-size: 14px;
  color: #999;
`;

const NavBarWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`;


















/*
import Header from "@components/Header/Header";
import NavBar from "@components/NavBar/NavBar";
import { FontMedium } from "@style/font.style";
import styled from "styled-components";
import List from "@components/Ingredients/List/List";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TypeIngredient } from "type/ingredients";

const Fridge = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [localData, setLocalData] = useState<TypeIngredient[]>([]);
  const navigate = useNavigate();

  // ✅ 수량 조절이나 삭제 후 저장된 데이터를 다시 불러오기 위해 useEffect로 동기화
  useEffect(() => {
    const saved = localStorage.getItem("tempIngredients");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setLocalData(parsed);
      } catch (err) {
        console.error("불러오기 실패:", err);
      }
    }
  }, []);

  return (
    <Container>
      <TopWhiteSection>
        <Header isBack={false} title="p2" />

        <ContentPadding>
          <IntroBlock>
            <FontMedium size="16px">식재료 등록하기</FontMedium>
            <FontMedium size="12px" className="grey">
              자유롭게 재료를 선택하고 등록해보세요.
            </FontMedium>
          </IntroBlock>

          <StyledInputBox onClick={() => setShowCreate(!showCreate)}>
            <span>식재료를 등록해보세요</span>
          </StyledInputBox>

          {showCreate && (
            <OptionWrapper>
              <OptionButton onClick={() => navigate("/create/self")}>
                직접 등록
              </OptionButton>
              <OptionButton onClick={() => navigate("/create/ocr")}>
                텍스트 인식 등록
              </OptionButton>
              <OptionButton onClick={() => navigate("/create/object-detection")}>
                사물 인식 등록
              </OptionButton>
            </OptionWrapper>
          )}

          <TitleBlock>
            <FontMedium size="16px">냉장고</FontMedium>
          </TitleBlock>

          {localData.length > 0 ? (
            <List
              isEditing={true}              // ✅ 수량 조절 기능 활성화
              isDeletable={true}            // ✅ 삭제 버튼 활성화
              list={localData}
              isIconEditable={false}
            />
          ) : (
            <EmptyMessage>현재 등록된 식재료가 없어요 😢</EmptyMessage>
          )}
        </ContentPadding>
      </TopWhiteSection>

      <NavBarWrapper>
        <NavBar />
      </NavBarWrapper>
    </Container>
  );
};

export default Fridge;

const Container = styled.div`
  width: 375px;
  margin: 0 auto;
  position: relative;
  background-color: white;
  min-height: 100vh;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`;

const TopWhiteSection = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 20px 0 10px;
  box-sizing: border-box;
`;

const ContentPadding = styled.div`
  padding: 0 20px;
`;

const IntroBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 4px;
  margin-bottom: 12px;

  .grey {
    color: var(--grey2);
  }
`;

const StyledInputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f7f7f8;
  color: #999;
  padding: 14px 18px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 12px;
`;

const OptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const OptionButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  background-color: #ff914d;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #ff7a30;
  }
`;

const TitleBlock = styled.div`
  margin-bottom: 14px;
  padding-left: 2px;
  display: flex;
  align-items: center;
`;

const EmptyMessage = styled.div`
  width: 100%;
  padding: 40px 0;
  text-align: center;
  font-size: 14px;
  color: #999;
`;

const NavBarWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`;
















/*
import Header from "@components/Header/Header";
import NavBar from "@components/NavBar/NavBar";
import { FontMedium } from "@style/font.style";
import styled from "styled-components";
import List from "@components/Ingredients/List/List";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TypeIngredient } from "type/ingredients";

const Fridge = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [localData, setLocalData] = useState<TypeIngredient[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ localStorage에서 저장된 값 불러오기
    const saved = localStorage.getItem("tempIngredients");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setLocalData(parsed);
      } catch (err) {
        console.error("불러오기 실패:", err);
      }
    }
  }, []);

  return (
    <Container>
      <TopWhiteSection>
        <Header isBack={false} title="p2" />

        <ContentPadding>
          <IntroBlock>
            <FontMedium size="16px">식재료 등록하기</FontMedium>
            <FontMedium size="12px" className="grey">
              자유롭게 재료를 선택하고 등록해보세요.
            </FontMedium>
          </IntroBlock>

          <StyledInputBox onClick={() => setShowCreate(!showCreate)}>
            <span>식재료를 등록해보세요</span>
          </StyledInputBox>

          {showCreate && (
            <OptionWrapper>
              <OptionButton onClick={() => navigate("/create/self")}>
                직접 등록
              </OptionButton>
              <OptionButton onClick={() => navigate("/create/ocr")}>
                텍스트 인식 등록
              </OptionButton>
              <OptionButton onClick={() => navigate("/create/object-detection")}>
                사물 인식 등록
              </OptionButton>
            </OptionWrapper>
          )}

          <TitleBlock>
            <FontMedium size="16px">냉장고</FontMedium>
          </TitleBlock>

          {localData.length > 0 ? (
            <List
              isEditing={false}
              isDeletable={false}
              list={localData}
              isIconEditable={false}
            />
          ) : (
            <EmptyMessage>현재 등록된 식재료가 없어요 😢</EmptyMessage>
          )}
        </ContentPadding>
      </TopWhiteSection>

      <NavBarWrapper>
        <NavBar />
      </NavBarWrapper>
    </Container>
  );
};

export default Fridge;

// 👇 스타일은 건드리지 않음

const Container = styled.div`
  width: 375px;
  margin: 0 auto;
  position: relative;
  background-color: white;
  min-height: 100vh;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`;

const TopWhiteSection = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 20px 0 10px;
  box-sizing: border-box;
`;

const ContentPadding = styled.div`
  padding: 0 20px;
`;

const IntroBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 4px;
  margin-bottom: 12px;

  .grey {
    color: var(--grey2);
  }
`;

const StyledInputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f7f7f8;
  color: #999;
  padding: 14px 18px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 12px;
`;

const OptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const OptionButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  background-color: #ff914d;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #ff7a30;
  }
`;

const TitleBlock = styled.div`
  margin-bottom: 14px;
  padding-left: 2px;
  display: flex;
  align-items: center;
`;

const EmptyMessage = styled.div`
  width: 100%;
  padding: 40px 0;
  text-align: center;
  font-size: 14px;
  color: #999;
`;

const NavBarWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`;
*/
























/* 냉장고에 수량 조절 불가
import Header from "@components/Header/Header";
import NavBar from "@components/NavBar/NavBar";
import { FontMedium } from "@style/font.style";
import styled from "styled-components";
import List from "@components/Ingredients/List/List";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TypeIngredient } from "type/ingredients";

const Fridge = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [localData, setLocalData] = useState<TypeIngredient[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ localStorage에서 저장된 값 불러오기
    const saved = localStorage.getItem("tempIngredients");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setLocalData(parsed);
      } catch (err) {
        console.error("불러오기 실패:", err);
      }
    }
  }, []);

  return (
    <Container>
      <TopWhiteSection>
        <Header isBack={false} title="p2" />

        <ContentPadding>
          <IntroBlock>
            <FontMedium size="16px">식재료 등록하기</FontMedium>
            <FontMedium size="12px" className="grey">
              자유롭게 재료를 선택하고 등록해보세요.
            </FontMedium>
          </IntroBlock>

          <StyledInputBox onClick={() => setShowCreate(!showCreate)}>
            <span>식재료를 등록해보세요</span>
          </StyledInputBox>

          {showCreate && (
            <OptionWrapper>
              <OptionButton onClick={() => navigate("/create/self")}>
                직접 등록
              </OptionButton>
              <OptionButton onClick={() => navigate("/create/ocr")}>
                텍스트 인식 등록
              </OptionButton>
              <OptionButton onClick={() => navigate("/create/object-detection")}>
                사물 인식 등록
              </OptionButton>
            </OptionWrapper>
          )}

          <TitleBlock>
            <FontMedium size="16px">냉장고</FontMedium>
          </TitleBlock>

          {localData.length > 0 ? (
            <List
              isEditing={false}
              isDeletable={false}
              list={localData}
              isIconEditable={false}
            />
          ) : (
            <EmptyMessage>현재 등록된 식재료가 없어요 😢</EmptyMessage>
          )}
        </ContentPadding>
      </TopWhiteSection>

      <NavBarWrapper>
        <NavBar />
      </NavBarWrapper>
    </Container>
  );
};

export default Fridge;

// 👇 스타일은 건드리지 않음

const Container = styled.div`
  width: 375px;
  margin: 0 auto;
  position: relative;
  background-color: white;
  min-height: 100vh;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`;

const TopWhiteSection = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 20px 0 10px;
  box-sizing: border-box;
`;

const ContentPadding = styled.div`
  padding: 0 20px;
`;

const IntroBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 4px;
  margin-bottom: 12px;

  .grey {
    color: var(--grey2);
  }
`;

const StyledInputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f7f7f8;
  color: #999;
  padding: 14px 18px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 12px;
`;

const OptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const OptionButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  background-color: #ff914d;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #ff7a30;
  }
`;

const TitleBlock = styled.div`
  margin-bottom: 14px;
  padding-left: 2px;
  display: flex;
  align-items: center;
`;

const EmptyMessage = styled.div`
  width: 100%;
  padding: 40px 0;
  text-align: center;
  font-size: 14px;
  color: #999;
`;

const NavBarWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`;
*/






















/*
import Header from "@components/Header/Header";
import NavBar from "@components/NavBar/NavBar";
import { FontMedium } from "@style/font.style";
import { useRecoilValue } from "recoil";
import { newListState } from "@services/store/ingredients";
import styled from "styled-components";
import List from "@components/Ingredients/List/List";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Fridge = () => {
  const newList = useRecoilValue(newListState);
  const [showCreate, setShowCreate] = useState(false);
  const navigate = useNavigate();

  return (
    <Container>
      <TopWhiteSection>
        <Header isBack={false} title="p2" />

        <ContentPadding>
          <IntroBlock>
            <FontMedium size="16px">식재료 등록하기</FontMedium>
            <FontMedium size="12px" className="grey">
              자유롭게 재료를 선택하고 등록해보세요.
            </FontMedium>
          </IntroBlock>

          <StyledInputBox onClick={() => setShowCreate(!showCreate)}>
            <span>식재료를 등록해보세요</span>
          </StyledInputBox>

          {showCreate && (
            <OptionWrapper>
              <OptionButton onClick={() => navigate("/create/self")}>직접 등록</OptionButton>
              <OptionButton onClick={() => navigate("/create/ocr")}>텍스트 인식 등록</OptionButton>
              <OptionButton onClick={() => navigate("/create/object-detection")}>사물 인식 등록</OptionButton>
            </OptionWrapper>
          )}

          <TitleBlock>
            <FontMedium size="16px">냉장고</FontMedium>
          </TitleBlock>

          {newList.length > 0 ? (
            <List
              isEditing={false}
              isDeletable={false}
              list={newList}
              isIconEditable={false}
            />
          ) : (
            <EmptyMessage>현재 등록된 식재료가 없어요 😢</EmptyMessage>
          )}
        </ContentPadding>
      </TopWhiteSection>

      <NavBarWrapper>
        <NavBar />
      </NavBarWrapper>
    </Container>
  );
};

export default Fridge;

const Container = styled.div`
  width: 375px;
  margin: 0 auto;
  position: relative;
  background-color: white;
  min-height: 100vh;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`;

const TopWhiteSection = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 20px 0 10px;
  box-sizing: border-box;
`;

const ContentPadding = styled.div`
  padding: 0 20px;
`;

const IntroBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 4px;
  margin-bottom: 12px;

  .grey {
    color: var(--grey2);
  }
`;

const StyledInputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f7f7f8;
  color: #999;
  padding: 14px 18px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 12px;
`;

const OptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const OptionButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  background-color: #ff914d;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #ff7a30;
  }
`;

const TitleBlock = styled.div`
  margin-bottom: 14px;
  padding-left: 2px;
  display: flex;
  align-items: center;
`;

const EmptyMessage = styled.div`
  width: 100%;
  padding: 40px 0;
  text-align: center;
  font-size: 14px;
  color: #999;
`;

const NavBarWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`;
*/




























/* 
import Header from "@components/Header/Header";
import NavBar from "@components/NavBar/NavBar";
import { FontMedium } from "@style/font.style";
import { useRecoilValue } from "recoil";
import { newListState } from "@services/store/ingredients";
import styled from "styled-components";
import List from "@components/Ingredients/List/List";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Fridge = () => {
  const newList = useRecoilValue(newListState);
  const [showCreate, setShowCreate] = useState(false);
  const navigate = useNavigate();

  return (
    <Container>
      <TopWhiteSection>
        <Header isBack={false} title="p2" />

        <ContentPadding>
          <IntroBlock>
            <FontMedium size="16px">식재료 등록하기</FontMedium>
            <FontMedium size="12px" className="grey">
              자유롭게 재료를 선택하고 등록해보세요.
            </FontMedium>
          </IntroBlock>

          <StyledInputBox onClick={() => setShowCreate(!showCreate)}>
            <span>식재료를 등록해보세요</span>
          </StyledInputBox>

          {showCreate && (
            <OptionWrapper>
              <OptionButton onClick={() => navigate("/create/self")}>직접 등록</OptionButton>
              <OptionButton onClick={() => navigate("/create/ocr")}>텍스트 인식 등록</OptionButton>
              <OptionButton onClick={() => navigate("/create/object-detection")}>사물 인식 등록</OptionButton>
            </OptionWrapper>
          )}

          <TitleBlock>
            <FontMedium size="16px">냉장고</FontMedium>
          </TitleBlock>

          {newList.length > 0 ? (
            <List
              isEditing={false}
              isDeletable={false}
              list={newList}
              isIconEditable={false}
            />
          ) : (
            <EmptyMessage>현재 등록된 식재료가 없어요 😢</EmptyMessage>
          )}
        </ContentPadding>
      </TopWhiteSection>

      <NavBarWrapper>
        <NavBar />
      </NavBarWrapper>
    </Container>
  );
};

export default Fridge;



const Container = styled.div`
  width: 375px;
  margin: 0 auto;
  position: relative;
  background-color: white;
  min-height: 100vh;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`;

const TopWhiteSection = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 20px 0 10px;
  box-sizing: border-box;
`;


const ContentPadding = styled.div`
  padding: 0 20px;
`;

const IntroBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 4px;
  margin-bottom: 12px;

  .grey {
    color: var(--grey2);
  }
`;

const StyledInputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f7f7f8;
  color: #999;
  padding: 14px 18px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 12px;
`;

const OptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const OptionButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  background-color: #ff914d;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #ff7a30;
  }
`;

const TitleBlock = styled.div`
  margin-bottom: 14px;
  padding-left: 2px;
  display: flex;
  align-items: center;
`;

const EmptyMessage = styled.div`
  width: 100%;
  padding: 40px 0;
  text-align: center;
  font-size: 14px;
  color: #999;
`;

const NavBarWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`;
*/











/* import Header from "@components/Header/Header";
import NavBar from "@components/NavBar/NavBar";
import { FontMedium } from "@style/font.style";
import { useRecoilValue } from "recoil";
import { newListState } from "@services/store/ingredients";
import styled from "styled-components";
import List from "@components/Ingredients/List/List";
import CreateBtn from "@components/Buttons/CreateBtn";

const Fridge = () => {
  const newList = useRecoilValue(newListState);

  return (
    <Wrapper>
      <Header isBack={false} title="" />

      <TextBlock>
        <FontMedium size="16px">식재료 등록하기</FontMedium>
        <FontMedium size="12px" className="red">
          자유롭게 식재료를 등록해보세요.
        </FontMedium>
      </TextBlock>

      <CreateBtnWrapper>
        <CreateBtn />
      </CreateBtnWrapper>

      <TextBlock>
        <FontMedium size="16px">냉장고</FontMedium>
      </TextBlock>

      <List
        isEditing={false}
        isDeletable={false}
        list={newList}
        isIconEditable={false}
      />

      <NavBar />
    </Wrapper>
  );
};

export default Fridge;

const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
  padding-bottom: 80px; /* /
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 4px;
  margin-bottom: 14px;

  .red {
    color: red;
  }
`;

const CreateBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;

  button {
    background: red !important;
    color: white !important;
    font-weight: bold;
    border-radius: 12px;
  }
`;
*/






/* import ChatbotBtn from "@components/Chat/ChatbotBtn";
import Header from "@components/Header/Header";
import NavBar from "@components/NavBar/NavBar";
import RecipeInput from "@components/Recipe/RecipeInput";
import RecipeList from "@components/Recipe/RecipeList";
import { getRecipes } from "@services/api/recipes";
import { FontMedium } from "@style/font.style";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { TypeRecipe } from "type/recipe";
import CreateBtn from "@components/Buttons/CreateBtn";

const Recipes = () => {
  const [list, setList] = useState<TypeRecipe[]>();
  const requestList = () => {
    getRecipes()
      .then(res => {
        setList(res.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    requestList();
  }, []);

  return (
    <Div>
      <ChatbotBtn />
      <Header isBack={false} title="냉장고" />

      <div className="text">
        <FontMedium size="16px">식재료 등록하기</FontMedium>
        <FontMedium size="12px" className="red">
          자유롭게 식재료를 등록해보세요.
        </FontMedium>
      </div>

      <RecipeInput />

      <div className="text">
        <FontMedium size="16px">냉장고</FontMedium>
      </div>

      <div className="margin">
        {list && <RecipeList list={list} isHistory={false} />}
      </div>

      <NavBar />
    </Div>
  );
};

export default Recipes;

const Div = styled.div`
  .margin {
    margin-bottom: 60px;
  }

  .text {
    width: 90%;
    margin: 16.5px auto 13px;
    gap: 3px;
    display: flex;
    flex-direction: column;
    align-items: start;
  }
  .gray {
    color: red;
  }
`;
*/
