# Design Guidelines: Ideal Gas Law Calculator

## Design Approach
**System-Based Approach**: Material Design inspired with scientific calculator aesthetics
- Clean, functional interface prioritizing clarity and efficiency
- Educational context requires professional, trustworthy appearance
- Focus on data visualization and form usability

## Typography System
**Font Families**:
- Primary: 'Inter' (Google Fonts) - UI elements, labels, body text
- Monospace: 'JetBrains Mono' (Google Fonts) - numerical values, results

**Hierarchy**:
- H1 (Title): text-3xl md:text-4xl font-bold
- H2 (Section headers): text-xl md:text-2xl font-semibold
- Body text: text-base
- Labels: text-sm font-medium uppercase tracking-wide
- Results: text-2xl font-mono font-bold
- Table data: text-sm font-mono

## Layout System
**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, and 16 only
- Component spacing: p-6, p-8
- Section gaps: gap-8, gap-12
- Form field spacing: space-y-4
- Inline spacing: gap-2, gap-4

**Container Structure**:
- Max-width: max-w-5xl mx-auto
- Page padding: px-4 md:px-8
- Vertical rhythm: py-12 between major sections

## Component Library

### Header Section
- Centered layout with title and subtitle
- Title with scientific emphasis
- Brief description (2-3 lines) explaining PV = nRT
- Padding: py-8

### Calculator Form Card
- Elevated card design with rounded corners (rounded-xl)
- Shadow: shadow-lg
- Padding: p-8
- Grid layout for inputs: grid grid-cols-1 md:grid-cols-2 gap-6

**Input Fields**:
- Labels above inputs with units clearly marked (e.g., "Presión (P) - atm")
- Full-width inputs with consistent height (h-12)
- Border radius: rounded-lg
- Focus states with ring treatment
- Placeholder text showing example values

**Variable Selector**:
- Radio buttons in horizontal layout on desktop, vertical on mobile
- Clear visual indication of selected variable
- Positioned prominently before Calculate button

**Calculate Button**:
- Full-width on mobile, auto-width centered on desktop
- Height: h-12
- Bold text with icon (calculation symbol)
- Padding: px-8

### Results Display
- Prominent card below form (mt-8)
- Grid showing all four variables with clear labels
- Calculated value highlighted with larger text and visual distinction
- Padding: p-6

### Error Messages
- Alert-style banner above results
- Left-aligned with icon
- Clear, readable text
- Padding: p-4, rounded-lg

### History Section
**Table Design**:
- Full-width responsive table
- Sticky header on scroll
- Alternating row treatment
- Columns: Timestamp, P, V, n, T, Variable Calculada
- Timestamp format: "DD/MM/YYYY HH:mm:ss"
- Monospace font for numerical values
- Max height with scroll: max-h-96 overflow-y-auto
- Empty state message when no history exists

### Chart Section
- Full-width canvas container
- Aspect ratio: 16:9 on desktop, 4:3 on mobile
- Padding: p-6
- Chart.js configuration:
  - Line chart with smooth curves
  - Grid lines for readability
  - Tooltip showing full calculation details
  - Legend showing variable being tracked
  - Responsive: true

## Layout Flow (Top to Bottom)
1. **Header** - Centered, py-8
2. **Calculator Form** - max-w-3xl mx-auto
3. **Results Display** - max-w-3xl mx-auto, mt-8 (conditional)
4. **History Table** - max-w-5xl mx-auto, mt-12
5. **Chart Visualization** - max-w-4xl mx-auto, mt-12

## Responsive Behavior
- Mobile: Single column, stacked layout, full-width components
- Tablet (md): Two-column form grid, wider containers
- Desktop (lg): Optimal reading width, horizontal radio buttons

## Accessibility
- All inputs have associated labels with for/id attributes
- Error messages with role="alert"
- Keyboard navigation fully supported
- Focus visible on all interactive elements

## Icons
Use **Heroicons** via CDN (outline style):
- Calculator icon for submit button
- Chart icon for graph section
- Clock icon for history timestamp
- Alert icon for error messages

## Animation
Minimal, purposeful animations only:
- Fade-in for results display (duration-300)
- Smooth chart updates (Chart.js default transitions)
- No distracting animations on form interactions

## Special Considerations
- Spanish language throughout ("Calcular", "Historial", "Presión", etc.)
- Scientific notation support in display
- Decimal precision: 4 decimal places for results
- Clear visual separation between form, results, history, and chart sections
- Professional, academic aesthetic appropriate for educational/scientific context