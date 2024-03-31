import { addKeyword, EVENTS } from "@builderbot/bot";
import { MemoryDB as Database } from "@builderbot/bot";
import { BaileysProvider as Provider } from "@builderbot/provider-baileys";
import { flowFindPenalty } from "./flowFindPenalty";

export const flowWelcome = addKeyword<Provider, Database>(EVENTS.WELCOME)
  .addAnswer(
    "¡Hola! 👋 Bienvenido al Bot de Consulta de Placas y Foto Multas. Soy tu asistente virtual aquí para ayudarte a revisar cualquier multa de tráfico asociada con tu vehículo. ¿En qué puedo ayudarte hoy?"
  )
  .addAnswer(
    [
      "Puedo ayudarte con los siguientes temas:",
      "",
      "1️⃣ 🚗 Consultar Multas por Placa o Documento",
      "2️⃣ ¿Cómo Funciona?",
      "3️⃣ Ayuda / Soporte",
      "",
      "Escoja una opción:",
    ],
    { capture: true },
    async (ctx, { fallBack, gotoFlow }) => {
      const res = ctx.body;
      switch (res) {
        case "1":
          await gotoFlow(flowFindPenalty);
          return;
        case "2":
          // await gotoFlow(flowAdviser);
          return;
        case "3":
          // await gotoFlow(flowComplaint);
          return;
        default:
          await fallBack("No te he entendido 🤕");
          return;
      }
    }
  );
