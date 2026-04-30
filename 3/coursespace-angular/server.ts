export const app = () => {
  const port = process.env['PORT'] || 4000;
  console.log(`Server listening on http://localhost:${port}`);
  return;
};

export default app;
