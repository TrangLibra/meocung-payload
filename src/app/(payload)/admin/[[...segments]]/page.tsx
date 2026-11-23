import config from '@payload-config'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'

export const generateMetadata = ({ params, searchParams }) =>
  generatePageMetadata({ config, params, searchParams })

const Page = ({ params, searchParams }) =>
  RootPage({ config, params, searchParams })

export default Page
