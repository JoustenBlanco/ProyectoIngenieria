import './globals.css';
import { Inter } from 'next/font/google';
import Footer from './components/Landign/footer';
import ClientWrapper from './components/ClientWrapper'; 
import SessionProviderWrapper from './components/authProvider';


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'RAE-LSP',
  description: 'Sistema de registro de asistencia a clases de los estudiantes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-b from-[#E6FAFF] dark:from-[#0b1130] to-white dark:to-gray-900 flex flex-col min-h-screen p-2 justify-center items-center h-screen md:p-8`}>
        <div className="flex flex-col w-full h-full">
          <div className="flex flex-1 overflow-hidden w-full shadow-xl rounded-2xl h-full">
            <SessionProviderWrapper>
            <ClientWrapper>
              {children}
            </ClientWrapper>
            </SessionProviderWrapper>
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
