# Color System Guide

This document describes the global color variables system used throughout the application. All colors are defined in `colors.css` and can be easily modified from one central location.

## How to Use Color Variables

Instead of using hard-coded hex values like `#f2f2f2`, use CSS variables:

```css
/* ❌ Old way (hard-coded) */
.component {
  color: #f2f2f2;
}

/* ✅ New way (using variables) */
.component {
  color: var(--color-text-primary);
}
```

## Color Categories

### Base Colors
- `--color-bg-primary`: Main dark background (#101010)
- `--color-bg-secondary`: Secondary dark background (#0a0a0a)
- `--color-bg-tertiary`: Tertiary background (#141414)
- `--color-bg-light`: Light foreground (#f2f2f2)
- `--color-bg-white`: Pure white (#ffffff)

### Text Colors
- `--color-text-primary`: Primary text (#f2f2f2)
- `--color-text-secondary`: Muted text (rgba(242, 242, 242, 0.5))
- `--color-text-tertiary`: Light gray text (#d9d9d9)
- `--color-text-muted`: Medium gray text (#929292)
- `--color-text-light-gray`: Light gray text (#ededed)
- `--color-text-medium-gray`: Medium gray (#a0a0a0)
- `--color-text-dark`: Black text (#000000)
- `--color-text-inverse`: Inverse/white text (#ffffff)
- `--color-text-with-opacity`: White with opacity (#ffffffcc)

### Border & Outline Colors
- `--color-border-light`: Light border (rgba(255, 255, 255, 0.14))
- `--color-border-medium`: Medium border (rgba(255, 255, 255, 0.5))
- `--color-border-dark`: Dark border (#2c2c2c)
- `--color-border-divider`: Divider color (#373737)
- `--color-border-subtle`: Subtle border (#23252a)
- `--color-border-line`: Border line (#24252a)

### Component Background Colors
- `--color-nav-bg`: Navbar background (rgba(10, 10, 10, 0.33))
- `--color-card-bg-dark`: Dark card background (rgba(10, 10, 10, 0.3))
- `--color-card-bg-medium`: Medium card background (rgba(34, 34, 34, 0.2))
- `--color-card-bg-light`: Light card background (rgba(68, 68, 68, 0.2))
- `--color-input-bg`: Input background (rgba(20, 20, 20, 0.8))
- `--color-overlay-dark`: Dark overlay (rgba(16, 16, 16, 0.9))

### Accent Colors
- `--color-accent-cyan`: Cyan accent (#b0ecef)
- `--color-accent-purple`: Purple accent (#D3A6FF)
- `--color-accent-purple-dark`: Dark purple (#c9b0ef)
- `--color-accent-success`: Success green (#17c964)
- `--color-accent-light-gray`: Light gray (#bdbebe)
- `--color-accent-gray`: Gray (#cecdc7)
- `--color-accent-light-beige`: Light beige (#c3c1b8)
- `--color-accent-light-gray-alt`: Alternative light gray (#eaeaea)

### Gradient Colors - Dark Blue
- `--color-grad-blue-1`: Blue gradient 1 (rgba(69, 94, 181, 0.2))
- `--color-grad-blue-2`: Blue gradient 2 (rgba(86, 67, 204, 0.2))
- `--color-grad-blue-3`: Blue gradient 3 (rgba(103, 63, 215, 0.2))
- `--color-grad-blue-1-strong`: Strong blue gradient 1 (rgba(69, 94, 181, 0.6))
- `--color-grad-blue-2-strong`: Strong blue gradient 2 (rgba(86, 67, 204, 0.6))
- `--color-grad-blue-3-strong`: Strong blue gradient 3 (rgba(103, 63, 215, 0.6))

### Gradient Colors - Cyan/Blue
- `--color-grad-cyan-green`: Cyan-green gradient (rgba(70, 227, 183, 0.3))
- `--color-grad-cyan-blue`: Cyan-blue gradient (rgba(47, 122, 208, 0.3))
- `--color-grad-cyan-green-strong`: Strong cyan-green (rgba(70, 227, 183, 0.6))
- `--color-grad-cyan-blue-strong`: Strong cyan-blue (rgba(47, 122, 208, 0.6))

### Gradient Colors - Teal/Cyan & Green
- `--color-grad-teal`: Teal gradient (rgba(80, 227, 194, 0.2))
- `--color-grad-blue-dark`: Dark blue gradient (rgba(0, 112, 243, 0.2))
- `--color-grad-green`: Green gradient (rgba(68, 160, 141, 0.2))
- `--color-grad-green-dark`: Dark green gradient (rgba(9, 54, 55, 0.2))

### Gradient Colors - Pink/Magenta
- `--color-grad-pink`: Pink gradient (rgba(255, 110, 199, 0.2))
- `--color-grad-purple-pink`: Purple-pink gradient (rgba(245, 55, 249, 0.6))
- `--color-grad-pink-vibrant`: Vibrant pink (#f537f9)
- `--color-grad-yellow`: Yellow gradient (#f7c12b)
- `--color-grad-yellow-alt`: Alternative yellow (rgba(247, 193, 43, 0.6))

### Gradient Colors - Blue/Cyan Mix
- `--color-grad-blue-cyan`: Blue-cyan gradient (rgba(100, 181, 246, 0.2))
- `--color-grad-blue-cyan-alt`: Alternative blue-cyan (rgb(110, 175, 255, 0.2))

### Shadow & Overlay Colors
- `--color-shadow-dark`: Dark shadow (rgba(0, 0, 0, 0.8))
- `--color-shadow-transparent`: Transparent shadow (rgba(0, 0, 0, 0))
- `--color-shadow-light`: Light shadow (rgba(0, 0, 0, 0.04))
- `--color-shadow-medium`: Medium shadow (rgba(0, 0, 0, 0.08))
- `--color-glow-white`: White glow (#FFFFFF)
- `--color-glow-shadow`: Glow shadow effect
- `--color-box-shadow-light`: Light box shadow
- `--color-text-shadow`: Text shadow (light)
- `--color-text-shadow-heavy`: Text shadow (heavy)

### Neutral Grays
- `--color-gray-light`: Light gray (#999)
- `--color-gray-medium`: Medium gray (#4B4B4B)
- `--color-gray-dark`: Dark gray (#878787)

## Modifying Colors

To change colors globally, simply edit the variable in `src/styles/colors.css`. For example:

```css
:root {
  /* Change primary text color */
  --color-text-primary: #ffffff;
  
  /* Change accent color */
  --color-accent-cyan: #00ffff;
  
  /* Change background */
  --color-bg-primary: #1a1a1a;
}
```

All components using these variables will automatically update.

## Files Using Color Variables

The following files have been updated to use the color system:

### Core
- `src/index.css`
- `src/styles/colors.css`

### Components
- `src/components/Navbar.css`
- `src/components/Footer.css`
- `src/components/FooterMain.css`
- `src/components/LoadingSpinner.css`
- `src/components/ExperienceCanvas.css`

### Pages
- `src/pages/Home.css`
- `src/pages/About.css`
- `src/pages/Contact.css`
- `src/pages/Experience.css`
- `src/pages/Projects.css`
- `src/pages/Photos.css`

## Color Consistency

This color system ensures:
- **Consistency**: Same semantic color names used throughout
- **Maintainability**: Centralized color definitions
- **Flexibility**: Easy theme changes
- **Readability**: Variable names describe their purpose
