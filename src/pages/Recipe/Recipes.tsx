

import Header from "@components/Header/Header";
import NavBar from "@components/NavBar/NavBar";
import RecipeInput from "@components/Recipe/RecipeInput";
import RecipeList from "@components/Recipe/RecipeList";
import { getRecipes } from "@services/api/recipes";
import { FontMedium } from "@style/font.style";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { TypeRecipe } from "type/recipe";
import tomatopasta from "@assets/recipe/tomatopasta.png";
import eggtomato from "@assets/recipe/eggtomato.jpeg";
import tunamayo from "@assets/recipe/tunamayo.jpg";
import tunapasta from "@assets/recipe/tunapasta.jpg";
import soysaucetofu from "@assets/recipe/soysaucetofu.jpg";
import ddeukkguk from "@assets/recipe/ddeukkguk.jpg";
import soysauceddeok from "@assets/recipe/soysauceddeok.jpg";
import tomatoeggplant from "@assets/recipe/tomatoeggplant.jpg";
import mapatofu from "@assets/recipe/mapatofu.jpg";



const Recipes = () => {
  const [list, setList] = useState<TypeRecipe[]>();
  const requestList = () => {
    const mockRecipes: TypeRecipe[] = [
      {
        recipeId: 1,
        name: "올리브 토마토 파스타",
        image: tomatopasta,
        mainIng: "토마토, 올리브, 파스타면, 버섯",
        heart: false,

        instructions: [
          "토마토와 마늘을 볶는다.",
          "파스타면을 삶는다.",
          "소금 간을 맞춘다.",
        ],
        advantage: ["건강에 좋음", "요리하기 쉬움", "1인 가구 추천"]
      },
      {
        recipeId: 2,
        name: "토마토 달걀 볶음",
        image: eggtomato, 
        mainIng: "토마토, 계란, 대파",
        heart: false,
        instructions: [
          "토마토와 대파를 볶는다.",
          "계란을 풀어 넣고 재빨리 볶는다.",
          "소금 간을 한다.",
        ],
        advantage: ["간단한 중국식 가정식", "토마토 재활용", "조리시간 짧음"],
      },
      {
        recipeId: 3,
        name: "가지토마토 파스타",
        image: tomatoeggplant, 
        mainIng: "토마토, 계란, 대파, 파스타면",
        heart: false,
        instructions: [
          "토마토와 대파를 볶는다.",
          "계란을 풀어 넣고 재빨리 볶는다.",
          "소금 간을 한다.",
        ],
        advantage: ["간단한 중국식 가정식", "토마토 재활용", "조리시간 짧음"],
      },
      {
        recipeId: 4,
        name: "참치마요 덮밥",
        image: tunamayo, 
        mainIng: "참치, 마요네즈",
        heart: false,
        instructions: [
          "참치의 기름을 살짝 제거하고 그릇에 담는다.",
          "마요네즈, 간장, 후추를 섞어 참치와 버무린다.",
          "따뜻한 밥 위에 얹고 김가루, 쪽파를 올린다.",
        ],
        advantage: ["초간단", "조리도구 최소", "든든한 한 끼"],
      },
      {
        recipeId: 5,
        name: "참치 파스타",
        image: tunapasta,
        mainIng: "참치, 파스타면, 대파",
        heart: false,
        instructions: ["파스타면을 삶는다", "참치와 마요를 섞는다"],
        advantage: ["간단한 조리", "풍부한 단백질"],
      },
      {
        recipeId: 6,
        name: "간장두부 덮밥",
        image: soysaucetofu, 
        mainIng: "두부, 버섯, 양파, 대파, 간장",
        heart: false,
        instructions: [
          "두부와 양파를 볶는다.",
          "된장을 푼 물을 넣고 끓인다.",
          "밥 위에 덮어 먹는다.",
        ],
        advantage: ["국 없이 덮밥 완성", "된장 재활용", "고단백 저칼로리"],
      },
      {
        recipeId: 7,
        name: "마파두부",
        image: mapatofu, 
        mainIng: "두부, 버섯, 양파, 대파",
        heart: false,
        instructions: [
          "두부와 양파를 볶는다.",
          "된장을 푼 물을 넣고 끓인다.",
          "밥 위에 덮어 먹는다.",
        ],
        advantage: ["국 없이 덮밥 완성", "된장 재활용", "고단백 저칼로리"],
      },
     
      {
        recipeId: 8,
        name: "떡국",
        image: ddeukkguk,
        mainIng: "떡, 계란, 대파",
        heart: false,
        instructions: ["떡을 끓인다", "계란을 넣고 마무리"],
        advantage: ["든든한 국물", "명절 분위기"],
      },
      {
        recipeId: 9,
        name: "간장떡볶이",
        image: soysauceddeok,
        mainIng: "떡, 어묵, 대파",
        heart: false,
        instructions: ["재료를 볶는다", "카레가루와 물을 넣는다"],
        advantage: ["한끼 뚝딱", "남녀노소 인기"],
      }


    ];
  
    setList(mockRecipes);
  };
  
  useEffect(() => {
    requestList();
  }, []);

  return (
    <Container>
      <TopWhiteSection>
        <Header isBack={false} title=" " />

        <ContentPadding>
          <IntroBlock>
            <FontMedium size="16px">메뉴 추천</FontMedium>
            <FontMedium size="12px" className="grey">
              내가 등록한 식재료를 바탕으로 메뉴를 추천해요.
            </FontMedium>
          </IntroBlock>

      




          <RecipeListWrapper>
            {list && <RecipeList list={list} isHistory={false} />}
          </RecipeListWrapper>
        </ContentPadding>
      </TopWhiteSection>

      <NavBarWrapper>
        <NavBar />
      </NavBarWrapper>
    </Container>
  );
};

