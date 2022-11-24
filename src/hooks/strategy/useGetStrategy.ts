import { gql } from "@apollo/client";
export const GET_STRATEGY = gql`
  query readStrategy($user: String) {
    readStrategy(user: $user) {
      id
      text
      user
      addDate
      updDate
    }
  }
`;
