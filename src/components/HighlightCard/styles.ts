import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";

interface TypeProps {
  icon: string;
}

export const Container = styled.View<TypeProps>`
  background-color: ${({ theme, icon }) =>
    icon === "dollar-sign" ? theme.colors.secondary : theme.colors.shappe};
  width: ${RFValue(300)}px;
  border-radius: 5px;
  padding: 19px 23px;
  padding-bottom: ${RFValue(42)}px;
  margin-right: 16px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme, icon }) =>
    icon === "dollar-sign" ? theme.colors.shappe : theme.colors.text_dark};
`;

export const Icon = styled(Feather)<TypeProps>`
  font-size: ${RFValue(40)}px;
  ${({ icon }) =>
    icon === "arrow-up-circle" &&
    css`
      color: ${({ theme }) => theme.colors.success};
    `}
  ${({ icon }) =>
    icon === "arrow-down-circle" &&
    css`
      color: ${({ theme }) => theme.colors.attention};
    `}
    ${({ icon }) =>
    icon === "dollar-sign" &&
    css`
      color: ${({ theme }) => theme.colors.shappe};
    `}
`;

export const Footer = styled.View``;

export const Amount = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;
  color: ${({ theme, icon }) =>
    icon === "dollar-sign" ? theme.colors.shappe : theme.colors.text_dark};
  margin-top: 38px;
`;

export const LastTransaction = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  color: ${({ theme, icon }) =>
    icon === "dollar-sign" ? theme.colors.shappe : theme.colors.text};
`;
