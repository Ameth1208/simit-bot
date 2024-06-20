import puppeteer from "puppeteer";
import { formatCurrency } from "src/helpers";
import { IResponsePenalty, IResponsePenaltyAll } from "src/interfaces";

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

    const content: IResponsePenaltyAll[] = await page.evaluate((selector) => {
      const rows = Array.from(
        document.querySelectorAll(`${selector} tbody tr`)
      );
      return rows.map((row: any) => {
        const type = row
          .querySelector("td[data-label='Tipo']")
          .innerText.trim();
        const notification = row
          .querySelector("td[data-label='Notificación']")
          .innerText.trim();
        const licensePlate = row
          .querySelector("td[data-label='Placa']")
          .innerText.trim();
        const secretary = row
          .querySelector("td[data-label='Secretaría']")
          .innerText.trim();
        const infraction = row
          .querySelector("td[data-label='Infracción']")
          .innerText.trim();
        const status = row
          .querySelector("td[data-label='Estado']")
          .innerText.trim();
        const value = row
          .querySelector("td[data-label='Valor']")
          .innerText.trim();
        const payableValue = row
          .querySelector("td[data-label='Valor a pagar']")
          .innerText.trim();

        const regex = /[\d.,]+/g;
        const payableValueOnly = payableValue.match(regex)?.join("") || "0";
        const typeOnly = `${type.split("\n\n")[0]} ${type.split("\n\n")[1]}`;
        let secretaryOnly = `${secretary.split("\n\n")[0]} ${
          secretary.split("\n\n")[1]
        }`;

        let valueOnly = value.split("\n\n")[0];
        let interes = value.split("\n\n")[1];
        return {
          type: typeOnly,
          notification,
          licensePlate,
          secretary: secretaryOnly,
          infraction,
          status,
          value: valueOnly,
          interes,
          payableValue: payableValueOnly,
        };
      });
    }, selectorTabla);

    // Verifica si se encontraron tickets o multas
    if (resumenDetails.tickets === "0" && resumenDetails.fines === "0") {
      await browser.close();
      return "No encontramos ningún comparendo o multa.";
    }

    await browser.close();
    return { resumenDetails, content };
  } catch (error) {
    // console.error("Error al encontrar la penalización: ", error);
    return "No encontramos ningún comparendo o multa";
  }
}
