import React from 'react'
import { Oval } from 'react-loader-spinner'

const Loader = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.3)', // optional dark overlay
      zIndex: 9999,
    }}>
      <Oval
        height={80}
        width={80}
        color="#0d0e0d"
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#000000"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  )
}

export default Loader