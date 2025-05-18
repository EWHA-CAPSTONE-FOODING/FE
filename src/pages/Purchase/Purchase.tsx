import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "@components/Header/Header";
import NavBar from "@components/NavBar/NavBar";

import purchase1 from "@assets/main/Purchase_1p.png";
import purchase2 from "@assets/main/Purchase_2p.png";

const Main = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);

  const purchaseImages = [purchase1, purchase2];

  const handleImageClick = () => {
    if (currentPage < purchaseImages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Container>
      <HeaderWrapper>
        <Header isBack={false} title="" />
      </HeaderWrapper>

      <MainContent>
        <img
          src={purchaseImages[currentPage]}
          alt={`report ${currentPage + 1}`}
          onClick={handleImageClick}
        />
      </MainContent>

      <NavBarWrapper>
        <NavBar />
      </NavBarWrapper>
    </Container>
  );
};

export default Main;

const Container = styled.div`
  width: 100%;
  max-width: 375px;
  margin: 0 auto;
  min-height: 110vh;
  background-color: #fdf4dc;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  padding-top: 16px; /* 로고 상단 여백 추가 */
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  align-items: flex-start;
  padding: 20px;
  padding-top: 0px;

  img {
    /* width: 200px; */
    /* height: auto; */
    width: 105%;
    max-width: 375px; /* 모바일 화면 크기 기준 */
    height: auto;
    border-radius: 5px; /* 원한다면 둥글게 */
    //box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 살짝 입체감 추가 */
  }
`;

const NavBarWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 375px;
  background-color: red;
`;
















/* import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "@components/Header/Header";
import NavBar from "@components/NavBar/NavBar";
import calendarIcon from "@assets/main/calendar.png";
import purchase1 from "@assets/main/calendar1.png";

const Main = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <HeaderWrapper>
        <Header isBack={false} title="p4" />
      </HeaderWrapper>
      <MainContent>
        <img src={purchase1} alt="calendar icon" />
      </MainContent>
      <NavBarWrapper>
        <NavBar />
      </NavBarWrapper>
    </Container>
  );
};

export default Main;

const Container = styled.div`
  width: 100%;
  max-width: 375px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: #fdf4dc;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  padding-top: 16px; 
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  img {
    width: 200px;
    height: auto;
  }
`;

const NavBarWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 375px;
  background-color: red;
`;
*/