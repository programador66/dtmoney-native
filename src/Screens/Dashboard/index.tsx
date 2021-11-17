import React, {useState, useEffect, useCallback} from "react";
import HighlightCard from "../../components/HighlightCard";
import TransactionCard, {
  TransactionCardProps,
} from "../../components/TransactionCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {useFocusEffect} from "@react-navigation/native";

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

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighightProps {
  amount: string;
}

interface HighightData {
  entries: HighightProps;
  expensives: HighightProps;
  total: HighightProps;
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
  const dataKey = "@gofinances:transaction";

  const [transactions, setTransactions ] = useState<DataListProps[]>([]);
  const [highightData, setHighightData] = useState<HighightData>( {} as HighightData);

  async function loadTransactions() {
    const response = await AsyncStorage.getItem(dataKey);

    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expenseveTotal = 0;

    const transactionsFormated: DataListProps[] = transactions
    .map((item: DataListProps) => {

      if (item.type === 'positive') {
        entriesTotal += Number(item.amount);
      } else {
        expenseveTotal += Number(item.amount);
      }

      const amount = Number(item.amount)
      .toLocaleString("pt-BR", {style: 'currency', currency: 'BRL'})

      const date = Intl.DateTimeFormat('pt-BR', {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit"
      }).format(new Date(item.date));

      return {
        id: item.id,
        name: item.name,
        amount,
        type: item.type,
        category: item.category,
        date
      }
    });

    setTransactions(transactionsFormated);
    const total = entriesTotal - expenseveTotal;

    setHighightData({
      entries: {
        amount: entriesTotal
        .toLocaleString("pt-BR", {style: 'currency', currency: 'BRL'})
      },
      expensives: {
        amount: expenseveTotal.toLocaleString("pt-BR", {style: 'currency', currency: 'BRL'})
      },
      total: {
        amount: total.toLocaleString("pt-BR", {style: 'currency', currency: 'BRL'})
      }
      
    });
  }

  useEffect(() => {
    loadTransactions();
    //AsyncStorage.removeItem(dataKey);
  }, []);

  useFocusEffect(useCallback(() => {
    loadTransactions();
  },[]));

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
          <HighlightCard
            title="Entradas"
            amount={highightData?.entries?.amount}
            lastTransaction="Última entrada dia 13 de abril"
            icon="arrow-up-circle"
          />
           <HighlightCard
            title="Saídas"
            amount={highightData?.expensives?.amount}
            lastTransaction="Última entrada dia 13 de abril"
            icon="arrow-up-circle"
          />
          <HighlightCard
            title="Saídas"
            amount={highightData?.total?.amount}
            lastTransaction="Última entrada dia 13 de abril"
            icon="dollar-sign"
          />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>
        <TransactionsList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
};

export default Dashboard;
