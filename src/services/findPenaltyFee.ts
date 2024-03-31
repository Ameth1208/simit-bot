import puppeteer from "puppeteer";
import { IResponsePenalty } from "src/interfaces";

export async function findPenaltyApi(
  query: string
): Promise<IResponsePenalty | string | any> {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(
      `https://fcm.org.co/simit/#/estado-cuenta?numDocPlacaProp=${query}`,
      {
        waitUntil: "networkidle2",
      }
    );

    const selectorTabla = "#multaTable";
    await page.waitForSelector(selectorTabla, { timeout: 60000 });

    const resumenSelector = ".card.bg-estado-section";

    await page.waitForSelector(resumenSelector, { timeout: 60000 });

    const resumenDetails = await page.evaluate(() => {
      let tickets =
        document.querySelector(
          "div.col-lg-3.col-md-3.col-6:nth-of-type(1) strong"
        )?.textContent || "0";
      let fines =
        document.querySelector("div.col-lg-2.col-md-2.col-6 strong")
          ?.textContent || "0";
      let paymentAgreements =
        document.querySelector("div.col-lg-4.col-md-3.col-6 strong")
          ?.textContent || "0";
      let totalAmount =
        document.querySelector("div.col-lg-4.col-md-4.col-12 strong")
          ?.textContent || "0";

      const regex = /[\d.,]+/g;
      const totalAmountNumbersOnly = totalAmount.match(regex)?.join("") || "0";

      return {
        tickets,
        fines,
        paymentAgreements,
        totalAmount: totalAmountNumbersOnly,
      };
    });

    // Verifica si se encontraron tickets o multas
    if (resumenDetails.tickets === "0" && resumenDetails.fines === "0") {
      await browser.close();
      return "No encontramos ningún comparendo o multa.";
    }

    console.log(resumenDetails);
    await browser.close();
    return resumenDetails;
  } catch (error) {
    console.error("Error al encontrar la penalización: ", error);
    return "Ocurrió un error al intentar encontrar comparendos o multas.";
  }
}
