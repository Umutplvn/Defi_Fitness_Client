import { Box, Button } from '@mui/material';
import React, { useRef, useState, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import useDataCall from '../hooks/useDataCall';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
  const editor = useRef(null);
  const [blogData, setBlogData] = useState({ content: '' });
  const { createBlog } = useDataCall();
  const navigate=useNavigate()

  const openWidget = () => {
    if (window.cloudinary) {
      const myWidget = window.cloudinary.createUploadWidget(
        {
          cloudName: 'dhaltl88a',
          uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
        },
        (error, result) => {
          if (!error && result && result.event === 'success') {
            const imageUrl = result.info.secure_url;
            setBlogData(prevBlogData => ({
              ...prevBlogData,
              content: `${prevBlogData.content}<img src="${imageUrl}" alt="Uploaded Image"/>`
            }));
          } else if (error) {
            console.error('Error uploading image:', error);
          }
        }
      );
      myWidget.open();
    } else {
      console.error('Cloudinary is not loaded.');
    }
  };


  const config = useMemo(() => ({
    height: '80vh',
    readonly: false,
  }), []);

  const handleSubmit = async () => {
    if (blogData?.content?.trim() === '') {
      toast('Blog content cannot be empty.');
      return; 
    }

    try {
      await createBlog(blogData);
      setBlogData({ content: '' });
      toast("Blog successfully created")
      navigate("/blogs")
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
        value={blogData.content}
        config={config}
        tabIndex={1}
        onChange={newContent => setBlogData({ content: newContent })}
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
          onClick={() => {
            setBlogData({ content: '' }); 
          }}
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
