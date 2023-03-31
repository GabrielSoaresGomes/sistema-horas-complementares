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
)
if [[ ! -z "$1" ]]; then
    command=${commands_map[$1]}
    if [ "$command" == "logs" ]; then
        docker logs --follow sistema-horas-complementares_web_1
    elif [ "$command" == "terminal" ]; then
        docker exec -it sistema-horas-complementares_web_1 bash
    elif [ "$command" == "stop" ]; then
        docker stop sistema-horas-complementares_web_1
    elif [ "$command" == "start" ]; then
        docker start sistema-horas-complementares_web_1
    elif [ "$command" = "stop-postgres" ]; then
        docker stop postgres-horas-complementares
    elif [ "$command" = "start-postgres" ]; then
        docker start postgres-horas-complementares
    elif [ "$command" = "fill-database" ]; then
        psql -h localhost -U postgres horas_complementares -a -p 15433 -f fill_database.sql
    fi
fi