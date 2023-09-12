import { app } from "./src";

const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Server running on localhost:${port} 💃💃`))

export { app };
