import { useMemo } from "react";
import { UsStockDetail } from "../../components/templates/us-stocks/types";

export const useTickersSummary = (
  usStockDetails: UsStockDetail[],
  compareFn: (a: UsStockDetail, b: UsStockDetail) => number,
  limit: number
) => {
  return useMemo(
    () => usStockDetails.sort(compareFn).slice(0, limit),
    [usStockDetails, compareFn, limit]
  );
};
