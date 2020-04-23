import React, { CSSProperties } from 'react'
import { render } from 'react-dom'

import Tooltip from '../src/index'

const styles: { [key: string]: CSSProperties } = {
  page: {
    display: 'flex',
    justifyContent: 'center',
    background: 'linear-gradient(155deg, rgba(2,0,36,1) 0%, rgba(8,8,106,1) 0%, rgba(9,9,121,1) 0%, rgba(6,6,89,1) 0%, rgba(5,60,139,1) 25%, rgba(4,118,193,1) 50%, rgba(2,169,226,1) 75%, rgba(0,212,255,1) 100%)',
  },
  contentWrapper: {
    marginTop: '25vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  contentHeading: {
    fontFamily: 'palatino',
    color: 'whitesmoke',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '2.5rem',
    textShadow: '0.25px 0.25px 0 whitesmoke, 1px 6px 5px #aba8a8',
  },
  h2: {
    padding: 0,
    margin: 0,
  },
  content: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    alignSelf: 'center',
    background: '#F0F0D8',
    padding: '1rem 1rem',
    color: '#41403E',
    fontSize: '1rem',
    fontWeight: 'bold',
    fontFamily: 'palatino',
    outline: 'none',
    boxShadow: '2px 8px 4px -6px hsla(0,0%,0%,.3)',
    borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
    border: 'solid 2px #41403E',
    margin: '1rem',
  },
  p: {
    fontFamily: 'palatino',
    margin: 0,
    padding: 0,
  },
}

const Example = () => (
    <div style={styles.page}>
      <div style={styles.contentWrapper}>
        <div style={styles.contentHeading}>
          <h1>the-only-react-tooltip</h1>
          <h2 style={styles.h2}>(you'll ever need)</h2>
        </div>
        <div style={styles.content}>
          <Tooltip body={<p style={styles.p}>Hello world!</p>} position={"left"}>
            <button style={styles.button}>Hover me!</button>
          </Tooltip>
          <Tooltip body={<p style={styles.p}>Hello world!</p>} position={"bottom"}>
            <button style={styles.button}>Hover me!</button>
          </Tooltip>
          <Tooltip body={<p style={styles.p}>Hello world!</p>} position={"top"}>
            <button style={styles.button}>Hover me!</button>
          </Tooltip>
          <Tooltip body={<p style={styles.p}>Hello world!</p>} position={"right"}>
            <button style={styles.button}>Hover me!</button>
          </Tooltip>
        </div>
        <div>
          <Tooltip body={<p style={styles.p}>Hello world!</p>} position={"left"}>
            <button >Hover me!</button>
          </Tooltip>
          <Tooltip body={<p style={styles.p}>Hello world!</p>} position={"bottom"}>
            <button >Hover me!</button>
          </Tooltip>
          <Tooltip body={<p style={styles.p}>Hello world!</p>} position={"top"}>
            <button >Hover me!</button>
          </Tooltip>
          <Tooltip body={<p style={styles.p}>Hello world!</p>} position={"right"}>
            <button >Hover me!</button>
          </Tooltip>
        </div>
        <div style={{ margin: '2.5rem' }}>
          <Tooltip body={"Hello world!"} position={"left"}>
            This is a tooltip around some text
          </Tooltip>
        </div>
        <div style={{ margin: '2.5rem' }}>
          <Tooltip body={"Hello world!"} position={"bottom"}>
            <React.Fragment>This is a tooltip around some text</React.Fragment>
          </Tooltip>
        </div>
        <div style={{ margin: '2.5rem' }}>
          <Tooltip body={"Hello world!"} position={"top"}>
            <p>This is a tooltip around some text</p>
          </Tooltip>
        </div>
        <div style={{ margin: '2.5rem' }}>
          <Tooltip body={"Hello world!"} position={"right"}>
            <p>This is a tooltip around some text</p>
          </Tooltip>
        </div>
      </div>
    </div>
  )

render(<Example/>, document.getElementById('root'))