import CopyButton from './CopyButton'

export const MDXComponents = {
  pre: ({ children }: { children: any }) => {
    const code = children.props.children
    return (
      <pre className="relative">
        {children}
        <CopyButton code={code} />
      </pre>
    )
  },
}