export default Recipes;

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

const TitleBlock = styled.div`
  margin-bottom: 14px;
  padding-left: 2px;
  display: flex;
  align-items: center;
`;

const RecipeListWrapper = styled.div`
  margin-bottom: 60px;
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
import RecipeInput from "@components/Recipe/RecipeInput";
import RecipeList from "@components/Recipe/RecipeList";
import { getRecipes } from "@services/api/recipes";
import { FontMedium } from "@style/font.style";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { TypeRecipe } from "type/recipe";
import tomatopasta from "@assets/recipe/tomatopasta.png";


const Recipes = () => {
  const [list, setList] = useState<TypeRecipe[]>();
  const requestList = () => {
    const mockRecipes: TypeRecipe[] = [
      {
        recipeId: 1,
        name: "토마토 파스타",
        image: tomatopasta,
        mainIng: "토마토",
        heart: false,

        instructions: [
          "토마토와 마늘을 볶는다.",
          "파스타면을 삶는다.",
          "소금 간을 맞춘다.",
        ],
        advantage: ["건강에 좋음", "요리하기 쉬움", "1인 가구 추천"],
 
      }
    ];
  
    setList(mockRecipes);
  };
  
  useEffect(() => {
    requestList();
  }, []);

  return (
    <Container>
      <TopWhiteSection>
        <Header isBack={false} title="p2" />

        <ContentPadding>
          <IntroBlock>
            <FontMedium size="16px">내 마음대로 만들기</FontMedium>
            <FontMedium size="12px" className="grey">
              자유롭게 재료를 선택하고 기록해보세요.
            </FontMedium>
          </IntroBlock>

      
          <RecipeInput />

          <TitleBlock>
            <FontMedium size="16px">추천 레시피</FontMedium>
          </TitleBlock>

          <RecipeListWrapper>
            {list && <RecipeList list={list} isHistory={false} />}
          </RecipeListWrapper>
        </ContentPadding>
      </TopWhiteSection>

      <NavBarWrapper>
        <NavBar />
      </NavBarWrapper>
    </Container>
  );
};

export default Recipes;

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

const TitleBlock = styled.div`
  margin-bottom: 14px;
  padding-left: 2px;
  display: flex;
  align-items: center;
`;

const RecipeListWrapper = styled.div`
  margin-bottom: 60px;
`;


const NavBarWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`;

*/


















