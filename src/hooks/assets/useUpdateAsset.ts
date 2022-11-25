import { gql } from "@apollo/client";

export const UPDATE_ASSET = gql`
  mutation UpdateAsset($user: String!, $asset: Float!) {
    updateAsset(user: $user, asset: $asset) {
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