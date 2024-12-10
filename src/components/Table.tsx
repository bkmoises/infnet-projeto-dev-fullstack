import { useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { deleteCar } from "../store/slices/car/actions";
import { columns } from '../config/car-columns';

interface Car {
  id: number;
  fabricante: string;
  modelo: string;
  ano: number;
  cor: string;
  cavalosDePotencia: number;
  pais: string;
}

const Table: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cars } = useSelector((state: RootState) => state.car);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const handleDeleteCar = async (id: number) => {
    await dispatch(deleteCar(id));
  };

  const indexOfLastCar = currentPage * itemsPerPage;
  const indexOfFirstCar = indexOfLastCar - itemsPerPage;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(cars.length / itemsPerPage);

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md mt-10">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columns.car.map((column, i) => (
                <th scope="col" className="px-6 py-3" key={i}>{column}</th>
              ))}
              <th scope="col" className="px-6 py-3">Editar</th>
              <th scope="col" className="px-6 py-3">Excluir</th>
            </tr>
          </thead>
          <tbody>
            {currentCars.map((car: Car, i: number) => (
              <tr
                key={i}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {car.id}
                </td>
                <td className="px-6 py-4">
                  {car.fabricante}
                </td>
                <td className="px-6 py-4">
                  {car.modelo}
                </td>
                <td className="px-6 py-4">
                  {car.ano}
                </td>
                <td className="px-6 py-4">
                  {car.cor}
                </td>
                <td className="px-6 py-4">
                  {car.cavalosDePotencia}
                </td>
                <td className="px-6 py-4">
                  {car.pais}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => navigate(`/detalhes/${car.id}`)}
                    className="btn btn-editar text-blue-600 hover:underline"
                  >
                    <FaEdit />
                  </button>
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleDeleteCar(car.id)}
                    className="btn btn-excluir text-red-600 hover:underline"
                  >
                    <FaTrashCan />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
        >
          Anterior
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'} rounded-lg hover:bg-gray-400`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
        >
          Próximo
        </button>
      </div>
    </div>
  );
};

export default Table;
