import PropTypes from 'prop-types';

const SingleView = (props) => {
  const { item, setSelectedItem } = props;

  if (!item) return null;

  return (
    <dialog open>
      <button onClick={() => setSelectedItem(null)}>Close</button>
      <h3>{item.title}</h3>
      {item.media_type.startsWith('image') ? (
        <img src={item.filename} alt={item.description || item.title} />
      ) : (
        <video controls>
          <source src={item.filename} type={item.media_type} />
        </video>
      )}
      <p>{item.description}</p>
    </dialog>
  );
};

SingleView.propTypes = {
  item: PropTypes.object,
  setSelectedItem: PropTypes.func.isRequired,
};

export default SingleView;