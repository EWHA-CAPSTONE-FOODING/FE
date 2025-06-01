
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "@components/Header/Header";
import NavBar from "@components/NavBar/NavBar";
import { FontMedium } from "@style/font.style";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend,
  ArcElement
);

const Main = () => {
  const [chartData, setChartData] = useState<any>(null);
  const [total, setTotal] = useState<number>(0);
  const [menuData, setMenuData] = useState<any[]>([]);
  const [recData, setRecData] = useState<any>(null);

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

  // AI 분석 데이터 (dummy)
  useEffect(() => {
    setRecData({
      nutrients: [
        { name: "탄수화물", percentage: 40 },
        { name: "단백질", percentage: 30 },
        { name: "지방", percentage: 20 },
        { name: "비타민", percentage: 10 }
      ],
      recommendations: [
        "이번주에는 비타민 섭취가 부족해보이네요. 비타민이 풍부한 오렌지, 귤, 토마토를 간식으로 섭취해보세요!",
        "채소 섭취량이 다소 낮은 편으로 보이네요. 반찬으로 샐러드, 나물 반찬을 곁들여보세요!",
        "탄수화물 비율이 높아요. 좀 더 균형잡힌 식사를 해보세요!"
      ]
    });
  }, []);

  const chartOptions = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }, // ✅ 그래프 위 범례 제거!
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

  const doughnutData = recData && {
    labels: recData.nutrients.map((n: any) => n.name),
    datasets: [
      {
        data: recData.nutrients.map((n: any) => n.percentage),
        backgroundColor: ["#FF6384", "#FFCE56", "#4BC0C0", "#9966FF"]
      }
    ]
  };

  return (
    <Container>
      <HeaderWrapper>
        <Header isBack={false} title=" " />
      </HeaderWrapper>

      <IntroBlockWrapper>
        <IntroBlock>
          <FontMedium size="16px">김이화 님의 주간 레포트</FontMedium>
          <FontMedium size="12px" className="grey">
            기간: 2025.05.26 ~ 2025.06.01
          </FontMedium>
         </IntroBlock>
        </IntroBlockWrapper>

      <Content>
        <Total style={{ marginBottom: "4px" }}>
          이번주 총 식재료 소비 금액은 <b>{total.toLocaleString()}원</b>이에요!
        </Total>

        {chartData && (
          <ChartWrapper>
            <Bar data={chartData} options={chartOptions} height={80} />
          </ChartWrapper>
        )}


        <MenuSection>
          <MenuTitle>메뉴선택 내역 및 식습관 분석</MenuTitle>
          <MenuSubTitle>
            이번주 푸딩에서 선택하신 메뉴는 총 {menuData.length}가지네요!
          </MenuSubTitle>
          <MenuList>
            {menuData.map((menu, index) => (
              <MenuCard key={index}>
                <img src={menu.image} alt={menu.name} />
                <div className="info">
                  <div className="name">{menu.name}</div>
                  <div className="details">
                    <div>조리 횟수 : {menu.count}</div>
                    <div>소비 금액 : {menu.price.toLocaleString()}원</div>
                  </div>
                </div>
                <div className="date">{menu.date}</div>
              </MenuCard>
            ))}
          </MenuList>
        </MenuSection>


        {recData && (
          <MenuSection>
            <MenuTitle> </MenuTitle>
            <ChartSection>
              <ChartWrapper style={{ width: "50%", height: "100px" }}>
                <Doughnut data={doughnutData} options={{ plugins: { legend: { display: false } } }} />
              </ChartWrapper>
              <LegendList>
                {recData.nutrients.map((n: any, idx: number) => (
                  <li key={idx}>
                    <span
                      className="color-box"
                      style={{ backgroundColor: ["#FF6384", "#FFCE56", "#4BC0C0", "#9966FF"][idx] }}
                    />
                    {n.name} ({n.percentage}%)
                  </li>
                ))}
              </LegendList>
            </ChartSection>


            <RecommendationList>
              {recData.recommendations.map((item: any, idx: number) => (
                <li key={idx}>{item}</li>
              ))}
            </RecommendationList>
          </MenuSection>
        )}
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
  min-height: 100vh;
  background-color: #fdf4dc;
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  padding-top: 16px;
`;

const IntroBlockWrapper = styled.div`
display: flex;                // ✅ 가운데 정렬!
justify-content: center;      // ✅ 가운데로!
margin: 4px 20px 12px;
`;

const IntroBlock = styled.div`
width: 375px;                  // ✅ 전체폭
background-color: #FFDAB9;
padding: 8px 12px;
border-radius: 8px;

display: flex;                // ✅ 내부 왼쪽 정렬
flex-direction: column;
align-items: flex-start;      // ✅ 왼쪽 정렬!

.grey {
  color: var(--grey2);
}
`;



const Content = styled.div`
  flex: 1;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const Total = styled.p`
  font-size: 12px;
  margin: 0;
  padding-left: 12px;
`;

const ChartWrapper = styled.div`
  width: 100%;
  margin: 4px auto 12px;
  height: 200px;
`;

const MenuSection = styled.div`
  margin-top: 4px;
`;

const MenuTitle = styled.h3`
  font-size: 16px;
  margin: 0 0 4px;
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
    gap: 4px;

    .name {
      font-weight: bold;
      font-size: 11,5px;
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

const ChartSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 8px; // ✅ 그래프와 분석/조언 간격 최소화
`;

const LegendList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
  color: #555;
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  span.color-box {
    width: 12px;
    height: 12px;
    border-radius: 2px;
    display: inline-block;
  }
`;

const RecommendationList = styled.ul`
  font-size: 12px;
  margin: 8px 0 0;
  padding-left: 16px;
  color: #555;

  li {
    margin-bottom: 4px;
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