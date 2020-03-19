import React from 'react'
import { connect } from 'react-redux'
import { useTransition, animated } from 'react-spring'

function UI (props) {
  const transitions = useTransition(props.showUi, null, {
    from: { marginTop: -100 },
    enter: { marginTop: 0 },
    leave: { marginTop: -100 }
  })

  return (
    <div>
      {/* Top */}
      <div>
        {transitions.map(
          ({ item, key, props }) =>
            item && (
              <animated.div
                key={key}
                style={{
                  ...props,
                  position: 'absolute',
                  width: 400,
                  height: 100,
                  top: 0,
                  backgroundColor: '#fcfcfc'
                }}
              />
            )
        )}
      </div>
    </div>
  )
}

const mapStateToProps = showUi => showUi

export default connect(mapStateToProps)(UI)
