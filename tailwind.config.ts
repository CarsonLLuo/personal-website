import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ['var(--font-noto-sans)'],
        serif: ['var(--font-noto-serif)'],
        mono: ['var(--font-fira-code)'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#fff',
            fontFamily: 'var(--font-noto-serif)',
            maxWidth: 'none',
            h1: {
              color: '#fff',
              fontFamily: 'var(--font-noto-serif)',
              fontWeight: '700',
              fontSize: '2.5em',
              letterSpacing: '-0.025em',
              marginTop: '2em',
              marginBottom: '0.8em',
            },
            h2: {
              color: '#fff',
              fontFamily: 'var(--font-noto-serif)',
              fontWeight: '700',
              fontSize: '2em',
              letterSpacing: '-0.025em',
              marginTop: '1.75em',
              marginBottom: '0.75em',
            },
            h3: {
              color: '#fff',
              fontFamily: 'var(--font-noto-serif)',
              fontWeight: '600',
              fontSize: '1.5em',
              letterSpacing: '-0.025em',
              marginTop: '1.5em',
              marginBottom: '0.75em',
            },
            p: {
              marginTop: '1.25em',
              marginBottom: '1.25em',
              lineHeight: '2',
              letterSpacing: '0.01em',
            },
            'code': {
        color: '#fff',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: '0.25em',
        padding: '0.2em 0.4em',
        fontFamily: 'Consolas, Monaco, "Andale Mono", monospace', // 修改这里
      },
      'pre': {
  position: 'relative',  // 添加这行
  backgroundColor: 'rgba(0,0,0,0.5)',
  color: '#fff',
  padding: '1.25em',
  borderRadius: '0.75em',
  fontFamily: 'Consolas, Monaco, "Andale Mono", monospace',
},
      'pre code': {
        backgroundColor: 'transparent',
        padding: '0',
        fontFamily: 'inherit', // 继承 pre 的字体
      },
            'blockquote': {
              borderLeftColor: 'rgba(255,255,255,0.2)',
              color: 'rgba(255,255,255,0.8)',
              fontStyle: 'normal',
            },
            'strong': {
              color: '#fff',
              fontWeight: '600',
            },
            'a': {
              color: '#60a5fa',
              textDecoration: 'none',
              '&:hover': {
                color: '#93c5fd',
              },
            },
          },
        },
      },
    },
  },
  plugins: [typography],
} satisfies Config;

export default config;