import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Button, Typography, Paper } from '@mui/material';
import Cookies from 'js-cookie';


const GetPDFs = () => {
  const [pdfs, setPdfs] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedPdf, setSelectedPdf] = useState(null); 

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const jwtToken = Cookies.get('accessToken'); 

        const response = await axios.get(
          `${apiUrl}/student/getPdfs`,
          {
            headers: {
              'Authorization': `Bearer ${jwtToken}`, 
            },
          }
        );
        if (response.data.files) {
          setPdfs(response.data.files); 
        }
        setLoading(false);
      } catch (error) {
        setMessage('Error loading PDF list');
        setLoading(false);
      }
    };

    fetchPdfs();
  }, []);

  const handleDownload = (url) => {
    setSelectedPdf(url);  
  };

  return (
    <Grid container spacing={4} sx={{ padding: '20px' }}>
      {/* Left side: PDF list */}
      <Grid item xs={12} md={6}>
        <Paper sx={{
          padding: 3, 
          boxShadow: 3, 
          borderRadius: 2, 
          backgroundColor: '#f5f5f5',
          minHeight: '500px'
        }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#333' }}>
            Available PDFs
          </Typography>
          {loading ? (
            <Typography variant="body1" color="textSecondary">Loading...</Typography>
          ) : message ? (
            <Typography variant="body1" color="error">{message}</Typography>
          ) : pdfs.length === 0 ? (
            <Typography variant="body1" color="textSecondary">No PDFs available.</Typography>
          ) : (
            <div>
              {pdfs.map((pdf) => (
                <Paper key={pdf._id} sx={{ marginBottom: 2, padding: 2, backgroundColor: '#ffffff' }}>
                  <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item xs={8}>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {pdf.fileName}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{
                          padding: '8px 16px',
                          '&:hover': {
                            backgroundColor: '#1976d2',
                            transform: 'scale(1.05)',
                          }
                        }}
                        onClick={() => handleDownload(pdf.url)}
                      >
                        View PDF
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              ))}
            </div>
          )}
        </Paper>
      </Grid>

      {/* Right side: PDF iframe */}
      <Grid item xs={12} md={6}>
        {selectedPdf && (
          <Paper sx={{
            padding: 3, 
            boxShadow: 3, 
            borderRadius: 2, 
            backgroundColor: '#ffffff',
            minHeight: '500px'
          }}>
            <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 2 }}>
              PDF Viewer
            </Typography>
            <iframe
              src={selectedPdf}
              width="100%"
              height="600px"
              style={{ border: 'none', borderRadius: '8px' }}
              title="PDF Viewer"
            ></iframe>
          </Paper>
        )}
      </Grid>
    </Grid>
  );
};

export default GetPDFs;
