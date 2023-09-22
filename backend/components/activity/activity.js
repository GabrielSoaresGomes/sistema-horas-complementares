const ResultValidation = require('../../entity/result-validation');


class Activity {

    constructor(activityRepository) {
        this.activityRepository = activityRepository;
    }

    async createActivity(activityData){
        const resultValidation = new ResultValidation();

        try{
            if (this.#verifyActivityParams(activityData)){
                resultValidation.addError('PARAMS_FAILED', 'Parâmetro obrigatório não foi inserido para criar uma atividade!', false);
                return resultValidation;
            }
            const response = await this.activityRepository.addActivity(activityData);
            if (!response){
                console.log(`Não foi possivel adicionar com dados: ${JSON.stringify(activityData)}!`);
                resultValidation.addError('CREATE_ERROR', 'Não foi possível adicionar uma atividade!', false);
            }
            resultValidation.setResult(response);
        }catch (error){
            console.log(`Falha ao tentar cadastrar uma atividade. Error: ${error}`);
            resultValidation.addError('CREATE_ERROR', 'Falha ao tentar cadastrar uma atividade!', true );
        }
        return resultValidation;
    }

    async listAllActivities(){
        const resultValidation = new ResultValidation();
        try{
            const response = await this.activityRepository.getAllActivities();
            resultValidation.setResult(response);
        }catch (error){
            console.log(`Falha ao listar as atividades, error: ${error}!`);
            resultValidation.addError('GET_ERROR', 'Falha ao listar todas atividades!', true);
        }
        return resultValidation;
    }

    async getActivity(activityId){
        const resultValidation = new ResultValidation();
        try{
            const response = await this.activityRepository.getActivity(activityId);
            if (!response){
                console.log(`Não foi possivel pegar a atividade com o id ${activityId}!`);
                resultValidation.addError('GET_ERROR', 'Não foi possivel pegar a atividade com o id fornecido!', false);
                return resultValidation;
            }
            resultValidation.setResult(response);
        }catch(error){
            console.log(`Falha ao pegar atividade com id: ${activityId}. Error: ${error}`);
            resultValidation.addError('GET_ERROR', 'Falha ao pegar atividade!', true);
        }
        return resultValidation;
    }

    async updateActivity(activityId, activityData){
        const resultValidation = new ResultValidation();
        try{
            if (this.#verifyActivityParams(activityData)){
                resultValidation.addError('PARAMS_FAILED', 'Parâmetro obrigatório não foi inserido para atualizar uma atividade!', false);
                return resultValidation;
            }
            if(!activityId){
                console.log(`O id ${activityId} não é valido para atualizar a atividade!`);
                resultValidation.addError('PARAMS_FAILED', 'O id informado não é valido!', false);
                return resultValidation;
            }
            const response = await this.activityRepository.editActivity(activityId, activityData);
            if (!response){
                console.log(`Não foi possivel atualizar a atividade com o id ${activityId}`);
                resultValidation.addError('UPDATE_ERROR', 'Não foi atualizar a atividade com o id fornecido!', false);
                return resultValidation;
            }
            resultValidation.setResult(response);
        }catch(error){
            console.log(`Não foi possível atualizar a atividade com o id ${activityId}. Error: ${error}`);
            resultValidation.addError('UPDATE_ERROR', 'Não foi possivel atualizar a ativadade!', true);
        }
        return resultValidation;
    }

    async deleteActivity(activityId){
        const resultValidation = new ResultValidation();
        try{
            if (!activityId){
                console.log(`Não foi possivel deletar a atividade com id: ${activityId}`);
                resultValidation.addError('PARAMS_FAILED', 'Não foi possivel deletar a atividade!', false);
                return resultValidation;
            }
            const response = await this.activityRepository.destroyActivity(activityId);
            if (!response){
                console.log(`Não foi possível deletar a ativadade com id: ${activityId}`);
                resultValidation.addError('DELETE_ERROR', 'Não foi possível deletar a atividade!', false);
                return resultValidation;
            }
            resultValidation.setResult(response);
        }catch(error){
            console.log(`Não foi possível deletar a atividade com o id: ${activityId}. Error: ${error}`);
            resultValidation.addError('DELETE_ERROR', 'Erro ao tentar deletar a atividade!', true);
        }
        return resultValidation;
    }

    #verifyActivityParams (activityData) {
        let hasError = false;
        if (!activityData.name){
            console.log('É necessário informar o nome da atividade!');
            hasError = true;
        }else if(!activityData.description){
            console.log('É necessário informar a descrição da atividade!');
            hasError = true;
        }else if (!activityData.type){
            console.log('É necessário informar o tipo da atividade!');
            hasError = true;
        }else if (!activityData.hours_added){
            console.log('É necessário informar as horas adicionadas da atividade!');
            hasError = true;
        }
        return hasError;
    }
}

module.exports = Activity;