export const spacing = {
  // Base grid (4px)
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '2.5rem', // 40px
  '3xl': '3rem',   // 48px
}

export const cards = {
  base: 'bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-all',
  interactive: 'cursor-pointer hover:bg-gray-50',
  padding: 'p-4 sm:p-5 md:p-6 lg:p-7',
}

export const buttons = {
  primary: 'bg-gray-900 hover:bg-gray-800 text-white px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg font-semibold transition-colors',
  secondary: 'bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg font-semibold transition-colors',
  text: 'text-gray-600 hover:text-gray-900 font-medium transition-colors',
}

export const typography = {
  h1: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight',
  h2: 'text-2xl sm:text-3xl md:text-4xl font-bold leading-tight',
  h3: 'text-xl sm:text-2xl font-semibold',
  body: 'text-base text-gray-700 leading-relaxed',
  small: 'text-sm text-gray-600',
  caption: 'text-xs text-gray-500 uppercase tracking-wide',
}
