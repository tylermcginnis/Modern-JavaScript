import React from 'react';
import { unstable_createResource as createResource } from 'react-cache'

const ImgResource = createResource((src) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = src;
    image.onload = resolve;
    image.onerror = reject;
  });
});

export default function Img (props) {
  ImgResource.read(props.src);
  return <img {...props} />;
};