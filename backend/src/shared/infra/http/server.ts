import { app } from "./app";

const port = Number(process.env.APP_PORT) || 3333;

app.listen(port, () => console.log(`🚀 - server is running! - 📡 port ${port}`));