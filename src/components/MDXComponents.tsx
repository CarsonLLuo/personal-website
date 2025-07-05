import CopyButton from './CopyButton'
import { ReactNode } from 'react'

export const MDXComponents = {
  pre: ({ children }: { children: ReactNode }) => {
    const code = children?.props?.children
    return (
      <pre className="relative">
        {children}
        <CopyButton code={code} />
      </pre>
    )
  },
}