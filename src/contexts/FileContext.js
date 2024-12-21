import React, { createContext, useState, useContext } from 'react';

const FileContext = createContext();

export const useFileContext = () => useContext(FileContext);

export const FileProvider = ({ children }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const addFiles = (files) => {
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const removeFile = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <FileContext.Provider value={{ selectedFiles, setSelectedFiles, uploadedFiles, setUploadedFiles, addFiles, removeFile }}>
      {children}
    </FileContext.Provider>
  );
};
