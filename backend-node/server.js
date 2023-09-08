const app = require('./main');
const env = require("./environment-validation");

const PORT = env.getVar('PORT');

app.listen(PORT, () => {
    console.log(`Aplicação rodando na porta ${PORT}`);
});