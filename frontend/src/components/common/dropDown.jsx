import { useRef} from "react";
import useDetectClose from "../../hooks/useDetectClose";
import '../../styles/common/dropDown.css';
import PropTypes from 'prop-types';

const Dropdown = ({ options, selectedOption, onOptionSelect }) => {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useDetectClose(dropdownRef, false);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button className="dropdownToggle" onClick={() => setIsOpen(!isOpen)}>
        <img src={selectedOption} alt="Selected Language" className='lang'/>
      </button>
      <div className={`menu ${isOpen ? 'active' : ''}`}>
        {options.map((option) => (
          <button key={option} onClick={() => {
            onOptionSelect(option.value);
            setIsOpen(false);
          }}>
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  selectedOption: PropTypes.string.isRequired,
  onOptionSelect: PropTypes.func.isRequired,
};

export default Dropdown;
