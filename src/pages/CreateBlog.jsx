import { Box, Button } from '@mui/material';
import React, { useRef, useState, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import useDataCall from '../hooks/useDataCall'; // Uygun bir şekilde import et

const CreateBlog = () => {
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const { createBlog } = useDataCall();

  // Cloudinary Upload Widget
  const myWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: 'dl1dmkgzh', // Cloudinary cloud name
      uploadPreset: 'DEFI_BLOGS', // Upload preset
    },
    (error, result) => {
      if (!error && result && result.event === 'success') {
        const imageUrl = result.info.secure_url;
        setContent(prevContent => `${prevContent}<img src="${imageUrl}" alt="Uploaded Image"/>`);
      } else if (error) {
        console.error('Error uploading image:', error);
      }
    }
  );

  const openWidget = () => {
    myWidget.open();
  };

  // JoditEditor konfigürasyonu
  const config = useMemo(() => ({
    height: '80vh',
    readonly: false,
    // JoditEditor için herhangi bir özel yapılandırma ekleyebilirsiniz
  }), []);

  // İçeriği gönderme işlemi
  const handleSubmit = async () => {
    try {
      await createBlog(content);
      setContent(''); // İçeriği temizle
    } catch (error) {
      console.error('Error posting content:', error);
    }
  };

  return (
    <Box
      sx={{
        ml: { xs: '0', sm: '4.5rem', md: '10rem' },
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '1536px',
        width: '100%',
        height: '100vh',
        overflow: 'scroll',
      }}
    >
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={1}
        onChange={newContent => setContent(newContent)}
      />
      <Box sx={{ display: 'flex', gap: '1rem', width: '100%', justifyContent: 'center' }}>
        <Button
          variant="contained"
          sx={{
            mt: 4,
            mb: 5,
            textAlign: 'center',
            backgroundColor: '#000000',
            color: 'white',
            borderRadius: '0.7rem',
            width: '5rem',
            transition: '0.2s',
            '&:hover': {
              backgroundColor: '#37a629',
              color: 'white',
            },
          }}
          onClick={handleSubmit}
        >
          Post
        </Button>
        <Button
          variant="contained"
          onClick={() => setContent('')}
          sx={{
            mt: 4,
            mb: 5,
            textAlign: 'center',
            backgroundColor: '#000000',
            color: 'white',
            borderRadius: '0.7rem',
            width: '5rem',
            transition: '0.2s',
            '&:hover': {
              backgroundColor: '#bc3a3a',
              color: 'white',
            },
          }}
        >
          Clear
        </Button>
        <Button
          variant="contained"
          onClick={openWidget}
          sx={{
            mt: 4,
            mb: 5,
            textAlign: 'center',
            backgroundColor: '#000000',
            color: 'white',
            borderRadius: '0.7rem',
            width: '5rem',
            transition: '0.2s',
            '&:hover': {
              backgroundColor: '#0078d4',
              color: 'white',
            },
          }}
        >
          Upload
        </Button>
      </Box>
    </Box>
  );
};

export default CreateBlog;
