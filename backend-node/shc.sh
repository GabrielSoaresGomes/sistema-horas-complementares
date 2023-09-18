AZUL='\033[0;34m'
VERMELHO='\033[31m'
CIANO='\033[36m'
NC='\033[0m'

# Executar enquanto o projeto estiver rodando
declare -A commands_map=(
    ["l"]="logs"
    ["log"]="logs"
    ["logs"]="logs"

    ["t"]="terminal"
    ["terminal"]="terminal"

    ["s"]="start"
    ["start"]="start"

    ["stop"]="stop"

    ["b"]="build"
    ["build"]="build"
)

ordered_keys=("l" "log" "logs" "|" "t" "terminal" "|" "s" "start" "|" "stop" "|" "b" "build")

if [ -v commands_map["$1"] ]; then
    command=${commands_map[$1]}
    if [ "$command" == "logs" ]; then
        docker-compose logs -f shc-app
    elif [ "$command" == "terminal" ]; then
        docker-compose exec shc-app bash
    elif [ "$command" == "stop" ]; then
        docker-compose stop shc-app
        docker-compose stop shc-db
    elif [ "$command" == "start" ]; then
        docker-compose up -d
    elif [ "$command" == "build" ]; then
        if [ "$2" == "dev" ]; then
            # cp .env-dev .env
            cp .env-local .env
        elif [ "$2" == "prod" ]; then
            # cp .env-prod .env
            cp .env-local .env
        else
            cp .env-local .env
        fi
        docker-compose up --build -d
    fi
else
    echo -e "$VERMELHO""Comando não encontrado, utilize alguns dos comandos abaixo: $NC\n"
    for key in "${ordered_keys[@]}"; do
        if [ "$key" = "|" ]; then
            echo ""
        else
            value="${commands_map[$key]}"
            echo -e "$AZUL$key$NC = $CIANO$value$NC"
        fi
    done
fi