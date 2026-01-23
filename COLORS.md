# Color Palette Reference

## 🌞 Light Mode Colors

### Primary Colors (Blue)
- **Primary 50**: `#e3f2fd` - Lightest blue
- **Primary 100**: `#bbdefb`
- **Primary 200**: `#90caf9`
- **Primary 300**: `#64b5f6`
- **Primary 400**: `#42a5f5`
- **Primary 500**: `#2196f3` ⭐ Main Blue
- **Primary 600**: `#1e88e5` ⭐ Most Used
- **Primary 700**: `#1976d2` ⭐ Dark Blue
- **Primary 800**: `#1565c0`
- **Primary 900**: `#0d47a1`
- **Primary 950**: `#0a3d91` - Darkest blue

### Secondary Colors (Gold/Yellow)
- **Secondary 50**: `#fff8e1` - Lightest gold
- **Secondary 100**: `#ffecb3`
- **Secondary 200**: `#ffe082`
- **Secondary 300**: `#ffd54f`
- **Secondary 400**: `#ffca28`
- **Secondary 500**: `#ffc107` ⭐ Gold
- **Secondary 600**: `#ffb300` ⭐ Most Used in Dark Mode
- **Secondary 700**: `#ffa000` ⭐ Amber
- **Secondary 800**: `#ff8f00`
- **Secondary 900**: `#ff6f00`
- **Secondary 950**: `#e65100` - Darkest gold

### Neutral/Dark Colors
- **Dark 50**: `#eceff1` - Lightest gray
- **Dark 100**: `#cfd8dc`
- **Dark 200**: `#b0bec5`
- **Dark 300**: `#90a4ae`
- **Dark 400**: `#78909c`
- **Dark 500**: `#607d8b` ⭐ Blue Gray
- **Dark 600**: `#546e7a`
- **Dark 700**: `#455a64`
- **Dark 800**: `#37474f`
- **Dark 900**: `#263238`
- **Dark 950**: `#1a1a1a` - Darkest gray

### Background Colors (Light Mode)
- **Body Background**: `#f8fafc` (slate-50)
- **Card Background**: `#ffffff` with 90% opacity (`bg-white/90`)
- **Glass Background**: `#ffffff` with 10% opacity (`bg-white/10`)
- **Footer Background**: `#f8fafc` (slate-50)
- **Scrollbar Track**: `#f1f5f9` (slate-100)
- **Scrollbar Thumb**: `#1e88e5` (primary-600)

### Text Colors (Light Mode)
- **Primary Text**: `#0f172a` (slate-900) ⭐ Main text
- **Secondary Text**: `#475569` (slate-600) ⭐ Body text
- **Tertiary Text**: `#64748b` (slate-500) ⭐ Subtle text
- **Heading**: `#1e293b` (slate-800) ⭐ Headings
- **Link/Interactive**: `#1e88e5` (primary-600)
- **Gradient Text**: `#1e88e5` (primary-600)

### Border Colors (Light Mode)
- **Default Border**: `#e2e8f0` (slate-200)
- **Primary Border**: `#90caf9` (primary-200) with 20% opacity
- **Card Border**: `#e2e8f0` (slate-200) with 30% opacity
- **Footer Border**: `#e2e8f0` (slate-200)

### Logo Colors (Light Mode)
- **Logo Color 1**: `#2196f3` (primary-500) - Start of gradient
- **Logo Color 2**: `#1e88e5` (primary-600) - Middle of gradient
- **Logo Color 3**: `#1976d2` (primary-700) - End of gradient

---

## 🌙 Dark Mode Colors

### Background Colors (Dark Mode)
- **Body Background**: `#020617` (slate-950) ⭐ Main background
- **Card Background**: `#263238` (dark-900) with 90% opacity
- **Glass Background**: `#0f172a` (slate-900) with 10% opacity
- **Footer Background**: `#0f172a` (slate-900) with 50% opacity
- **Scrollbar Track**: `#0f172a` (slate-900)
- **Scrollbar Thumb**: `#ffb300` (secondary-600)

