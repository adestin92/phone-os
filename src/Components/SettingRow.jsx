import React from "react";
import PropTypes from "prop-types";

const SettingRow = ({
  icon,
  title,
  subtitle,
  right,
  onClick,
  className = "",
}) => (
  <div className={`settings-row ${className}`.trim()} onClick={onClick}>
    <div className="row-left">
      <div className="row-icon">{icon}</div>
      <div className="row-texts">
        <div className="row-title">{title}</div>
        {subtitle && <div className="row-subtitle">{subtitle}</div>}
      </div>
    </div>
    <div className="row-right">
      {right}
      <div className="chev">›</div>
    </div>
  </div>
);

SettingRow.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  right: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default SettingRow;
