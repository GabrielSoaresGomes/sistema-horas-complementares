# Executar enquanto o projeto estiver rodando
if [ "$1" == "migrate" ];then
    docker-compose exec web python backend/manage.py migrate
elif [ "$1" == "makemigrations" ];then
    docker-compose exec web python backend/manage.py makemigrations
else
    echo "Argumento inválido, insira com um dos 2 argumentos à seguir: [ migrate | makemigrations ]"
fi
