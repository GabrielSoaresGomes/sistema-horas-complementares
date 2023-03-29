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
)
if [[ ! -z "$1" ]]; then
    command=${commands_map[$1]}
    echo "$command"
    if [ command == "logs" ]; then
        echo 'ooiii'
    fi
fi