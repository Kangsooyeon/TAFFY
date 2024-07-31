import PropTypes from 'prop-types';

const PsDescription = ({ description, className }) => {
  return (
    <div className={className}>
      <p>{description}</p>
    </div>
  );
};

PsDescription.propTypes = {
  description: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default PsDescription;