### Text Colors (Dark Mode)
- **Primary Text**: `#f8fafc` (slate-50) ⭐ Main text
- **Secondary Text**: `#cbd5e1` (slate-300) ⭐ Body text
- **Tertiary Text**: `#94a3b8` (slate-400) ⭐ Subtle text
- **Heading**: `#e2e8f0` (slate-200) ⭐ Headings
- **Link/Interactive**: `#ffca28` (secondary-400)
- **Gradient Text**: `#ffca28` (secondary-400)

### Border Colors (Dark Mode)
- **Default Border**: `#1e293b` (slate-800)
- **Primary Border**: `#ffc107` (secondary-500) with 20% opacity
- **Card Border**: `#1e293b` (slate-800) with various opacity
- **Footer Border**: `#ffffff` with 10% opacity

### Logo Colors (Dark Mode)
- **Logo Color 1**: `#ffc107` (secondary-500) - Start of gradient ⭐ Gold
- **Logo Color 2**: `#ffb300` (secondary-600) - Middle of gradient
- **Logo Color 3**: `#ffa000` (secondary-700) - End of gradient ⭐ Amber

### Special Dark Mode Colors
- **Heart Icon**: `#ffb300` (secondary-600)
- **Hover States**: `#ffca28` (secondary-400)

---

## 📊 Color Usage Summary

### Most Used Colors

**Light Mode:**
- Background: `#f8fafc` (slate-50)
- Text: `#0f172a` (slate-900)
- Primary: `#1e88e5` (primary-600)
- Accent: `#2196f3` (primary-500)

**Dark Mode:**
- Background: `#020617` (slate-950)
- Text: `#f8fafc` (slate-50)
- Primary: `#ffb300` (secondary-600)
- Accent: `#ffc107` (secondary-500)

### Component-Specific Colors

**Gradient Text:**
- Light: `text-primary-600` = `#1e88e5`
- Dark: `text-secondary-400` = `#ffca28`

**Buttons:**
- Light Primary: `bg-primary-600` = `#1e88e5`
- Dark Primary: `bg-secondary-600` = `#ffb300`
- Hover Light: `bg-primary-700` = `#1976d2`
- Hover Dark: `bg-secondary-700` = `#ffa000`

**Glass Cards:**
- Light: `bg-white/90` with `border-primary-200/30`
- Dark: `bg-dark-900/90` with `border-secondary-500/30`

**Footer:**
- Light: `bg-slate-50` = `#f8fafc`
- Dark: `bg-slate-900/50` = `#0f172a` with 50% opacity

---

## 🎨 CSS Variables

```css
:root {
  --color-primary: 33 150 243;      /* RGB for primary */
  --color-secondary: 255 193 7;     /* RGB for secondary */
  --logo-color-1: #2196f3;          /* Light mode logo start */
  --logo-color-2: #1e88e5;          /* Light mode logo middle */
  --logo-color-3: #1976d2;          /* Light mode logo end */
}

.dark {
  --logo-color-1: #ffc107;          /* Dark mode logo start */
  --logo-color-2: #ffb300;          /* Dark mode logo middle */
  --logo-color-3: #ffa000;          /* Dark mode logo end */
}
```

---

## 🔄 Theme Switching

- **Theme Toggle**: Changes between light and dark modes
- **Default Theme**: Dark mode
- **Storage**: Theme preference saved in localStorage
- **System Preference**: Checks `prefers-color-scheme` on first load

---

## 📝 Notes

- All colors use Tailwind CSS color system
- Opacity values are applied with `/` syntax (e.g., `bg-white/90` = 90% opacity)
- Gradient colors are used for logos and text effects
- Glass morphism effects use backdrop blur with semi-transparent backgrounds
- All transitions use `duration-300` for smooth color changes

