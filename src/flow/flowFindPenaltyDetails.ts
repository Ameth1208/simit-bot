import { addKeyword } from "@builderbot/bot";
import { setContext } from "src/helpers";
import { findPenaltyDetailsApi } from "src/services/findPenaltyFeeDetails";

export const flowFindPenaltyDetails = addKeyword(
  "FLOW_FIND_PENALTY_DETAILS"
).addAnswer(
  [
    "¿Te gustaría tener detalles sobre tus comparendos o multas encontradas?",
    "",
    "1️⃣ Si o  2️⃣ No",
  ],
  {
    capture: true,
  },
  async (ctx, { flowDynamic, fallBack, endFlow }) => {
    const res = ctx.body;
    switch (res) {
      case "1":
        const { content } = await setContext.getInstance().get(ctx.from);
        const response = content;
        for (let item of response) {
          await flowDynamic(`*Tipo:* ${item.type}\n*Notificación:* ${item.notification}\n*Placa:* ${item.licensePlate}\n*Secretaría:* ${item.secretary}\n*Infracción:* ${item.infraction}\n*Estado:* ${item.status}\n*Valor:* ${item.value}\n*Valor a pagar:* ${item.payableValue}
          `);
        }

        return;
      case "2":
        endFlow("🤖 Fue un placer ayudarte!");
        return;

      default:
        await fallBack("No te he entendido 🤕");
        return;
    }
  }
);
