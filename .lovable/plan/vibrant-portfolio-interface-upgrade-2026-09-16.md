# Vibrant portfolio interface upgrade

## Goal
Upgrade the existing portfolio using the attached HTML as the visual reference, while keeping the current content-driven structure, accessibility, and static-site performance.

## Changes
- Refresh the header and introduction with stronger typography, colorful accents, richer status indicators, and a polished dark code window.
- Restyle About, Skills, Projects, and Certifications with the reference’s clearer hierarchy, varied accent colors, and more expressive cards.
- Keep all displayed portfolio content sourced from `src/data/portfolio.json`.
- Replace generic tool and credential symbols with recognizable brand-style marks where practical, while retaining accessible labels.
- Remove the contact form completely and replace it with a concise contact call-to-action using GitHub, LinkedIn, and email links.
- Add restrained entrance, hover, pulse, and code-line animations using the existing motion library, with reduced-motion support.
- Preserve responsive navigation, active-section tracking, keyboard focus states, and mobile layouts.

## Technical details
- Update the index route markup and supporting icon rendering.
- Refresh semantic color, typography, surface, shadow, and responsive styles in the global stylesheet.
- Load Outfit for display headings alongside Plus Jakarta Sans and JetBrains Mono.
- Verify desktop and mobile layouts, navigation, links, and browser console state in the live preview.
