# Testing Guide

## Manual Testing Instructions

### Prerequisites
1. Load the extension in Chrome (see README.md for installation)
2. Open the test.html file in Chrome or navigate to https://www.bancatransilvania.ro/

### Test Cases

#### Test 1: Basic Character Replacement
1. Type Romanian diacritics in any input field:
   - `ț` → ✓ Expected: Should become `t`
   - `Ț` → ✓ Expected: Should become `T`
   - `ă` → ✓ Expected: Should become `a`
   - `Ă` → ✓ Expected: Should become `A`
   - `â` → ✓ Expected: Should become `a`
   - `Â` → ✓ Expected: Should become `A`
   - `î` → ✓ Expected: Should become `i`
   - `Î` → ✓ Expected: Should become `I`
   - `ș` → ✓ Expected: Should become `s`
   - `Ș` → ✓ Expected: Should become `S`

#### Test 2: Multiple Characters
1. Type `țară` in an input field
2. ✓ Expected: Should become `tara`
3. Type `constituție` in an input field
4. ✓ Expected: Should become `constitutie`
5. Type `România` in an input field
6. ✓ Expected: Should become `Romania`
7. Type `împrumut` in an input field
8. ✓ Expected: Should become `imprumut`
9. Type `depășire` in an input field
10. ✓ Expected: Should become `depasire`

#### Test 3: Password Fields
1. Type `ț` or other diacritics in a password field
2. ✓ Expected: Should NOT be replaced, remains unchanged

#### Test 4: Cursor Position
1. Type `xțx` in an input field
2. Move cursor between the two x characters
3. Type another character
4. ✓ Expected: Cursor should remain in the correct position

#### Test 5: Dynamic Input Fields
1. On test.html, click "Add New Input Field"
2. Type diacritics in the newly added field
3. ✓ Expected: Should be replaced correctly

#### Test 6: Textarea
1. Type diacritics in a textarea element
2. ✓ Expected: Should be replaced correctly

### Browser Console Verification
1. Open Chrome DevTools (F12)
2. Navigate to Console tab
3. ✓ Expected: Should see "Diacritice BT extension loaded"

### Automated Test
Run `node test.js` to verify the replacement logic.

## Known Limitations
- Only works on https://www.bancatransilvania.ro/* domains
- Replaces Romanian diacritics: ț, ă, â, î, ș
- Does not modify password fields (by design)

## Troubleshooting
- If extension doesn't work, check that Developer Mode is enabled in chrome://extensions/
- Refresh the page after loading the extension
- Check browser console for error messages
