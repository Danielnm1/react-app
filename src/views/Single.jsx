import {useLocation, useNavigate} from 'react-router';

const Single = () => {
  const location = useLocation();
  const item = location.state;
  const navigate = useNavigate();

  if (!item) {
    return (
      <>
        <h2>No media item selected</h2>
        <button onClick={() => navigate(-1)}>Go back</button>
      </>
    );
  }

  return (
    <>
      <h2>Single media file</h2>
      <h3>{item.title}</h3>
      {item.media_type.startsWith('image') ? (
        <img src={item.filename} alt={item.description || item.title} />
      ) : (
        <video controls>
          <source src={item.filename} type={item.media_type} />
        </video>
      )}
      <p>{item.description}</p>
      <p>Created: {new Date(item.created_at).toLocaleString('fi-FI')}</p>
      <p>Size: {item.filesize} bytes</p>
      <p>Type: {item.media_type}</p>
      <button onClick={() => navigate(-1)}>Go back</button>
    </>
  );
};

export default Single;
