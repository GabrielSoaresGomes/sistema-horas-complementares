AZUL='\033[0;34m'
NC='\033[0m'

echoFormatted() {
    echo ''
    echo -e "$AZUL $1 $NC"
    echo ''
    sleep 1
}

echoFormatted '### Iniciando execução! ###'
cp ./backend/.env-local ./backend/.env

echoFormatted '### Conteúdo do .env ###'
cat ./backend/.env

echoFormatted '### Iniciando build ###'
docker build . -t my:horas_complementares

echoFormatted '### Subindo docker-compose ###'
docker-compose -f docker-compose.yml up -d --build


