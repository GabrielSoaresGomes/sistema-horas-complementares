class EnvironmentValidation {
    constructor() {
        this.envVars = Object.freeze({
            DATABASE_POSTGRES_NAME: process.env.DATABASE_POSTGRES_NAME,
            DATABASE_POSTGRES_USER: process.env.DATABASE_POSTGRES_USER,
            DATABASE_POSTGRES_PASSWORD: process.env.DATABASE_POSTGRES_PASSWORD,
            DATABASE_POSTGRES_HOST: process.env.DATABASE_POSTGRES_HOST,
            DATABASE_POSTGRES_PORT: process.env.DATABASE_POSTGRES_PORT,
            PORT: process.env.PORT || 2004
        });
        this.#validateEnv();
        console.log(`.env foi carregado com sucesso:  ${JSON.stringify(this.envVars)}`);
    }

    #validateEnv() {
        for (const key of Object.keys(this.envVars)) {
            if (this.envVars[key] === undefined) {
                throw new Error(`Variável ${key} está faltando no .env! Verifique o arquivo ${__filename} para saber quais variáveis o componente precisa!`);
            }
        }
    }

    getVar(varName) {
        return this.envVars[varName];
    }
}

module.exports = new EnvironmentValidation();