import { gql } from "@apollo/client";

export const GET_USD = gql`
  query GetUSD {
    readUsd
  }
`;
