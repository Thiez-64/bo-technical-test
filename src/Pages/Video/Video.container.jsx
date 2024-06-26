import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VideoView from './Video.view';
import { fetchAdminPayload } from '../../utils/api/api';
import NotAvailable from '../NotAvailable';

function VideoContainer() {
  const { id } = useParams();
  const [detail, setDetail] = useState({ title: '', description: '' });
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const initialValues = { title: detail.title, description: detail.description };

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const { sports } = await fetchAdminPayload();
        if (sports.length > 0) {
          const videoDetails = sports.find((video) => video.id === id);
          const { name, description } = videoDetails;
          setDetail({ title: name, description });
        } else {
          console.error('Video not found');
        }
      } catch (error) {
        console.error('Failed to fetch video details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideoDetails();
  }, []);

  const handleSubmit = (value) => {
    setIsOpen(true);
    setDetail(value);
  };
  if (id === ':id') {
    return <NotAvailable />;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <VideoView
        onSubmit={handleSubmit}
        title={detail.title ?? ''}
        description={detail.description ?? ''}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setDetail={setDetail}
        initialValues={initialValues}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
    </div>
  );
}

export default VideoContainer;
