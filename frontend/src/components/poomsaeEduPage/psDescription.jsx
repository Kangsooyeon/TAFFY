import PropTypes from 'prop-types';

const PsDescription = ({ description }) => {
  return (
    <div className="psInfo">
      <p>{description}</p>
    </div>
  );
};

PsDescription.propTypes = {
  description: PropTypes.string.isRequired,
};

export default PsDescription;
