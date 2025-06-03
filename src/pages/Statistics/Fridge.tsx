
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

















