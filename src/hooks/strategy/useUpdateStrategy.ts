import { gql } from "@apollo/client";

export const UPDATE_STRATEGY = gql`
  mutation UpdateStrategy($user: String!, $text: String!) {
    updateStrategy(user: $user, text: $text) {
      id
      text
      user
      addDate
      updDate
    }
  }
`;
