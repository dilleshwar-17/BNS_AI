# BNS AI - UI Component Alignment Guide

## Overview

This guide documents the standardized UI component styles and alignment rules for the BNS AI application. All buttons, cards, textareas, inputs, and other elements follow these guidelines to ensure perfect visual consistency.

---

## 📋 Component Styles Reference

### Location
`src/styles/componentStyles.ts` - Centralized component style definitions

### Available Styles

#### Buttons
- **Primary**: Main action buttons (blue)
- **Secondary**: Alternative actions (slate)
- **Danger**: Destructive actions (red)
- **Success**: Positive actions (emerald)
- **Ghost**: Minimal style (transparent)
- **Small**: Compact buttons
- **Large**: Prominent buttons
- **Icon**: Icon-only buttons
- **IconSmall**: Compact icon buttons

#### Cards
- **Standard**: Default card style
- **Compact**: Smaller card
- **Large**: Larger card
- **Interactive**: Hoverable card
- **Alert**: Error/alert card (red)
- **Success**: Success card (green)
- **Info**: Information card (blue)
- **Warning**: Warning card (amber)

#### Inputs
- **Text**: Standard text input
- **Compact**: Smaller input
- **Large**: Larger input
- **Textarea**: Multi-line input
- **Select**: Dropdown select

#### Badges
- **Primary**: Blue badge
- **Success**: Green badge
- **Danger**: Red badge
- **Warning**: Amber badge

---

## 🎨 Usage Examples

### Using Component Styles

#### Import
```typescript
import { getButtonStyle, getCardStyle, getInputStyle, componentStyles } from '../styles/componentStyles';
```

#### Button Usage
```tsx
// Primary button
<button className={getButtonStyle('primary')}>
  Click me
</button>

// Secondary button
<button className={getButtonStyle('secondary')}>
  Cancel
</button>

// Icon button
<button className={getButtonStyle('icon')}>
  <Icon size={18} />
</button>
```

#### Card Usage
```tsx
// Standard card
<div className={getCardStyle('standard')}>
  Card content
</div>

// Interactive card
<div className={getCardStyle('interactive')}>
  Clickable card
</div>

// Alert card
<div className={getCardStyle('alert')}>
  Error message
</div>
```

#### Input Usage
```tsx
// Text input
<input className={getInputStyle('text')} placeholder="Enter text..." />

// Textarea
<textarea className={getInputStyle('textarea')} placeholder="Enter message..." />

// Select dropdown
<select className={getInputStyle('select')}>
  <option>Option 1</option>
</select>
```

#### Direct Style Usage
```tsx
// Using componentStyles directly
<button className={componentStyles.buttons.primary}>
  Primary Button
</button>

<div className={componentStyles.cards.standard}>
  Standard Card
</div>
```

---

## 🔧 Standardized Spacing & Alignment

### Padding
- **p-4**: 1rem (16px)
- **p-6**: 1.5rem (24px)
- **p-8**: 2rem (32px)

### Gaps
- **gap-4**: 1rem between items
- **gap-6**: 1.5rem between items
- **gap-8**: 2rem between items

### Margins
- **m-4**: 1rem margin
- **m-6**: 1.5rem margin
- **m-8**: 2rem margin

---

## 📐 Layout Patterns

### Flex Row (Centered)
```tsx
<div className={componentStyles.containers.flexRow}>
  {/* Items will be centered and spaced between */}
</div>
```

### Flex Column
```tsx
<div className={componentStyles.containers.flexCol}>
  {/* Items stacked vertically with gap */}
</div>
```

### Grid Layout
```tsx
<div className={componentStyles.containers.grid}>
  {/* Responsive grid: 1 col mobile, 2 col tablet, 3 col desktop */}
</div>
```

### Centered Container
```tsx
<div className={componentStyles.containers.centered}>
  {/* Content centered both horizontally and vertically */}
</div>
```

---

## 🎯 Alignment Rules

### Button Alignment
1. **Horizontal Groups**: Use `flex items-center gap-4`
2. **Vertical Groups**: Use `flex flex-col gap-3`
3. **Spread**: Use `flex items-center justify-between`

### Card Alignment
1. **Padding**: Always use `p-6` for standard cards
2. **Borders**: Use `border border-white/5`
3. **Rounded**: Use `rounded-xl` for standard, `rounded-2xl` for large
4. **Background**: Use `bg-slate-900/40 backdrop-blur-xl`

### Input Alignment
1. **Width**: Use `w-full` for full-width inputs
2. **Padding**: Use `px-4 py-2.5` for standard
3. **Border**: Use `border border-slate-700`
4. **Focus**: Use `focus:border-blue-500 focus:ring-1 focus:ring-blue-500`

