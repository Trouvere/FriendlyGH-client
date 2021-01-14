import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import style from './styles.module.css';

const ButtonWithImg = ({ text, onClick, img, isActive }) => {
  return (
    <div>
      <button
        className={classnames({
          [style.btn]: true,
          [style.active]: isActive
        })}
        type="button"
        onClick={onClick}
      >
        <img className={style.imgBtn} src={img} alt={text} />
        {text}
      </button>
    </div>
  );
};

ButtonWithImg.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  img: PropTypes.node.isRequired,
  isActive: PropTypes.bool
};

ButtonWithImg.defaultProps = {
  isActive: false
};

export default ButtonWithImg;
