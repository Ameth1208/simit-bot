const { PORT, BASE_URL_SIMIT } = process.env;

export const BOT_CONFIG = {
  provider: "baileys",
  port: PORT || 3030,
};
export const baseUrlSimit =
  BASE_URL_SIMIT || "https://consultasimit2.fcm.org.co";
