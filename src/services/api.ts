import http from '../config/http';

type RequestFunc<T> = () => Promise<T>;

async function handleRequest<T>(requestFunc: RequestFunc<T>, errorMessage: string): Promise<T> {
  try {
    const response = await requestFunc();
    return response?.data;
  } catch (error) {
    console.error(error);
    throw new Error(errorMessage);
  }
}

export interface Car {
  id: string;
  fabricante: string;
  modelo: string;
  ano: string;
  cor: string;
  potencia: string;
  pais: string;
}

interface SearchParams {
  pais?: string;
  modelo?: string;
  fabricante?: string;
}

const isValidJwt = (token) => {
  if (!token) return false;

  try {
    const [, payloadBase64] = token.split('.');
    if (!payloadBase64) return false;

    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);

    if (!payload.exp || Date.now() >= payload.exp * 1000) {
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erro ao validar o token JWT:', error);
    return false;
  }
};

const validateJwtBeforeRequest = async (requestFn) => {
  const token = localStorage.getItem('authToken');

  if (!isValidJwt(token)) {
    throw new Error('Token JWT inválido ou expirado. Faça login novamente.');
  }

  return requestFn();
};

export const getDataApi = async (): Promise<Car[]> => {
  return validateJwtBeforeRequest(() =>
    handleRequest(() => http.get('/carros'), 'Não foi possível obter os dados')
  );
};

export const deleteCarApi = async (id: string): Promise<void> => {
  return validateJwtBeforeRequest(() =>
    handleRequest(() => http.delete(`/carros/${id}`), 'Não foi possível excluir o carro')
  );
};

export const createCarApi = async (data: Car): Promise<Car> => {
  return validateJwtBeforeRequest(() =>
    handleRequest(() => http.post('/carros', data), 'Não foi possível criar esse carro')
  );
};

export const updateCarApi = async (data: Car): Promise<Car> => {
  return validateJwtBeforeRequest(() =>
    handleRequest(() => http.put(`/carros/${data.id}`, data), 'Não foi possível atualizar as informações do carro')
  );
};

export const getDataByIdApi = async (id: string): Promise<Car> => {
  return validateJwtBeforeRequest(() =>
    handleRequest(() => http.get(`/carros/${id}`), 'Carro não encontrado')
  );
};

export const getAllCarsByPageApi = async (page: number, size: number): Promise<Car[]> => {
  return validateJwtBeforeRequest(() =>
    handleRequest(() => http.get(`/carros?page=${page}&size=${size}`), 'Não foi possível obter os dados')
  );
};

export const exportDataApi = async () => {
  return validateJwtBeforeRequest(async () => {
    try {
      const response = await http.get(`/carros/export-cars`, {
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'carros.csv';
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      throw new Error("Não foi possível exportar os dados");
    }
  });
};
