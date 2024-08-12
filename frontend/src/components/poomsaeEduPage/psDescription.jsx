import PropTypes from 'prop-types';

const PsDescription = ({ description = 'No description available.', className }) => {
  return (
    <div className={className}>
      <p>{description}</p>
    </div>
  );
};

PsDescription.propTypes = {
  description: PropTypes.string, // Make this optional
  className: PropTypes.string,
};

export default PsDescription;
