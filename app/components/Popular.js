import React, { Suspense, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';
import Loading from './Loading';
import Img from './Img'
import ErrorBoundary from './ErrorBoundary'

import { unstable_createResource as createResource } from 'react-cache'

const reposResource = createResource(fetchPopularRepos)

function PopularRepos ({ language }) {
  const repos = reposResource.read(language)

  return (
    <ul className='popular-list'>
      {repos.map(({ name, stargazers_count, owner, html_url }, index) => (
        <li key={name} className='popular-item'>
          <div className='popular-rank'>#{index + 1}</div>
          <ul className='space-list-items'>
            <li>
              <Suspense maxDuration={0} fallback={
                <img
                  className='avatar'
                  src={`https://github.com/${owner.login}.png?size=10`}
                  alt={'Avatar for ' + owner.login}
                />
              }>
                <Img
                  className='avatar'
                  src={`https://github.com/${owner.login}.png?size=200`}
                  alt={'Avatar for ' + owner.login}
                />
              </Suspense>
            </li>
            <li><a href={html_url}>{name}</a></li>
            <li>@{owner.login}</li>
            <li>{stargazers_count} stars</li>
          </ul>
        </li>
      ))}
    </ul>
  )
}

function Popular () {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']
  const [selectedLanguage, setSelectedLanguage] = useState('All')

  return (
    <div>
      <ul className='languages'>
        {languages.map((lang) => (
          <li
            style={lang === selectedLanguage ? {color: '#d0021b'} : null}
            onClick={() => setSelectedLanguage(lang)}
            key={lang}>
              {lang}
          </li>
        ))}
      </ul>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          {languages.map((lang) => {
            return lang === selectedLanguage
              ? <PopularRepos key={lang} language={selectedLanguage}/>
              : <div key={lang} hidden={true}>
                  <PopularRepos language={lang}/>
                </div>
          })}
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default Popular;