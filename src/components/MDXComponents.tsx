import CopyButton from './CopyButton'
import { ReactNode, isValidElement } from 'react'

export const MDXComponents = {
  pre: ({ children }: { children: ReactNode }) => {
    const code = isValidElement(children) && 
                children.props ? 
                (children.props as {children?: string}).children || '' : 
                ''
    return (
      <pre className="relative">
        {children}
        <CopyButton code={code} />
      </pre>
    )
  },
}