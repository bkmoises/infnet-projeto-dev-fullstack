import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';  // Importando o Yup
import { editForm, saveForm } from '../store/slices/car/actions';

interface CarState {
  fabricante: string;
  modelo: string;
  ano: string;
  cor: string;
  cavalosDePotencia: string;
  pais: string;
}

interface FormProps {
  isEdit: boolean;
}

const Form: React.FC<FormProps> = ({ isEdit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const car = useSelector((state: { car: { car: CarState } }) => state.car.car);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validationSchema = Yup.object({
    fabricante: Yup.string().required('Fabricante é obrigatório'),
    modelo: Yup.string().required('Modelo é obrigatório'),
    ano: Yup.string()
      .matches(/^\d{4}$/, 'Ano deve ser um número de 4 dígitos')
      .min(4, 'Ano inválido')
      .max(4, 'Ano inválido')
      .required('Ano é obrigatório'),
    cor: Yup.string().required('Cor é obrigatória'),
    cavalosDePotencia: Yup.number()
      .typeError('Potência deve ser um número')
      .positive('Potência deve ser um número positivo')
      .required('Potência é obrigatória'),
    pais: Yup.string().required('País é obrigatório'),
  });

  const validateField = (field: keyof CarState, value: string) => {
    validationSchema
      .validateAt(field, { ...car, [field]: value })
      .then(() => {
        setErrors((prevErrors) => {
          const { [field]: _, ...rest } = prevErrors;
          return rest;
        });
      })
      .catch((err) => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: err.message,
        }));
      });
  };

  const changeField = (field: keyof CarState, value: string) => {
    dispatch(editForm(field, value));
    validateField(field, value);
  };

  const submitForm = () => {
    validationSchema
      .validate(car, { abortEarly: false })
      .then(() => {
        setErrors({});
        dispatch(saveForm(isEdit)).then(() => navigate('/'));
      })
      .catch((err) => {
        const newErrors: { [key: string]: string } = {};
        err.inner.forEach((e: Yup.ValidationError) => {
          newErrors[e.path!] = e.message;
        });
        setErrors(newErrors);
      });
  };

  return (
    <div className="cadastro max-w-sm mx-auto">
      <div className="field mb-5">
        <label htmlFor="fabricante" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-20">Fabricante:</label>
        <input
          value={car.fabricante ?? ''}
          onChange={(e) => changeField('fabricante', e.target.value)}
          type="text"
          id="fabricante"
          placeholder="Digite o fabricante"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {errors.fabricante && <p className="text-red-500 text-sm">{errors.fabricante}</p>}
      </div>

      <div className="field mb-5">
        <label htmlFor="modelo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Modelo:</label>
        <input
          value={car.modelo ?? ''}
          onChange={(e) => changeField('modelo', e.target.value)}
          type="text"
          id="modelo"
          placeholder="Digite o modelo"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {errors.modelo && <p className="text-red-500 text-sm">{errors.modelo}</p>}
      </div>

      <div className="field mb-5">
        <label htmlFor="ano" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ano:</label>
        <input
          value={car.ano ?? ''}
          onChange={(e) => changeField('ano', e.target.value)}
          type="text"
          id="ano"
          placeholder="Digite o ano"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {errors.ano && <p className="text-red-500 text-sm">{errors.ano}</p>}
      </div>

      <div className="field mb-5">
        <label htmlFor="cor" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cor:</label>
        <input
          value={car.cor ?? ''}
          onChange={(e) => changeField('cor', e.target.value)}
          type="text"
          id="cor"
          placeholder="Digite a cor"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {errors.cor && <p className="text-red-500 text-sm">{errors.cor}</p>}
      </div>

      <div className="field mb-5">
        <label htmlFor="cavalosDePotencia" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Potência:</label>
        <input
          value={car.cavalosDePotencia ?? ''}
          onChange={(e) => changeField('cavalosDePotencia', e.target.value)}
          type="text"
          id="cavalosDePotencia"
          placeholder="Digite a potência"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {errors.cavalosDePotencia && <p className="text-red-500 text-sm">{errors.cavalosDePotencia}</p>}
      </div>

      <div className="field mb-5">
        <label htmlFor="pais" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">País:</label>
        <input
          value={car.pais ?? ''}
          onChange={(e) => changeField('pais', e.target.value)}
          type="text"
          id="pais"
          placeholder="Digite o país"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {errors.pais && <p className="text-red-500 text-sm">{errors.pais}</p>}
      </div>

      <div className="publicar">
        <button
          onClick={submitForm}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Cadastrar
        </button>
      </div>
    </div>
  );
};

export default Form;
