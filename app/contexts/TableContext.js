/*
 * We manage the current table with a context because contexts persist globally.
 * This allows tables to be read and updated easily across all files.
 */
import React, { createContext, useState } from "react";

// Create the context
export const TableContext = createContext();

// Create the provider component
export const TableProvider = ({ children }) => {
  //Actually track the currentTable in a useState.
  const [currentTable, setCurrentTable] = useState(1);
  //Wrap the context provider around the children. This allows all code to still be rendered inside the component.
  return (
    <TableContext.Provider value={{ currentTable, setCurrentTable }}>
      {children}
    </TableContext.Provider>
  );
};
