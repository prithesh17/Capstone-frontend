import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const UploadPdfs = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;
  const jwtToken = Cookies.get('accessToken'); 

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleNameChange = (e) => {
    setFileName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !fileName) {
      setMessage('Please provide both file and file name.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);

    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post(
        `${apiUrl}/subject/uploadPDF`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      setMessage(`File uploaded successfully`);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Something went wrong.';
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3 style={styles.header}>Upload a PDF</h3>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>File Name:</label>
            <input
              type="text"
              value={fileName}
              onChange={handleNameChange}
              placeholder="Enter file name"
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Choose File:</label>
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf"
              required
              style={styles.fileInput}
            />
          </div>
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </form>
        {message && <p style={{ ...styles.message, color: loading ? '#007bff' : '#dc3545' }}>{message}</p>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '30px',
    width: '400px',
    textAlign: 'center',
  },
  header: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  inputGroup: {
    marginBottom: '15px',
    textAlign: 'left',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    marginBottom: '5px',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  fileInput: {
    fontSize: '14px',
    padding: '5px',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  message: {
    marginTop: '20px',
    fontSize: '14px',
  },
};

export default UploadPdfs;
