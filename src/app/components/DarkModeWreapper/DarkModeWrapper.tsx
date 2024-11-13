import React, { ReactNode } from "react";

interface DarkModeWrapperProps {
  children: ReactNode;
}

const DarkModeWrapper: React.FC<DarkModeWrapperProps> = ({ children }) => {
  return (
    <div className="bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200 min-h-screen">
      {children}
    </div>
  );
};

export default DarkModeWrapper;
