import { app } from "./index.js";

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log("app is listening on port", PORT)
})