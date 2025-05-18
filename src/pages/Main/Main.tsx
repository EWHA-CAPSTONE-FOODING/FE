
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "@components/Header/Header";
import NavBar from "@components/NavBar/NavBar";

import report1 from "@assets/main/Report_1p.png";
import report2 from "@assets/main/Report_2p.png";
import report3 from "@assets/main/Report_3p.png";

const Main = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);

  const reportImages = [report1, report2, report3];

  const handleImageClick = () => {
    if (currentPage < reportImages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  
  return (
    <Container>
      <HeaderWrapper>
        <Header isBack={false} title=" " />
      </HeaderWrapper>

      <MainContent>
        <img
          src={reportImages[currentPage]}
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
  padding-top: 16px; 
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  padding-top: 0px;

  img {

    width: 105%;
    max-width: 375px; 
    height: auto;
    border-radius: 5px; 
  }
`;

const NavBarWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 375px;
  background-color: #fdf4dc;
`;







/*여기
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "@components/Header/Header";
import NavBar from "@components/NavBar/NavBar";
import calendarIcon from "@assets/main/calendar.png";

const Main = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <HeaderWrapper>
        <Header isBack={false} title="p1" />
      </HeaderWrapper>
      <MainContent>
        <img src={calendarIcon} alt="calendar icon" />
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
  background-color: #fdf4dc;
`;










/*
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

// 달력 라이브러리
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// 프로젝트 내 컴포넌트
import Header from "@components/Header/Header";
import List from "@components/Ingredients/List/List";
import CreateBtn from "@components/Buttons/CreateBtn";
import UnderLinedBtn from "@components/Buttons/UnderLinedBtn";
import ChatbotBtn from "@components/Chat/ChatbotBtn";
import NavBar from "@components/NavBar/NavBar";

// 전역 상태
import { myListState } from "@services/store/ingredients";
import { reportedDatesState } from "@services/store/reportedDates";

// API, 에셋
import { getIngredients } from "@services/api/ingredients";
import pencil from "@assets/main/pencil.png";
import calendarIcon from "@assets/main/calendar.png";

const daysKor = ["일", "월", "화", "수", "목", "금", "토"];

const Main: React.FC = () => {
  const navigate = useNavigate();
  // 보유 식재료
  const [myList, setMyList] = useRecoilState(myListState);
  const [list, setList] = useState<any>([]);
  // 날짜 선택
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  // 달력 표시 여부
  const [showCalendar, setShowCalendar] = useState(false);
  // ReportMenu에서 입력된 날짜
  const reportedDates = useRecoilValue(reportedDatesState);

  // 식재료 목록 불러오기
  useEffect(() => {
    getIngredients()
      .then((res) => {
        setMyList(res.data);
        setList(res.data);
      })
      .catch((err) => console.error(err));
  }, [setMyList]);

  // 최근 7일
  const getLast7Days = () => {
    const today = new Date();
    return [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(today.getDate() - (6 - i));
      return d;
    });
  };

  // 날짜 클릭 → ReportMenu
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    navigate("/reportmenu", { state: { selectedDate: date.toDateString() } });
  };

  // 로그아웃
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/greeting");
  };

  // 날짜 포맷 ("YYYY.MM.DD")
  const formattedDate = selectedDate
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\. /g, "."); // "2024.06.07" 형태

  // 달력 날짜 변경 시
  const handleCalendarChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
    }
    setShowCalendar(false);
  };

  return (
    <Container>

      <TopWhiteSection>
        <Header isBack={false} title="p1" />

        <LogoutWrapper>
          <UnderLinedBtn text="로그아웃" onClick={handleLogout} />
        </LogoutWrapper>

        <DateRow>
          <Icon src={calendarIcon} alt="calendar" onClick={() => setShowCalendar(!showCalendar)} />
          <SelectedDateText onClick={() => setShowCalendar(!showCalendar)}>
            {formattedDate}
          </SelectedDateText>
        </DateRow>

        {showCalendar && (
          <CalendarWrapper>
            <DatePicker
              selected={selectedDate}
              onChange={handleCalendarChange}
              maxDate={new Date()}
              inline
              dateFormat="yyyy.MM.dd"
            />
          </CalendarWrapper>
        )}

        <WeekContainer>
          {getLast7Days().map((date, idx) => {
            const dateString = date.toDateString();
            const isSelected = dateString === selectedDate.toDateString();
            const hasEmoji = reportedDates.includes(dateString);

            return (
              <DayColumn
                key={idx}
                $isSelected={isSelected}
                onClick={() => handleDateClick(date)}
              >
                <Weekday $isSelected={isSelected}>
                  {daysKor[date.getDay()]}
                </Weekday>
                <DayNumber $isSelected={isSelected}>
                  {String(date.getDate()).padStart(2, "0")}
                </DayNumber>
                <Emoji>{hasEmoji ? "🍋" : ""}</Emoji>
              </DayColumn>
            );
          })}
        </WeekContainer>
      </TopWhiteSection>


      <BottomYellowSection>
        <EditBtn>
          <img src={pencil} onClick={() => navigate("/edit")} alt="edit" />
        </EditBtn>

        <CenterPlaceholder>
          <p>오늘의 추천 식단 및 식재료 요약이 여기에 표시됩니다.</p>
        </CenterPlaceholder>

        <ListWrapper>
          <List
            isEditing={false}
            isDeletable={false}
            list={list}
            isIconEditable={false}
          />
        </ListWrapper>
      </BottomYellowSection>


      <FloatingBtn>
        <CreateBtn />
      </FloatingBtn>

      <NavBarWrapper>
        <NavBar />
      </NavBarWrapper>

      <ChatBtnWrapper>
        <ChatbotBtn />
      </ChatBtnWrapper>
    </Container>
  );
};

export default Main;


const Container = styled.div`
  width: 375px; 
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
  background-color: #fff;
  padding: 20px 0 10px;
  box-sizing: border-box;
`;

const LogoutWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 20px 10px;
`;

const DateRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  padding: 0 20px;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const SelectedDateText = styled.div`
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;

const CalendarWrapper = styled.div`
  position: absolute;
  top: 180px; 
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.15);
  padding: 10px;
`;

const WeekContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 0 20px;
`;

interface DayColumnProps {
  $isSelected: boolean;
}
const DayColumn = styled.div<DayColumnProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 45px;
  height: 90px;
  border-radius: 24px;
  cursor: pointer;
  padding: 5px 0;
  background-color: ${({ $isSelected }) => ($isSelected ? "#ffe6db" : "transparent")};
`;

const Weekday = styled.div<DayColumnProps>`
  font-size: 12px;
  color: ${({ $isSelected }) => ($isSelected ? "#333" : "#ccc")};
  font-weight: ${({ $isSelected }) => ($isSelected ? "bold" : "normal")};
`;

const DayNumber = styled.div<DayColumnProps>`
  font-size: 15px;
  font-weight: bold;
  color: #000;
`;

const Emoji = styled.div`
  font-size: 20px;
  margin-top: 4px;
`;


const BottomYellowSection = styled.div`
  width: 100%;
  flex: 1;
  padding: 20px;
  box-sizing: border-box;
`;

const EditBtn = styled.div`
  display: flex;
  justify-content: end;
  width: 90%;
  margin: 10px auto 15px;

  img {
    width: 30px;
    height: 26px;
  }
`;

const CenterPlaceholder = styled.div`
  width: 90%;
  margin: 10px 0;
  padding: 15px;
  background: linear-gradient(145deg, #fffde7, #fff9c4);
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  p {
    font-size: 14px;
    color: #555;
  }
`;

const ListWrapper = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;


const NavBarWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0; 
  width: 100%; 
`;

const FloatingBtn = styled.div`
  position: absolute;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
`;

const ChatBtnWrapper = styled.div`
  position: absolute;
  bottom: 90px;
  left: 20px;
`;
*/