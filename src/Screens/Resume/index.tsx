import React, { useState, useCallback, useEffect} from 'react';
import {useBottomTabBarHeight} from "@react-navigation/bottom-tabs";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';

import HistoryCard from '../../components/HistoryCard';

import { Container,
    Header, 
    Title, 
    Content,
    ChartContainer,
    MonthSelect,
    MonthSelectButton,
    MonthSelectIcon,
    Month
    } from './styles';
import { categories } from '../../utils/categories';
import { RFValue } from 'react-native-responsive-fontsize';
import { useFocusEffect } from '@react-navigation/core';

interface TransactionData {
   type: 'positive' | 'negative';
   name: string;
   amount: string;
   category: string;
   date: string;
}

interface CategoryData {
   name: string;
   total: number;
   totalFormated: string;
   color: string;
   percent: string;
}

const Resume: React.FC = () => {
   const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

   async function loadData() {
      const dataKey = "@gofinances:transaction";
      const response = await AsyncStorage.getItem(dataKey);
      const responseFormated = response ? JSON.parse(response) : [];

      const expensives = responseFormated.filter((expensive: TransactionData) => expensive.type === 'negative');

      const expensivesTotal = expensives.reduce((acumullator: number, expensive: TransactionData) => {
         return acumullator + Number(expensive.amount);
      },0);

      const totalByCategory: CategoryData[] = [];

      categories.forEach(category => {
         let categorySum = 0;

         expensives.forEach((expensive: TransactionData) => {
            if (expensive.category === category.key) {
               categorySum += Number(expensive.amount)
            }
         });

         if (categorySum > 0) {
            const total = categorySum.toLocaleString("pt-BR", {
               style: 'currency',
               currency: 'BRL'
            });
            const percent = `${(categorySum / expensivesTotal *100).toFixed(0)}%`;

            totalByCategory.push({
               name: category.name,
               total: categorySum,
               totalFormated: total,
               color: category.color,
               percent
            });
         }
      });

      setTotalByCategories(totalByCategory);
   }

   useEffect(() => {
      loadData();
   },[])

   // useFocusEffect( useCallback(() =>{
   //    loadData();
   // },[]))
  return (
     <Container>
        <Header>
           <Title>Resumo por categoria</Title>
        </Header>

         <Content
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
               paddingHorizontal: 24,
               paddingBottom: useBottomTabBarHeight()
            }}
         >
            <MonthSelect>
               <MonthSelectButton>
                  <MonthSelectIcon name="chevron-left" />
               </MonthSelectButton>

               <Month> Maio </Month>

               <MonthSelectButton>
                  <MonthSelectIcon name="chevron-right" />
               </MonthSelectButton>
            </MonthSelect>

            <ChartContainer>
               <VictoryPie
                  data={totalByCategories}
                  colorScale={totalByCategories.map(category => category.color)}
                  style={{
                     labels: {fontSize: RFValue(18), fontWeight: 'bold', fill: '#FFF'}
                  }}
                  labelRadius={50}
                  x="percent"
                  y="totalFormated"
               />
            </ChartContainer>
         {
           totalByCategories.map((item, index) => (
            <HistoryCard title={item.name} amount={item.totalFormated} color={item.color} key={index} />
           ))
        }
         </Content>

     </Container>
  );
}

export default Resume;