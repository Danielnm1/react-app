import {useState, useEffect} from 'react';
import {fetchData} from '../utils/fetchData';

const MEDIA_API = import.meta.env.VITE_MEDIA_API;
const AUTH_API = import.meta.env.VITE_AUTH_API;

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const mediaFiles = await fetchData(MEDIA_API + '/media');
        const mediaFilesWithUsernames = await Promise.all(
          mediaFiles.map(async (mediaFile) => {
            const user = await fetchData(
              `${AUTH_API}/users/${mediaFile.user_id}`,
            );
            return {...mediaFile, username: user.username};
          }),
        );
        setMediaArray(mediaFilesWithUsernames);
      } catch (error) {
        console.error('Error fetching media:', error);
      }
    };
    getMedia();
  }, []);

  return {mediaArray};
};

export {useMedia};