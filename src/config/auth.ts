export default () => ({
  auth: {
    jwtSecretKey: process.env.JWT_SECRET_KEY,
  },
});
