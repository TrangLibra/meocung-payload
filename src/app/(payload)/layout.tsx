import config from '@/payload.config'
import '@payloadcms/next/css'
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import React from 'react'

export const metadata = {
  title: 'Mèo Cưng - PayloadCMS Admin Panel',
  description: 'Bảng quản trị cẩm nang và sản phẩm Mèo Cưng',
}

async function serverFunction(args: any) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
  })
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout config={config} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  )
}
