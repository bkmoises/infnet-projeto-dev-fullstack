import { Dispatch } from 'redux';
import Swal from 'sweetalert2';
import { getDataApi, getDataByIdApi, updateCarApi, createCarApi, deleteCarApi } from '../../../services/api';
import { Car } from './reducer';
import { setCars, setCar } from './reducer';

interface Action<T> {
    type: string;
    payload: T;
}

export const getAllCars = () => async (dispatch: Dispatch<Action<Car[]>>) => {
    try {
        const res = await getDataApi();
        dispatch(setCars(res));
    } catch (error) {
        console.error(`Erro ao obter carros: ${error}`);
        Swal.fire({
            title: 'Erro ao obter carros',
            icon: 'error',
            confirmButtonText: 'OK',
        });
    }
};

export const getAllCar = (id: string) => async (dispatch: Dispatch<Action<Car>>) => {
    try {
        const res = await getDataByIdApi(id);
        dispatch(setCar(res));
    } catch (error) {
        console.error(`Erro ao obter carro com ID ${id}: ${error}`);
        Swal.fire({
            title: 'Erro ao obter carro',
            icon: 'error',
            confirmButtonText: 'OK',
        });
    }
};

export const editForm = (field: string, value: string) => async (dispatch: Dispatch<Action<Car>>, getState: () => { car: { car: Car } }) => {
    const { car } = getState().car;
    dispatch(setCar({
        ...car,
        [field]: value
    }));
};

export const saveForm = (editForm = false) => async (dispatch: Dispatch<Action<Car[]>>, getState: () => { car: { car: Car } }) => {
    try {
        const { car } = getState().car;
        const action = editForm ? updateCarApi : createCarApi;
        await action(car);

        dispatch(getAllCars());

        Swal.fire({
            title: 'Informações salvas com sucesso',
            icon: 'success',
            confirmButtonText: 'OK'
        });
        
    } catch (error) {
        Swal.fire({
            title: 'Não foi possível registrar essas informações',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        console.error(`Erro ao salvar informações: ${error}`);
    }
};

export const deleteCar = (id: string) => async (dispatch: Dispatch<Action<Car[]>>) => {
    try {
        Swal.fire({
            title: 'Deseja excluir esse registro?',
            text: "Essa ação é irreversível",
            icon: 'info',
            confirmButtonText: 'Excluir',
            cancelButtonText: 'Cancelar',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            iconColor: '#d33'
        }).then(async (r) => {
            if (r.isConfirmed) {
                await deleteCarApi(id);
                Swal.fire({
                    title: 'Registro excluído com sucesso',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            }
            dispatch(getAllCars());
        }).catch(() => {
            Swal.fire({
                title: 'Erro ao excluir registro',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });
    } catch (error) {
        Swal.fire({
            title: 'Erro ao excluir registro',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        console.error(`Erro ao excluir registro: ${error}`);
    }
};
