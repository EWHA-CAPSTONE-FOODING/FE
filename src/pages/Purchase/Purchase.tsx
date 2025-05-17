import React from "react";
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
  padding-top: 16px; /* 로고 상단 여백 추가 */
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