import { gql } from "@apollo/client";

export const UPDATE_CASH = gql`
  mutation UpdateCash($user: String!, $cashUSD: Float!, $cashJPY: Int!, $priceTotal: Float!) {
    updateCash(user: $user, cashUSD: $cashUSD, cashJPY: $cashJPY, priceTotal: $priceTotal) {
      id
      asset
      year
      month
      date
      addDate
      updDate
      user
      cashUSD
      cashJPY
    }
  }
`;
