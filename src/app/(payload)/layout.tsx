import config from '@payload-config'
import '@payloadcms/next/css'
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import React from 'react'

export const metadata = {
  title: 'Mèo Cưng - PayloadCMS Admin Panel',
  description: 'Bảng quản trị cẩm nang và sản phẩm Mèo Cưng',
}

const serverFunction = async (args) => {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
  })
}

const Layout = ({ children }) => (
  <RootLayout config={config} serverFunction={serverFunction}>
    {children}
  </RootLayout>
)

export default Layout
