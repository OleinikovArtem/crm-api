export const authConfig = () => ({
  access_token_secret_key: process.env.ACCESS_TOKEN_SECRET_KEY,
  refresh_token_secret_key: process.env.REFRESH_TOKEN_SECRET_KEY,
});
