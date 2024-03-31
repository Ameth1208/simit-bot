import puppeteer from "puppeteer";
import { IResponsePenaltyAll } from "src/interfaces";

export async function findPenaltyDetailsApi(query: string) {
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

        return {
          type,
          notification,
          licensePlate,
          secretary,
          infraction,
          status,
          value,
          payableValue,
        };
      });
    }, selectorTabla);

    console.log(content);
    await browser.close();
    return content;
  } catch (error) {
    console.error("Error al encontrar la penalización: ", error);
  }
}
