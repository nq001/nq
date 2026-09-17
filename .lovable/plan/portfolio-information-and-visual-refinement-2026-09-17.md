# Portfolio information and visual refinement

## Goal
Update Naif’s location and contact destinations, add a light dynamic background, and replace improvised tool initials with recognizable brand marks while preserving accessibility and performance.

## Changes
- Change the displayed location from Riyadh to Khobar.
- Update GitHub to `https://github.com/nq001`, LinkedIn to `https://www.linkedin.com/in/naifalqubalee`, and email to `naif@qubalee.com` everywhere they are sourced.
- Add a restrained animated light-background treatment behind the introduction, with an instant static fallback for reduced-motion users.
- Keep the humanistic Outfit and Plus Jakarta Sans typography; monospace remains limited to code and small technical labels.
- Replace the letter-based tool badges with official-style technology logos where available, and use clear neutral icons for concepts without an official logo.
- Verify desktop and mobile layout, links, animation, and browser console state.

## Technical details
- Keep all personal and contact information in `src/data/portfolio.json`.
- Use a maintained React brand-icon package for technology marks and retain accessible visible labels.
- Implement background movement with CSS transforms only to avoid layout shifts and excessive rendering cost.
