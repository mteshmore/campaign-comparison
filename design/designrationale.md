## Campaign Comparison Layout Explanation

### Why I Chose This Layout and Interaction Pattern

I chose this layout to keep the experience clear and focused while making comparison easy. Placing the compare list on the right keeps the selection order consistent and allows users to continue browsing the campaign list without losing context. Since the selections remain visible at all times, users don’t have to rely on memory, which helps reduce cognitive load.

The modal view allows users to see detailed metrics in a slightly decluttered space without leaving the page. This keeps the interaction contained and makes it simple to add or remove campaigns while quickly scanning the most important information side-by-side.

### Responsive Breakpoint (Desktop → Tablet)

I didn’t have time to fully design or implement responsive behavior. The current layout uses a grid-based card structure, which could adjust naturally across screen sizes, but things like abbreviated campaign names for smaller screens or collapsing the compare bar into a hamburger menu weren’t designed. Given more time, I would prioritize these adjustments to maintain readability and functionality on tablet and mobile devices.

### Accessibility Consideration (WCAG 2.1 AA)

From an accessibility perspective, I focused on clear visual hierarchy and strong contrast between sections to support readability. Interactive elements are consistently placed and clearly labeled to support screen readers and predictable keyboard navigation. The persistent compare bar also follows a logical focus order to reduce confusion.

### Trade-off and Rationale

I chose to keep the compare bar on the right instead of moving it to the bottom. While a bottom bar may feel more mobile-native, the right placement better separates browsing from comparison and keeps the call to action visible without disrupting the flow.