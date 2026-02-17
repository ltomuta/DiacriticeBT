# DiacriticeBT

A Chrome Extension that automatically replaces Romanian diacritics in input fields on the Banca Transilvania website (https://www.bancatransilvania.ro/).

## Features

- Automatically replaces `ț` with `t` (both lowercase and uppercase) in real-time
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
3. When you type `ț`, it will automatically be replaced with `t`
4. The same applies for uppercase: `Ț` → `T`

## Files

- `manifest.json` - Extension configuration file
- `content.js` - Main content script that performs the character replacement
- `icon*.png` - Extension icons

## How It Works

The extension uses a content script that:
1. Monitors all input and textarea elements on the page
2. Listens for input events on non-password fields
3. Replaces `ț` characters with `t` while preserving cursor position
4. Uses MutationObserver to handle dynamically added input fields

## Privacy

This extension:
- Only runs on https://www.bancatransilvania.ro/*
- Does not collect or transmit any data
- Only modifies input field values locally in your browser
- Does not access password fields

## License

MIT