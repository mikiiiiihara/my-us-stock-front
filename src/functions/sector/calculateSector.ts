import { PieData } from "../../types/pieData.type";
import { SectorData } from "../../types/sectorData.type";
import { TickerDetail } from "../../types/tickerDetail.type";

export const calculateSectors = (tickerDetail: TickerDetail[]): PieData[] => {
  // セクター名取得
  let sectorData: SectorData[] = new Array();
  for (let data of tickerDetail) {
    const existData = sectorData.find((e) => e.sector === data.sector);
    if (existData == undefined) {
      const item: SectorData = {
        sector: data.sector,
        amount: data.sumOfPrice,
      };
      sectorData.push(item);
    } else {
      existData.amount += data.sumOfPrice;
    }
  }
  let result: PieData[] = new Array();
  for (let data of sectorData) {
    const pieData: PieData = {
      name: data.sector,
      y: data.amount,
    };
    result.push(pieData);
  }
  result.sort(function (a, b) {
    if (a.y > b.y) return -1;
    if (a.y < b.y) return 1;
    return 0;
  });
  return result;
};
