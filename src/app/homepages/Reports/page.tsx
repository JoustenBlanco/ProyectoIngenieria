import React from 'react';
import Header from '../../components/Landign/header';
import ReportsOptions from '../../components/Reports/Options';
import Text from '../../components/Atoms/text';

const ReportsPage = () => {
  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <Header />
      <main className="flex flex-col items-center p-8 bg-blue-600">
        <Text variant="title">Reportes</Text>
        <ReportsOptions />
      </main>
      <footer className="bg-blue-900 text-center py-4 mt-auto">
        <p>Liceo San Pedro-Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default ReportsPage;
