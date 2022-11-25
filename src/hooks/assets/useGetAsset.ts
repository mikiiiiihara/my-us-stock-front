import { gql, useQuery } from "@apollo/client";
import { Asset } from "../../common/asset.interface";

export const GET_ASSETS = gql`
  query GetAssets($user: String) {
    readAllAssets(user: $user) {
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

const GET_ASSET = gql`
  query GetAsset($user: String) {
    readAsset(user: $user) {
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
export const UseGetAsset = (loginUser:string | null | undefined): Asset | undefined => {
  const { data } = useQuery(GET_ASSET, {variables: {user: loginUser}});
  return data?.readAsset;
};