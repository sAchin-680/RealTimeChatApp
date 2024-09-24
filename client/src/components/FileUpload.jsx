import React from 'react';
import axios from 'axios';

const FileUpload = () => {
  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/upload', formData);
      console.log('File uploaded:', response.data.fileUrl);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input
        type='file'
        onChange={(e) => {
          if (e.target.files.length > 0) {
            handleFileUpload(e.target.files[0]);
          }
        }}
      />
    </div>
  );
};

export default FileUpload;
