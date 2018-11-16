import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import Img from './Img'

export default function PlayerPreview ({ username, children }) {
  return (
    <div>
      <div className='column'>
        <Suspense maxDuration={1} fallback={
          <img
            className='avatar'
            src={`https://github.com/${username}.png?size=10`}
            alt={'Avatar for ' + username}
          />}
        >
          <Img
            className='avatar'
            src={`https://github.com/${username}.png?size=200`}
            alt={'Avatar for ' + username}
          />
        </Suspense>
        <h2 className='username'>@{username}</h2>
      </div>
      {children}
    </div>
  )
}

PlayerPreview.propTypes = {
  username: PropTypes.string.isRequired,
};