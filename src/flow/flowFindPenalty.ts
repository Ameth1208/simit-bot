import { addKeyword } from "@builderbot/bot";
import { findPenaltyApi } from "src/services";
import { flowFindPenaltyDetails } from "./flowFindPenaltyDetails";
import { setContext } from "src/helpers";

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
    let response = await findPenaltyApi(ctx.body);

    if (
      response.resumenDetails.tickets === "0" ||
      response.resumenDetails.fines == "0"
    ) {
      await setContext
        .getInstance()
        .add(ctx.from, { placa: ctx.body, content: response.content });
      await flowDynamic(
        `Usted tiene\n\n*Comparendos:* ${response.resumenDetails.tickets}\n*Multas:* ${response.resumenDetails.fines}\n*Acuerdos de pago:* ${response.resumenDetails.paymentAgreements}\n*Total a pagar:* $${response.resumenDetails.totalAmount}`
      );
      await gotoFlow(flowFindPenaltyDetails);
    } else {
      await endFlow(response);
    }
  }
);
