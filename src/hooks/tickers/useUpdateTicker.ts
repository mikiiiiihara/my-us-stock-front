import { gql, useMutation } from "@apollo/client";

export function useUpdateTicker() {
  const UPDATE_TICKER = gql`
    mutation updateTicker(
      $id: Int!
      $getPrice: Float
      $quantity: Int
      $dividend: Float
      $usdjpy: Float
    ) {
      updateTicker(
        id: $id
        getPrice: $getPrice
        quantity: $quantity
        dividend: $dividend
        usdjpy: $usdjpy
      ) {
        id
        ticker
        getPrice
        quantity
        user
        dividend
        dividendTime
        dividendFirstTime
        sector
        usdjpy
      }
    }
  `;
  const [UpdateTicker, loading] = useMutation(UPDATE_TICKER);
  const executeUpdateTicker = async (
    id: number,
    getPrice: number,
    quantity: number,
    dividend: number,
    usdjpy: number
  ): Promise<void> => {
    await UpdateTicker({
      variables: {
        id,
        getPrice,
        quantity,
        dividend,
        usdjpy,
      },
    });
  };
  return {
    executeUpdateTicker,
    loading,
  };
}
