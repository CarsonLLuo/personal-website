import CopyButton from './CopyButton'
import { ReactNode, isValidElement } from 'react'
import type { MDXComponents as MDXComponentsType } from 'mdx/types'

// 创建符合MDX组件类型的组件对象
export const MDXComponents: MDXComponentsType = {
  pre: (props) => {
    const children = props.children
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