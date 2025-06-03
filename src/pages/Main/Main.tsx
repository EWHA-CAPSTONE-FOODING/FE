import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "@components/Header/Header";
import NavBar from "@components/NavBar/NavBar";
import { FontMedium } from "@style/font.style";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ChartTitle, Tooltip, Legend);

const Main = () => {
  const [chartData, setChartData] = useState<any>(null);
  const [total, setTotal] = useState<number>(0);
  const [menuData, setMenuData] = useState<any[]>([]);
  const [recommendData, setRecommendData] = useState<any[]>([]);

  // 소비 데이터
  useEffect(() => {
    fetch("/ingredient_data.json")
      .then((res) => res.json())
      .then((data) => {
        const labels = data.map((item: any) => item.name);
        const prices = data.map((item: any) => item.price);

        setChartData({
          labels,
          datasets: [
            {
              label: "",
              data: prices,
              backgroundColor: ["#6868AC", "#B76EB0", "#4BC0C0", "#36A2EB", "#F47A9E"],
              borderRadius: 8,
              barThickness: 15
            }
          ]
        });

        const sum = prices.reduce((acc: number, cur: number) => acc + cur, 0);
        setTotal(sum);
      });
  }, []);

  // 메뉴 데이터
  useEffect(() => {
    fetch("/menu_data.json")
      .then((res) => res.json())
      .then((data) => setMenuData(data));
  }, []);

  // 추천 식재료 데이터
  useEffect(() => {
    fetch("/recs.json")
      .then((res) => res.json())
      .then((data) => setRecommendData(data));
  }, []);

  const chartOptions = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.parsed.x.toLocaleString()}원`
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: { font: { size: 10 }, color: "#333", maxTicksLimit: 6, padding: 4 }
      },
      y: {
        ticks: { font: { size: 10 }, color: "#333" },
        categoryPercentage: 0.5,
        barPercentage: 0.5
      }
    }
  };

  return (
    <Container>
      <HeaderWrapper>
        <Header isBack={false} title=" " />
      </HeaderWrapper>

      <IntroBlock>
        <FontMedium size="16px">문이현 님의 주간 레포트</FontMedium>
        <FontMedium size="12px" className="grey">
          기간: 2025.05.26 ~ 2025.06.01
        </FontMedium>
      </IntroBlock>

      <Content>
        <Total>이번주 총 식재료 소비 금액은 <b>{total.toLocaleString()}원</b>이에요!</Total>

        {chartData && (
          <ChartWrapper>
            <Bar data={chartData} options={chartOptions} height={80} />
          </ChartWrapper>
        )}

        <MenuSection>
          <SectionTitle>메뉴 선택 내역</SectionTitle>
          <MenuSubTitle>이번주 푸딩에서 선택하신 메뉴는 총 {menuData.length}가지네요!</MenuSubTitle>
          <MenuList>
            {menuData.map((menu, idx) => (
              <MenuCard key={idx}>
                <img src={menu.image} alt={menu.name} />
                <div className="info">
                  <div className="name">{menu.name}</div>
                  <div className="details">
                    <div>조리 횟수: {menu.count}</div>
                    <div>소비 금액: {menu.price.toLocaleString()}원</div>
                  </div>
                </div>
                <div className="date">{menu.date}</div>
              </MenuCard>
            ))}
          </MenuList>
        </MenuSection>

        <MenuSection>
          <SectionTitle>AI 추천: 영양소 섭취를 위한 추천 식재료</SectionTitle>
          <SubTitle>아래 식재료로 영양소를 골고루 섭취해보세요.</SubTitle>
          <TableWrapper>
            <table>
              <thead>
                <tr>
                  <th>추천 식재료</th>
                  <th>추천 이유</th>
                </tr>
              </thead>
              <tbody>
                {recommendData.map((rec, idx) => (
                  <tr key={idx}>
                    <td>{rec.ingredient}</td>
                    <td>{rec.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrapper>
        </MenuSection>
      </Content>

      <NavBarWrapper>
        <NavBar />
      </NavBarWrapper>
    </Container>
  );
};

export default Main;

// Styled Components
const Container = styled.div`
  width: 100%;
  max-width: 375px;
  margin: 0 auto;
  min-height: 130vh;
  background-color: #fdf4dc;
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  padding-top: 16px;
`;

const IntroBlock = styled.div`
  width: 100%;
  background-color: #FFDAB9;
  border-radius: 8px;
  padding: 8px 12px;
  margin-bottom: 8px;
  box-sizing: border-box;

  .grey {
    color: var(--grey2);
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 12px; // ✅ 모든 섹션 간격 동일하게
  overflow-y: auto; // ✅ 스크롤 가능
  padding-bottom: 80px;
`;

const Total = styled.p`
  font-size: 12px;
  margin: 0;
  padding-left: 12px;
`;

const ChartWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 200px;
`;

const MenuSection = styled.div``;

const SectionTitle = styled(FontMedium)`
  font-size: 16px;
  text-align: left;
`;

const MenuSubTitle = styled.p`
  font-size: 12px;
  margin: 0 0 8px;
  color: #555;
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MenuCard = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffe3b3;
  border-radius: 12px;
  padding: 8px 12px;
  gap: 12px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 8px;
    object-fit: cover;
  }

  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;

    .name {
      font-size: 12px; // ✅ 김이화 주간레포트와 동일
      font-weight: 500;
    }

    .details {
      font-size: 12px;
      color: #555;
      display: flex;
      flex-direction: column;
    }
  }

  .date {
    font-size: 12px;
    color: #777;
  }
`;

const SubTitle = styled.p`
  font-size: 12px;
  margin: 4px 0;
  color: #555;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  table {
    width: 100%;
    border-collapse: collapse;
    

    th, td {
      font-size: 12px;
      border: 1px solid #ffe3b3;
      padding: 6px 8px;
      word-break: keep-all;
    }
    
    th:nth-child(1), td:nth-child(1) {
      width: 30%; // ✅ 추천 식재료 열폭 약간 더 넓게
    }

    th {
      background-color: #ffe3b3;
      text-align: left;
    }
  }
`;

const NavBarWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 375px;
`;
