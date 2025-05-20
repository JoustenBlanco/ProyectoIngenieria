import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-transparent transition-colors duration-300">
      <div className="flex flex-col items-center">
        <div className="mb-4 flex items-center justify-center">
          <span className="escudo-animado w-16 h-16 block">
            <img
              src="/images/escudo.svg"
              alt="Escudo"
              className="w-full h-full object-contain"
              draggable={false}
            />
          </span>
        </div>
        <div className="flex items-center mb-2">
          <span className="rae-animated-text text-3xl font-extrabold text-blue-600 dark:text-blue-400 tracking-widest select-none">
            RAE LSP
          </span>
        </div>
        <div className="mt-2 text-base text-gray-700 dark:text-gray-200 tracking-wide font-medium select-none text-center">
          Cargando...
        </div>
        <style>
          {`
            .escudo-animado, .rae-animated-text {
              animation: sutil-latido 1.6s cubic-bezier(0.4,0,0.2,1) infinite;
              will-change: transform, opacity;
            }
            @keyframes sutil-latido {
              0% {
                transform: scale(1);
                opacity: 0.85;
              }
              30% {
                transform: scale(1.06);
                opacity: 1;
              }
              60% {
                transform: scale(1);
                opacity: 0.95;
              }
              100% {
                transform: scale(1);
                opacity: 0.85;
              }
            }
          `}
        </style>
      </div>
    </div>
  );
}
