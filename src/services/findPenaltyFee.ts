import { colors } from "@gamastudio/colorslog";
import { apiSimit } from "./apis";
import { ISimit } from "../interfaces";

export async function findPenaltyApi(
  query: string
): Promise<ISimit | string | any> {
  const { data } = await apiSimit.post(
    "/simit/microservices/estado-cuenta-simit/estadocuenta/consulta",
    { filtro: query }
  );
  const { multas, totalGeneral, totalMultas, totalAcuerdosPagar }: ISimit =
    data;

  if (multas.length > 0) {
    return { multas, totalGeneral, totalMultas, totalAcuerdosPagar };
  } else {
    return [];
  }
}
