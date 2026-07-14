/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Standardized Tailwind CSS classes for consistent UI components
 * Ensures all buttons, cards, inputs, and other elements are perfectly aligned
 */

export const componentStyles = {
  // ============ BUTTONS ============
  buttons: {
    // Primary button - main action
    primary:
      'px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed',

    // Secondary button - alternative action
    secondary:
      'px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed',

    // Danger button - destructive action
    danger:
      'px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed',

    // Success button - positive action
    success:
      'px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed',

    // Ghost button - minimal style
    ghost:
      'px-4 py-2.5 bg-transparent hover:bg-slate-800 text-slate-300 hover:text-white font-semibold rounded-lg transition-all duration-200 border border-slate-700 hover:border-slate-600',

    // Small button
    small:
      'px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-md transition-all duration-200',

    // Large button
    large:
      'px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl',

    // Icon button
    icon:
      'p-2 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-all duration-200 flex items-center justify-center',

    // Icon button small
    iconSmall:
      'p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-md transition-all duration-200 flex items-center justify-center'
  },

  // ============ CARDS ============
  cards: {
    // Standard card
    standard:
      'bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200',

    // Compact card
    compact:
      'bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-lg p-4 shadow-md',

    // Large card
    large:
      'bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-8 shadow-xl',

    // Interactive card
    interactive:
      'bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-xl p-6 shadow-lg hover:shadow-xl hover:border-white/10 transition-all duration-200 cursor-pointer',

    // Alert card
    alert:
      'bg-red-950/20 backdrop-blur-xl border border-red-500/30 rounded-xl p-6 shadow-lg',

    // Success card
    success:
      'bg-emerald-950/20 backdrop-blur-xl border border-emerald-500/30 rounded-xl p-6 shadow-lg',

    // Info card
    info:
      'bg-blue-950/20 backdrop-blur-xl border border-blue-500/30 rounded-xl p-6 shadow-lg',

    // Warning card
    warning:
      'bg-amber-950/20 backdrop-blur-xl border border-amber-500/30 rounded-xl p-6 shadow-lg'
  },

  // ============ INPUTS ============
  inputs: {
    // Standard text input
    text: 'w-full px-4 py-2.5 bg-slate-950/60 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200',

    // Compact input
    compact:
      'px-3 py-1.5 bg-slate-950/60 border border-slate-700 rounded-md text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200',

    // Large input
    large:
      'w-full px-5 py-3 bg-slate-950/60 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200',

    // Textarea
    textarea:
      'w-full px-4 py-3 bg-slate-950/60 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 resize-none font-mono text-sm',

    // Select dropdown
    select:
      'w-full px-4 py-2.5 bg-slate-950/60 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 cursor-pointer'
  },

  // ============ LABELS ============
  labels: {
    // Standard label
    standard:
      'block text-sm font-semibold text-slate-300 mb-2',

    // Required label (with asterisk)
    required:
      'block text-sm font-semibold text-slate-300 mb-2 after:content-["*"] after:text-red-500 after:ml-1',

    // Small label
    small:
      'block text-xs font-semibold text-slate-400 mb-1.5'
  },

  // ============ BADGES ============
  badges: {
    // Primary badge
    primary:
      'inline-flex items-center px-3 py-1 bg-blue-600/20 border border-blue-500/30 text-blue-300 text-xs font-semibold rounded-full',

    // Success badge
    success:
      'inline-flex items-center px-3 py-1 bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold rounded-full',

    // Danger badge
    danger:
      'inline-flex items-center px-3 py-1 bg-red-600/20 border border-red-500/30 text-red-300 text-xs font-semibold rounded-full',

    // Warning badge
    warning:
      'inline-flex items-center px-3 py-1 bg-amber-600/20 border border-amber-500/30 text-amber-300 text-xs font-semibold rounded-full'
  },

  // ============ DIVIDERS ============
  dividers: {
    // Horizontal divider
    horizontal:
      'h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent',

    // Vertical divider
    vertical:
      'w-px h-full bg-gradient-to-b from-transparent via-slate-700 to-transparent'
  },

  // ============ CONTAINERS ============
  containers: {
    // Section container
    section:
      'space-y-6',

    // Form group
    formGroup:
      'space-y-2',

    // Flex row (centered)
    flexRow:
      'flex items-center justify-between gap-4',

    // Flex column
    flexCol:
      'flex flex-col gap-4',

    // Grid layout
    grid:
      'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',

    // Centered container
    centered:
      'flex items-center justify-center'
  },

  // ============ TEXT ============
  text: {
    // Heading 1
    h1: 'text-4xl font-black text-white tracking-tight',

    // Heading 2
    h2: 'text-3xl font-bold text-white tracking-tight',

    // Heading 3
    h3: 'text-2xl font-bold text-white tracking-tight',

    // Heading 4
    h4: 'text-xl font-bold text-white tracking-tight',

    // Body text
    body:
      'text-base text-slate-300 leading-relaxed',

    // Small text
    small:
      'text-sm text-slate-400',

    // Extra small text
    xs: 'text-xs text-slate-500',

    // Muted text
    muted:
      'text-slate-500'
  },

  // ============ SPACING ============
  spacing: {
    // Padding
    p4: 'p-4',
    p6: 'p-6',
    p8: 'p-8',

    // Margin
    m4: 'm-4',
    m6: 'm-6',
    m8: 'm-8',

    // Gap
    gap4: 'gap-4',
    gap6: 'gap-6',
    gap8: 'gap-8'
  },

  // ============ SHADOWS ============
  shadows: {
    // Small shadow
    sm: 'shadow-md',

    // Medium shadow
    md: 'shadow-lg',

    // Large shadow
    lg: 'shadow-xl',

    // Extra large shadow
    xl: 'shadow-2xl'
  }
};

/**
 * Helper function to combine multiple style classes
 */
export function combineStyles(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Helper function to get button style by variant
 */
export function getButtonStyle(
  variant: 'primary' | 'secondary' | 'danger' | 'success' | 'ghost' | 'small' | 'large' | 'icon' | 'iconSmall' = 'primary'
): string {
  return componentStyles.buttons[variant];
}

/**
 * Helper function to get card style by variant
 */
export function getCardStyle(
  variant: 'standard' | 'compact' | 'large' | 'interactive' | 'alert' | 'success' | 'info' | 'warning' = 'standard'
): string {
  return componentStyles.cards[variant];
}

/**
 * Helper function to get input style by variant
 */
export function getInputStyle(
  variant: 'text' | 'compact' | 'large' | 'textarea' | 'select' = 'text'
): string {
  return componentStyles.inputs[variant];
}
