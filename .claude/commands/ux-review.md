# ux-review

Visual UX review using Playwright MCP to navigate, screenshot, and evaluate UI.

## Prerequisites

- Dev server running (`npm start` in terminal)
- Playwright MCP available (mcp__playwright__ tools)

## Playwright MCP Tools Available

- `mcp__playwright__browser_navigate` - Navigate to URL
- `mcp__playwright__browser_snapshot` - Get page accessibility tree (for element refs)
- `mcp__playwright__browser_take_screenshot` - Capture visual state
- `mcp__playwright__browser_click` - Click elements by ref
- `mcp__playwright__browser_type` - Type text in inputs
- `mcp__playwright__browser_wait_for` - Wait for text/time
- `mcp__playwright__browser_tabs` - Manage browser tabs
- `mcp__playwright__browser_resize` - Resize browser window

## Steps

1. **Verify server is running**:
   - Check terminal logs for active Vite server
   - Default URL: `http://localhost:5173`

2. **Navigate and capture screenshots**:
   - Use `mcp__playwright__browser_navigate` to go to each page
   - Use `mcp__playwright__browser_snapshot` to get element references
   - Use `mcp__playwright__browser_take_screenshot` to capture current state
   - Use `mcp__playwright__browser_click` / `mcp__playwright__browser_type` to interact with UI

3. **Test flow** (adjust based on feature):
   ```
   Landing page → Main features → Forms → Modals/Dialogs
   ```

4. **For each screen, evaluate**:
   - Layout and spacing consistency
   - Typography hierarchy
   - Color contrast and theme (light/dark)
   - Interactive elements (buttons, inputs, links)
   - Loading states
   - Error states
   - Modal/dialog behavior (backdrop, close, animations)

5. **Report findings**:
   - List screenshots taken with descriptions
   - Note any UI issues found
   - Confirm working features

## Example Flow

```
1. mcp__playwright__browser_navigate → http://localhost:5173
2. mcp__playwright__browser_take_screenshot → 01-landing.png
3. mcp__playwright__browser_snapshot → get element refs
4. mcp__playwright__browser_click → main CTA button ref
5. mcp__playwright__browser_wait_for → 2 seconds
6. mcp__playwright__browser_take_screenshot → 02-main-page.png
7. mcp__playwright__browser_click → theme toggle
8. mcp__playwright__browser_take_screenshot → 03-dark-mode.png
```

## Output Format

| # | Screen | Status | Notes |
|---|--------|--------|-------|
| 1 | Landing | OK/FAIL | Description |
| 2 | Main Page | OK/FAIL | Description |
| ... | ... | ... | ... |

## Checklist

- [ ] Backdrop blur on modals
- [ ] Button states (hover, disabled, loading)
- [ ] Form validation feedback
- [ ] Empty states
- [ ] Dark/light theme consistency
- [ ] Animation smoothness
- [ ] Keyboard navigation (Escape to close modals)
- [ ] Mobile responsiveness (use mcp__playwright__browser_resize)
