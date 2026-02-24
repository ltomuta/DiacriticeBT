# DiacriticeBT

A Chrome Extension that automatically replaces Romanian and Hungarian diacritics in input fields on the Banca Transilvania website (https://www.bancatransilvania.ro/).

## Features

- Automatically replaces Romanian diacritics in real-time:
  - `ț` → `t` / `Ț` → `T`
  - `ă` → `a` / `Ă` → `A`
  - `â` → `a` / `Â` → `A`
  - `î` → `i` / `Î` → `I`
  - `ș` → `s` / `Ș` → `S`
- Automatically replaces Hungarian diacritics in real-time:
  - `á` → `a` / `Á` → `A`
  - `é` → `e` / `É` → `E`
  - `í` → `i` / `Í` → `I`
  - `ó` → `o` / `Ó` → `O`
  - `ö` → `o` / `Ö` → `O`
  - `ő` → `o` / `Ő` → `O`
  - `ú` → `u` / `Ú` → `U`
  - `ü` → `u` / `Ü` → `U`
  - `ű` → `u` / `Ű` → `U`
- Works on all input fields except password fields
- Maintains cursor position during replacement
- Supports dynamically added input fields (SPAs and AJAX forms)

## Installation

### From Source

1. Clone this repository:
   ```bash
   git clone https://github.com/ltomuta/DiacriticeBT.git
   cd DiacriticeBT
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" (toggle in the top right corner)

4. Click "Load unpacked" and select the repository folder

5. The extension is now installed and active!

## Usage

1. Navigate to https://www.bancatransilvania.ro/
2. Type in any input field (except password fields)
3. Romanian diacritics are automatically replaced:
   - Example: `România` → `Romania`
   - Example: `constituție` → `constitutie`
   - Example: `împrumut` → `imprumut`

<img width="3834" height="2058" alt="image" src="https://github.com/user-attachments/assets/670e3bc4-6a0d-4e18-a6d6-459d39259961" />

## Files

- `manifest.json` - Extension configuration file
- `content.js` - Main content script that performs the character replacement
- `icon*.png` - Extension icons

## How It Works

The extension uses a content script that:
1. Monitors all input and textarea elements on the page
2. Listens for input events on non-password fields
3. Replaces Romanian diacritics with their ASCII equivalents while preserving cursor position
4. Uses MutationObserver to handle dynamically added input fields

## Privacy

This extension:
- Only runs on https://www.bancatransilvania.ro/*
- Does not collect or transmit any data
- Only modifies input field values locally in your browser
- Does not access password fields

## License

MIT
