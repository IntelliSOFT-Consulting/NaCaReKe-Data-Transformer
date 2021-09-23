import React from 'react';
import PropTypes from 'prop-types';

export default function DragDropFile({ children, handleFile }) {
  const suppress = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
  };
  const onDrop = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    const { files } = evt.dataTransfer;
    if (files && files[0]) handleFile(files[0]);
  };
  return (
    <div onDrop={onDrop} onDragEnter={suppress} onDragOver={suppress}>
      {children}
    </div>
  );
}

DragDropFile.propTypes = {
  handleFile: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
