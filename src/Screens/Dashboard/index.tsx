import React from "react";
import HighlightCard from "../../components/HighlightCard";
import {
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  UserWrapper,
  Icon,
  HighlightCards,
} from "./styles";

const hight = [
  {
    title: "Entradas",
    amount: "R$ 17.400,00",
    lastTransaction: "Última entrada dia 13 de abril",
    icon: "arrow-up-circle",
  },
  {
    title: "Saídas",
    amount: "R$ 1.259,00",
    lastTransaction: "Última entrada dia 03 de abril",
    icon: "arrow-down-circle",
  },
  {
    title: "Total",
    amount: "R$ 16.141,00",
    lastTransaction: "01 á 16 de abril",
    icon: "dollar-sign",
  },
];

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/15203010?v=4",
              }}
            />

            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Caio</UserName>
            </User>
          </UserInfo>

          <Icon name="power" />
        </UserWrapper>
      </Header>

      <HighlightCards>
        {hight.map((h, index) => (
          <HighlightCard
            key={index}
            title={h.title}
            amount={h.amount}
            lastTransaction={h.lastTransaction}
            icon={h.icon}
          />
        ))}
      </HighlightCards>
    </Container>
  );
};

export default Dashboard;
