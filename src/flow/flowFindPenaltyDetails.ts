import { addKeyword } from "@builderbot/bot";
import { botContext } from "../helpers";
import { IMultas } from "../interfaces";

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
        const { content } = await botContext.get(ctx.from);
        const multas: IMultas[] = content;
        for (let item of multas) {
          await flowDynamic(`*Tipo:* ${
            item.infracciones[0].codigoInfraccion
          }\n*Placa:* ${item.placa}\n*Secretaría:* ${
            item.departamento + " " + item.organismoTransito
          }\n*Infracción:* ${
            item.infracciones[0].descripcionInfraccion
          }\n*Valor:* ${item.valor}\n*Valor a pagar:* ${item.valorPagar}
          `);
        }

        return;
      case "2":
        endFlow("🤖 Fue un placer ayudarte!");
        return;

      default:
        fallBack("No te he entendido 🤕");
        return;
    }
  }
);
