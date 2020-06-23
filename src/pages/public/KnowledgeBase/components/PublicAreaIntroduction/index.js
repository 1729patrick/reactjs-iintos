import React from 'react';

export default function Video1() {
  return (
    <div>
      {' '}
      <h1> IINTOS - Public Area Introduction </h1>
      <br />
      <iframe
        key={1}
        width={window.innerWidth - window.innerWidth * 0.32}
        height="554"
        src="https://www.youtube.com/embed/XrsamNblAHc"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
