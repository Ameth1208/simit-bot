import { addKeyword } from "@builderbot/bot";
import { findPenaltyApi } from "../services";
import { ISimit } from "../interfaces";
import { botContext, formatCurrency } from "../helpers";

export const flowFindPenalty = addKeyword("FLOW_FIND_PENALTY").addAnswer(
  [
    "¡Genial! Para comenzar, por favor ingresa el número de placa de tu vehículo o el número de documento del propietario registrado.",
    "Por ejemplo:",
    "",
    "🚗 Por placa: ABC123",
    "👤 Por documento: 1234567890",
  ],
  { capture: true },
  async (ctx, { flowDynamic, endFlow, gotoFlow }) => {
    await flowDynamic(
      "🤖 ¡Estoy buscando la información relacionada con tu consulta! Esto solo tomará unos segundos, por favor, mantente atento.\n\n¡Gracias por tu paciencia!"
    );
    let { multas, totalGeneral, totalAcuerdosPagar }: ISimit =
      await findPenaltyApi(ctx.body);

    if (multas.length > 0) {
      await botContext.add(ctx.from, {
        placa: ctx.body,
        content: multas,
      });
      await flowDynamic(
        `Usted tiene\n\n*Comparendos:* ${multas.length}\n*Multas:* ${
          multas.length
        }\n*Acuerdos de pago:* ${totalAcuerdosPagar}\n*Total a pagar:* $${formatCurrency(
          totalGeneral
        )}`
      );
      // await gotoFlow(flowFindPenaltyDetails);
    } else {
      endFlow("Usted no tiene comparendos o multas");
    }
  }
);
