import React from 'react'

function MainLayout({children}: React.PropsWithChildren) {
  return (
    <main>{children}</main>
  )
}

export default MainLayout