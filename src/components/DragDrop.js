import React from 'react';

export default function DragDropFile(props) {
  const suppress = evt => {
    evt.stopPropagation();
    evt.preventDefault();
  };
  const onDrop = evt => {
    evt.stopPropagation();
    evt.preventDefault();
    const files = evt.dataTransfer.files;
    if (files && files[0]) props.handleFile(files[0]);
  };
  return (
    <div onDrop={onDrop} onDragEnter={suppress} onDragOver={suppress}>
      {props.children}
    </div>
  );
}
