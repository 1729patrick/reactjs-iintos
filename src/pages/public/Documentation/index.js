import React from 'react';

export default () => {
  const openModelER = () => {
    window.open(
      'https://iintoska2.ips.pt/api/files/ba4f63d6070a6f47358180c49cbcf53d.png',
      '_blank'
    );
  };

  const openSpecification = () => {
    window.open('https://iintos-doc.netlify.app', '_blank');
  };

  const openLogicalDiagram = () => {
    window.open(
      'https://iintoska2.ips.pt/api/files/d50badb0b13f252024a3741a2a7fbe6e.png',
      '_blank'
    );
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <h1>Documentation</h1>

      <span
        style={{
          marginTop: 20,
          paddingTop: 20,
          borderTop: '1px solid #aaa',
          cursor: 'pointer',
        }}
      >
        <h2 onClick={openSpecification}>1. API Specification</h2>
        <h2 onClick={openModelER} style={{ marginTop: 10, cursor: 'pointer' }}>
          2. DB Model Diagram
        </h2>

        <h2
          onClick={openLogicalDiagram}
          style={{ marginTop: 10, cursor: 'pointer' }}
        >
          3. Logical Architecture Diagram
        </h2>
      </span>
    </div>
  );
};
