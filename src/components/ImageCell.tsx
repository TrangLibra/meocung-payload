'use client';
import React from 'react';

export default function ImageCell(props: any) {
  const cellData = props.cellData || props.rowData?.coverImage;
  const url = typeof cellData === 'string' ? cellData : cellData?.url;

  if (!url) {
    return <span style={{ color: '#888', fontSize: '12px' }}>Không có ảnh</span>;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '4px 0' }}>
      <img
        src={url}
        alt="Thumbnail"
        style={{
          width: '56px',
          height: '38px',
          objectFit: 'cover',
          borderRadius: '6px',
          border: '1px solid #333',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        }}
        loading="lazy"
      />
    </div>
  );
}
