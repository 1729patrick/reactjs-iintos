import React from 'react';

export default function Video1() {
  return (
    <div>
      {' '}
      <h1> IINTOS - How to Create a Mobility Project </h1>
      <br />
      <iframe
        width={window.innerWidth - window.innerWidth * 0.32}
        height="554"
        src="https://www.youtube.com/embed/9zRyZn-DCHo"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
