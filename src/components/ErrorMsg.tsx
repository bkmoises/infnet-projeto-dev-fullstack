import React from 'react';
import { Link } from 'react-router-dom';

const ButtonLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <Link
    to={to}
    className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-500 transition duration-200"
  >
    {children}
  </Link>
);

const ErrorMsg: React.FC = React.memo(() => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-gray-900" role="alert">
      <h2 className="text-2xl font-bold text-white mb-2" aria-live="assertive">
        Carro não encontrado
      </h2>
      <p className="text-gray-300 mb-6">
        Não foi possível localizar o carro informado.
      </p>
      <ButtonLink to="/">Retornar para a página inicial</ButtonLink>
    </div>
  );
});

export default ErrorMsg;
