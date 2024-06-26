import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchAdminPayload } from '../../utils/api/api';
import { makeStyles } from '@material-ui/core/styles';
import VideosView from './Videos.view';

const useStyles = makeStyles({
  cardAction: {
    height: '35px',
    padding: '5px 0px 5px 10px',
    borderTop: '1px solid rgba(117,117,117,0.4)',
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardContent: {
    marginTop: '-70px',
  },
});

function Videos() {
  const classes = useStyles();
  const history = useHistory();
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const { sports } = await fetchAdminPayload();

        if (sports) {
          setVideos(sports);
        } else {
          w;
          console.error('Videos not found');
        }
      } catch (error) {
        console.error('Failed to fetch videos details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideoDetails();
  }, []);

  const handleVideoClick = (videoId) => {
    history.push(`/video/${videoId}`);
  };

  console.log('videos', videos);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <VideosView videos={videos} handleVideoClick={handleVideoClick} classes={classes} />
    </div>
  );
}

export default Videos;
