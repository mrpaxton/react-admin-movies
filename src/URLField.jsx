import React from "react";
import PropTypes from "prop-types";

const URLField = ({ record = {}, source }) => (
  <a href={record[source]}>
    `www.$
    {record[source]}`
  </a>
);

URLField.propTypes = {
  record: PropTypes.object,
  source: PropTypes.string.isRequired
};

export default URLField;