/* 백엔드용
import ChatbotBtn from "@components/Chat/ChatbotBtn";
import Header from "@components/Header/Header";
import NavBar from "@components/NavBar/NavBar";
import RecipeInput from "@components/Recipe/RecipeInput";
import RecipeList from "@components/Recipe/RecipeList";
import { getRecipes } from "@services/api/recipes";
import { FontMedium } from "@style/font.style";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { TypeRecipe } from "type/recipe";

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
    <Container>
      <TopWhiteSection>
        <Header isBack={false} title="p2" />

        <ContentPadding>
          <IntroBlock>
            <FontMedium size="16px">내 마음대로 만들기</FontMedium>
            <FontMedium size="12px" className="grey">
              자유롭게 재료를 선택하고 기록해보세요.
            </FontMedium>
          </IntroBlock>

      
          <RecipeInput />

          <TitleBlock>
            <FontMedium size="16px">추천 레시피</FontMedium>
          </TitleBlock>

          <RecipeListWrapper>
            {list && <RecipeList list={list} isHistory={false} />}
          </RecipeListWrapper>
        </ContentPadding>
      </TopWhiteSection>

      <ChatBtnWrapper>
        <ChatbotBtn />
      </ChatBtnWrapper>

      <NavBarWrapper>
        <NavBar />
      </NavBarWrapper>
    </Container>
  );
};

export default Recipes;

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

const TitleBlock = styled.div`
  margin-bottom: 14px;
  padding-left: 2px;
  display: flex;
  align-items: center;
`;

const RecipeListWrapper = styled.div`
  margin-bottom: 60px;
`;

const ChatBtnWrapper = styled.div`
  position: absolute;
  bottom: 90px;
  left: 20px;
`;

const NavBarWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`;
















/*
import ChatbotBtn from "@components/Chat/ChatbotBtn";
import Header from "@components/Header/Header";
import NavBar from "@components/NavBar/NavBar";
import RecipeInput from "@components/Recipe/RecipeInput";
import RecipeList from "@components/Recipe/RecipeList";
import { getRecipes } from "@services/api/recipes";
import { FontMedium } from "@style/font.style";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { TypeRecipe } from "type/recipe";

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
    <Container>
      <TopWhiteSection>
        <Header isBack={false} title="p2" />

        <ContentPadding>
          <IntroBlock>
            <FontMedium size="16px">내 마음대로 만들기</FontMedium>
            <FontMedium size="12px" className="grey">
              자유롭게 재료를 선택하고 기록해보세요.
            </FontMedium>
          </IntroBlock>

      
          <RecipeInput />

          <TitleBlock>
            <FontMedium size="16px">추천 레시피</FontMedium>
          </TitleBlock>

          <RecipeListWrapper>
            {list && <RecipeList list={list} isHistory={false} />}
          </RecipeListWrapper>
        </ContentPadding>
      </TopWhiteSection>

      <ChatBtnWrapper>
        <ChatbotBtn />
      </ChatBtnWrapper>

      <NavBarWrapper>
        <NavBar />
      </NavBarWrapper>
    </Container>
  );
};

export default Recipes;

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

const TitleBlock = styled.div`
  margin-bottom: 14px;
  padding-left: 2px;
  display: flex;
  align-items: center;
`;

const RecipeListWrapper = styled.div`
  margin-bottom: 60px;
`;

const ChatBtnWrapper = styled.div`
  position: absolute;
  bottom: 90px;
  left: 20px;
`;

const NavBarWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`;
















/* 
import ChatbotBtn from "@components/Chat/ChatbotBtn";
import Header from "@components/Header/Header";
import NavBar from "@components/NavBar/NavBar";
import RecipeInput from "@components/Recipe/RecipeInput";
import RecipeList from "@components/Recipe/RecipeList";
import { getRecipes } from "@services/api/recipes";
import { FontMedium } from "@style/font.style";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { TypeRecipe } from "type/recipe";

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
      <Header isBack={false} title="당신을 위한 추천 레시피" />

      <div className="text">
        <FontMedium size="16px">내 마음대로 만들기</FontMedium>
        <FontMedium size="12px" className="gray">
          자유롭게 재료를 선택하고 기록해보세요.
        </FontMedium>
      </div>

      <RecipeInput />

      <div className="text">
        <FontMedium size="16px">추천 레시피</FontMedium>
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
    color: var(--grey2);
  }
`;
*/










/*
import ChatbotBtn from "@components/Chat/ChatbotBtn";
import Header from "@components/Header/Header";
import NavBar from "@components/NavBar/NavBar";
import RecipeInput from "@components/Recipe/RecipeInput";
import RecipeList from "@components/Recipe/RecipeList";
import { getRecipes } from "@services/api/recipes";
import { FontMedium } from "@style/font.style";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { TypeRecipe } from "type/recipe";

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
      <Header isBack={false} title="당신을 위한 추천 레시피" />

      <div className="text">
        <FontMedium size="16px">내 마음대로 만들기</FontMedium>
        <FontMedium size="12px" className="gray">
          자유롭게 재료를 선택하고 기록해보세요.
        </FontMedium>
      </div>

      <RecipeInput />

      <div className="text">
        <FontMedium size="16px">추천 레시피</FontMedium>
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
    color: var(--grey2);
  }
`;
*/