import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = React.memo(() => {
  return (
    <footer className="bg-white shadow dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{' '}
          <Link to="/" className="hover:underline">
            Lista de Carros™
          </Link>
          . Todos os direitos reservados.
        </span>
      </div>
    </footer>
  );
});

export default Footer;