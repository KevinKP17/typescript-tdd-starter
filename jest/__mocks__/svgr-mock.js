import React from 'react'

const SvgrMock = React.forwardRef((props, ref) => (
  <span className="svg-icon" ref={ref} {...props} />
))

export const ReactComponent = SvgrMock
export default SvgrMock
