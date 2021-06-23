import React from "react";
import HighlightCard from "../../components/HighlightCard";
import TransactionCard, {
  TransactionCardProps,
} from "../../components/TransactionCard";

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
  Transactions,
  Title,
  TransactionsList,
  LogoutButton,
} from "./styles";

export interface DatalistProps extends TransactionCardProps {
  id: string;
}

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
  const data: DatalistProps[] = [
    {
      id: "1",
      type: "positive",
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: {
        name: "Vendas",
        icon: "dollar-sign",
      },
      date: "13/04/2020",
    },
    {
      id: "2",
      type: "negative",
      title: "Haambugueria pizzy",
      amount: "R$ 59,00",
      category: {
        name: "Alimentação",
        icon: "coffee",
      },
      date: "10/04/2020",
    },
    {
      id: "3",
      type: "negative",
      title: "Aluguel do Apartamento",
      amount: "R$ 1.200,00",
      category: {
        name: "Casa",
        icon: "shopping-bag",
      },
      date: "10/04/2020",
    },
  ];
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

          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>
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

      <Transactions>
        <Title>Listagem</Title>
        <TransactionsList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
};

export default Dashboard;
