import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { deleteCar, getAllCarsPaged } from "../store/slices/car/actions";
import { columns } from "../config/car-columns";

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
  
  const carros = useSelector((state: RootState) => state.car.cars);
  const pagination = useSelector((state: RootState) => state.car.pagination);
  
  const [busca, setBusca] = useState<string>("");
  const itensPorPagina = pagination.size;

  useEffect(() => {
    dispatch(getAllCarsPaged(pagination.page, itensPorPagina));
  }, [dispatch, pagination.page, itensPorPagina]);

  // Filtro de busca
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusca(e.target.value);
  };

  const filteredCars = Array.isArray(carros)
    ? carros.filter((car) =>
        car.modelo.toLowerCase().includes(busca.toLowerCase())
      )
    : [];

  const handleDeleteCar = async (id: number) => {
    await dispatch(deleteCar(id));
  };

  const handlePageChange = (pageNumber: number) => {
    dispatch(getAllCarsPaged(pageNumber, itensPorPagina));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Lista de Carros</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Digite o nome do modelo"
          value={busca}
          onChange={handleSearchChange}
          className="p-2 w-full bg-gray-700 text-white rounded-lg"
        />
      </div>

      <div className="relative overflow-x-auto shadow-md mt-10">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columns.car.map((column, i) => (
                <th scope="col" className="px-6 py-3" key={i}>
                  {column}
                </th>
              ))}
              <th scope="col" className="px-6 py-3">Editar</th>
              <th scope="col" className="px-6 py-3">Excluir</th>
            </tr>
          </thead>
          <tbody>
            {filteredCars.length > 0 ? (
              filteredCars.map((car: Car, i: number) => (
                <tr
                  key={i}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {car.id}
                  </td>
                  <td className="px-6 py-4">{car.fabricante}</td>
                  <td className="px-6 py-4">{car.modelo}</td>
                  <td className="px-6 py-4">{car.ano}</td>
                  <td className="px-6 py-4">{car.cor}</td>
                  <td className="px-6 py-4">{car.cavalosDePotencia}</td>
                  <td className="px-6 py-4">{car.pais}</td>
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
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-4 text-gray-400">
                  Nenhum carro encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={() => handlePageChange(pagination.page - 1)}
          disabled={pagination.page === 0}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg mr-2"
        >
          Anterior
        </button>

        <span className="text-white">
          Página {pagination.page} de {pagination.totalPages}
        </span>

        <button
          onClick={() => handlePageChange(pagination.page + 1)}
          disabled={pagination.page === pagination.totalPages}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg ml-2"
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default Table;
