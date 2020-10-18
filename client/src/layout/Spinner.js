import React, { Fragment } from 'react'
import spinner from './805.gif'

export default () => (
  <Fragment>
    <img
      src={spinner}
      style={{
        width: '64px',
        margin: 'auto',
        display: 'block',
        padding: '300px 0',
      }}
      alt="Loading..."
    />
  </Fragment>
)
