---
name: Digital Potting Shed
colors:
  surface: '#101510'
  surface-dim: '#101510'
  surface-bright: '#353b35'
  surface-container-lowest: '#0a0f0b'
  surface-container-low: '#181d18'
  surface-container: '#1c211c'
  surface-container-high: '#262b27'
  surface-container-highest: '#313631'
  on-surface: '#dfe4dc'
  on-surface-variant: '#c8c7bc'
  inverse-surface: '#dfe4dc'
  inverse-on-surface: '#2c322d'
  outline: '#929187'
  outline-variant: '#47473f'
  surface-tint: '#c8c8b0'
  primary: '#ffffff'
  on-primary: '#303221'
  primary-container: '#e4e4cc'
  on-primary-container: '#646652'
  inverse-primary: '#5e604d'
  secondary: '#b8cdac'
  on-secondary: '#24351e'
  secondary-container: '#3c4e35'
  on-secondary-container: '#aabe9f'
  tertiary: '#ffffff'
  on-tertiary: '#532200'
  tertiary-container: '#ffdbc9'
  on-tertiary-container: '#a44a00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e4e4cc'
  primary-fixed-dim: '#c8c8b0'
  on-primary-fixed: '#1b1d0e'
  on-primary-fixed-variant: '#474836'
  secondary-fixed: '#d4e9c7'
  secondary-fixed-dim: '#b8cdac'
  on-secondary-fixed: '#101f0b'
  on-secondary-fixed-variant: '#3a4b33'
  tertiary-fixed: '#ffdbc9'
  tertiary-fixed-dim: '#ffb68d'
  on-tertiary-fixed: '#321200'
  on-tertiary-fixed-variant: '#763400'
  background: '#101510'
  on-background: '#dfe4dc'
  surface-variant: '#313631'
typography:
  headline-xl:
    fontFamily: Vollkorn
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Vollkorn
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Vollkorn
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.2'
  body-md:
    fontFamily: Space Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.1em
  mono-data:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: -0.01em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  unit: 8px
  container-padding: 24px
  gutter: 16px
  card-gap: 20px
  section-margin: 48px
---

## Brand & Style
The design system is a sophisticated fusion of organic heritage and precision technology. It targets the "modern cultivator"—individuals who view gardening not just as a hobby, but as a data-driven craft. The visual identity, categorized as **Experimental**, utilizes a dark, deep forest canvas to create a focused, immersive environment that feels like a high-tech workshop tucked away in a conservatory.

The style leverages **Experimental Minimalism** mixed with **Tactile Organicism**. It redefines the gardening experience by moving away from cluttered, "crafty" aesthetics toward a high-contrast, professional interface. Large, breathable card layouts prioritize the specimen—whether it's a seed packet, a soil sensor reading, or a growth timeline—transforming biological data into a modern, precision-based discipline.

## Colors
The palette is rooted in the "Deep Forest" aesthetic. The primary background is a near-black green (`#080C08`), providing a high-contrast stage for the cream (`#F5F5DC`) and sage (`#8FA382`) elements to pop. 

- **Primary (Cream):** Used for headlines and high-priority actions, representing the clarity of light in a dense canopy.
- **Secondary (Sage/Forest):** Used for structural elements and secondary UI components to maintain a botanical connection.
- **Tertiary (Terra Cotta):** Reserved for organic highlights, heat-maps, or specific soil-related data points.
- **Status Indicators:** Use muted, desaturated tones for "expired" or "expiring" seed badges to ensure they are readable without breaking the dark-mode immersion.

## Typography
This design system employs a "Heritage-Tech" typographic pairing. 

**Vollkorn** (Headlines) provides a sturdy, academic, and traditional feel. It suggests the authority of a botanical encyclopedia or a family-owned seed vault. It should be used for page titles and significant section headers.

**Space Grotesk** (Body & UI) introduces the "precision craft" element. Its technical, geometric construction ensures that complex gardening data—like PH levels, sun exposure percentages, and germination dates—remains legible and feels modern. Use the monospaced-adjacent qualities of Space Grotesk for all numerical data and labels.

## Layout & Spacing
The layout follows a **Fluid Grid** philosophy but utilizes "Oversized" containers to emphasize the craft. 

- **Desktop:** A 12-column grid with generous 24px gutters. Cards should feel expansive, often spanning 4 or 6 columns to allow for high-quality botanical photography and technical charts.
- **Mobile:** A 4-column grid with 16px margins. Stack cards vertically, ensuring horizontal swiping is reserved for image galleries or secondary data modules.
- **The "Potting Table" Rhythm:** Use a strict 8px base unit. Negative space should be treated as "oxygen" for the plants—do not overcrowd the UI. Every primary card should have at least 24px of internal padding to maintain its premium, organized feel.

## Elevation & Depth
Depth in this design system is achieved through **Tonal Layering** and **Subtle Organic Shadows**.

1.  **Background:** The deep forest (`#080C08`) is the lowest layer.
2.  **Surface:** Main containers use a slightly lighter green-tinted charcoal. 
3.  **Elevation:** For cards and interactive elements, use "Ambient Shadows"—diffused, low-opacity shadows with a slight forest-green tint (`rgba(0, 15, 5, 0.4)`). This makes cards feel like they are floating just above a dark potting bench.
4.  **Glassmorphism:** Use backdrop blurs (10px–15px) for floating navigation bars or overlays to simulate the steam or condensation found in a greenhouse.

## Shapes
Following the **Pill-shaped (3)** directive, the design system avoids harsh corners to mirror organic growth. 

- **Primary Cards:** Use `rounded-lg` (2rem / 32px) to create a friendly, inviting container for data.
- **Buttons and Chips:** Fully pill-shaped (1rem base) to provide a soft, tactile touch-point that contrasts against the technical typography.
- **Status Badges:** Circular or pill-shaped indicators for "live" or "dormant" statuses. 
- **Subtle Irregularity:** Where possible, use slightly asymmetrical radius values for purely decorative containers to mimic the imperfection of natural leaves or stones.

## Components
- **Buttons:** Primary buttons use the Cream (`#F5F5DC`) background with Deep Forest text. Secondary buttons should be "Ghost" style with a Sage border.
- **Specimen Cards:** The core component. Includes a large image area, a Vollkorn title, and a Space Grotesk metadata row (e.g., "Days to Harvest").
- **Status Chips:** Small, high-contrast badges located in the top right of cards. 
    - *Expired:* Terra Cotta background, Cream text.
    - *Expiring Soon:* Warning Yellow/Gold background, Deep Forest text.
- **Input Fields:** Darker-than-background fills with a thin 1px border that glows Sage when focused.
- **Progress Bars:** Representing growth or soil moisture. Use a thick, pill-shaped track with a textured Sage fill to represent life.
- **Botanical Icons:** Thin-line (1.5pt) icons with rounded caps, avoiding solid fills unless indicating a "selected" state.