### Text Alignment
1. **Headings**: Use `text-white font-bold tracking-tight`
2. **Body**: Use `text-slate-300 leading-relaxed`
3. **Labels**: Use `text-sm font-semibold text-slate-300`

---

## 🔄 Common Patterns

### Form Group
```tsx
<div className={componentStyles.containers.formGroup}>
  <label className={componentStyles.labels.standard}>
    Label Text
  </label>
  <input className={getInputStyle('text')} />
</div>
```

### Button Group
```tsx
<div className={componentStyles.containers.flexRow}>
  <button className={getButtonStyle('primary')}>Save</button>
  <button className={getButtonStyle('secondary')}>Cancel</button>
</div>
```

### Card with Header
```tsx
<div className={getCardStyle('standard')}>
  <div className={componentStyles.containers.flexRow}>
    <h3 className={componentStyles.text.h3}>Title</h3>
    <button className={getButtonStyle('icon')}>
      <Icon size={18} />
    </button>
  </div>
  <div className={componentStyles.dividers.horizontal} />
  <p className={componentStyles.text.body}>Content</p>
</div>
```

---

## 🎨 Color Palette

### Primary Colors
- **Blue**: `#2563EB` (blue-600)
- **Sky**: `#0EA5E9` (sky-500)
- **Slate**: `#1E293B` (slate-800)

### Semantic Colors
- **Success**: `#10B981` (emerald-500)
- **Danger**: `#EF4444` (red-500)
- **Warning**: `#F59E0B` (amber-500)
- **Info**: `#3B82F6` (blue-500)

### Neutral Colors
- **White**: `#FFFFFF`
- **Slate 300**: `#CBD5E1` (light text)
- **Slate 500**: `#64748B` (muted text)
- **Slate 700**: `#334155` (borders)
- **Slate 900**: `#0F172A` (dark background)

---

## ✅ Alignment Checklist

Before committing component changes:

- [ ] All buttons use `getButtonStyle()` or `componentStyles.buttons`
- [ ] All cards use `getCardStyle()` or `componentStyles.cards`
- [ ] All inputs use `getInputStyle()` or `componentStyles.inputs`
- [ ] Padding is consistent (`p-4`, `p-6`, or `p-8`)
- [ ] Gaps are consistent (`gap-4`, `gap-6`, or `gap-8`)
- [ ] Borders use `border border-white/5` or appropriate color
- [ ] Rounded corners use `rounded-lg`, `rounded-xl`, or `rounded-2xl`
- [ ] Text colors use `text-white`, `text-slate-300`, or `text-slate-400`
- [ ] Focus states use `focus:border-blue-500 focus:ring-1 focus:ring-blue-500`
- [ ] Hover states are defined for interactive elements
- [ ] Disabled states are properly styled

---

## 🚀 Implementation Steps

### Step 1: Import Styles
```typescript
import { getButtonStyle, getCardStyle, getInputStyle, componentStyles } from '../styles/componentStyles';
```

### Step 2: Replace Inline Styles
Replace hardcoded Tailwind classes with helper functions:

**Before:**
```tsx
<button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg">
  Click
</button>
```

**After:**
```tsx
<button className={getButtonStyle('primary')}>
  Click
</button>
```

### Step 3: Verify Alignment
Check that all elements align properly and spacing is consistent.

### Step 4: Test Responsiveness
Ensure components look good on mobile, tablet, and desktop.

---

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Responsive Classes
```tsx
// Example: Different grid columns based on screen size
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* 1 column on mobile, 2 on tablet, 3 on desktop */}
</div>
```

---

## 🔍 Quality Assurance

### Visual Testing
1. Check alignment on different screen sizes
2. Verify hover states work correctly
3. Ensure focus states are visible
4. Test disabled states
5. Verify color contrast for accessibility

### Code Review
1. Verify all components use standardized styles
2. Check for inline style duplicates
3. Ensure proper spacing and alignment
4. Validate responsive behavior

---

## 📚 Related Files

- `src/styles/componentStyles.ts` - Style definitions
- `src/components/WorkspaceView.tsx` - Example usage
- `src/components/DashboardView.tsx` - Example usage
- `src/components/AdminPortalView.tsx` - Example usage

---

## 🤝 Contributing

When adding new components:

1. Use standardized styles from `componentStyles.ts`
2. Follow the alignment rules in this guide
3. Test on multiple screen sizes
4. Update this guide if adding new styles
5. Submit PR with before/after screenshots

---

## 📞 Support

For questions about UI alignment:
1. Check this guide
2. Review `componentStyles.ts`
3. Look at existing component usage
4. Create an issue on GitHub

---

**Version**: 1.0.0
**Last Updated**: 2026-07-13
**Status**: Production Ready
**License**: Apache-2.0
