import { addKeyword } from "@builderbot/bot";
import { findPenaltyApi } from "src/services";

export const flowFindPenalty = addKeyword("FLOW_FIND_PENALTY")
  .addAnswer(
    [
      "¡Genial! Para comenzar, por favor ingresa el número de placa de tu vehículo o el número de documento del propietario registrado.",
      "Por ejemplo:",
      "",
      "🚗 Por placa: ABC123",
      "👤 Por documento: 1234567890",
    ],
    { capture: true },
    async (ctx, { flowDynamic }) => {
      await flowDynamic(
        "🤖 ¡Estoy buscando la información relacionada con tu consulta! Esto solo tomará unos segundos, por favor, mantente atento.\n\n¡Gracias por tu paciencia!"
      );
      let response = await findPenaltyApi(ctx.body);
      console.log(response);

      if (response.tickets === "0" || response.fines == "0") {
        await flowDynamic(
          `Comparendos: ${response.tickets}\nMultas: ${response.fines}\nAcuerdos de pago: ${response.paymentAgreements}\nTotal a pagar: ${response.totalAmount}\n`
        );
      } else {
        await flowDynamic(response);
      }
    }
  )
  .addAnswer("");
