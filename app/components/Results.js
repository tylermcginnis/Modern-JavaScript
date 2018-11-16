import React, { memo } from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { battle } from '../utils/api'
import { Link } from 'react-router-dom'
import PlayerPreview from './PlayerPreview'
import Loading from './Loading'
import { unstable_createResource as createResource } from 'react-cache'

function Profile ({ info }) {
  return (
    <PlayerPreview username={info.login} avatar={info.avatar_url}>
      <ul className='space-list-items'>
        {info.name && <li>{info.name}</li>}
        {info.location && <li>{info.location}</li>}
        {info.company && <li>{info.company}</li>}
        <li>Followers: {info.followers}</li>
        <li>Following: {info.following}</li>
        <li>Public Repos: {info.public_repos}</li>
        {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
      </ul>
    </PlayerPreview>
  )
}

Profile.propTypes = {
  info: PropTypes.object.isRequired,
}

function Player ({ label, score, profile }) {
  return (
    <div>
      <h1 className='header'>{label}</h1>
      <h3 style={{textAlign: 'center'}}>Score: {score}</h3>
      <Profile info={profile} />
    </div>
  )
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired,
}

// const battleResource = createResource(battle, (players) => {
//   return players[0] + players[1]
// })

const battleResource = createResource((search) => {
  const { playerOneName, playerTwoName } = queryString.parse(search)

  return battle([playerOneName, playerTwoName])
})

function Results ({ location }) {
  const players = battleResource.read(location.search)

  if (players === null) {
    return (
      <div>
        <p>Looks like there was an error. Check that both users exist on Github.</p>
        <Link to='/battle'>Reset</Link>
      </div>
    )
  }

  const winner = players[0]
  const loser = players[1]

    return (
      <div className='row'>
        <Player
          label='Winner'
          score={winner.score}
          profile={winner.profile}
        />
        <Player
          label='Loser'
          score={loser.score}
          profile={loser.profile}
        />
      </div>
    )
}

export default memo(Results);