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

    ["start-postgres"]="start-postgres"
    ["s-postgres"]="start-postgres"
    ["start-p"]="start-postgres"
    ["s-p"]="start-postgres"
    ["sp"]="start-postgres"

    ["stop-postgres"]="stop-postgres"
    ["stop-p"]="stop-postgres"

    ["fill-database"]="fill-database"

    ["m"]="migrate"
    ["migrate"]="migrate"

    ["makemigrations"]="makemigrations"
    ["mm"]="makemigrations"
)

ordered_keys=("l" "log" "logs" "|" "t" "terminal" "|" "s" "start" "|" "stop" "|" "start-postgres" "s-postgres" "start-p" "s-p" "sp" "|" "stop-postgres" "stop-p" "|" "fill-database" "|" "m" "migrate" "|" "makemigrations" "mm")

if [ -v commands_map["$1"] ]; then
    command=${commands_map[$1]}
    if [ "$command" == "logs" ]; then
        docker logs --follow sistema-horas-complementares-web-1
    elif [ "$command" == "terminal" ]; then
        docker exec -it sistema-horas-complementares-web-1 bash
    elif [ "$command" == "stop" ]; then
        docker stop sistema-horas-complementares-web-1
    elif [ "$command" == "start" ]; then
        docker start sistema-horas-complementares-web-1
    elif [ "$command" = "stop-postgres" ]; then
        docker stop postgres-horas-complementares
    elif [ "$command" = "start-postgres" ]; then
        docker start postgres-horas-complementares
    elif [ "$command" = "fill-database" ]; then
        docker exec -it postgres-horas-complementares psql -h localhost -U postgres horas_complementares -a -p 5432 -f fill_database.sql
    elif [ "$command" = "migrate" ]; then
        docker-compose exec web python backend/manage.py migrate
    elif [ "$command" = "makemigrations" ]; then
        docker-compose exec web python backend/manage.py makemigrations
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
