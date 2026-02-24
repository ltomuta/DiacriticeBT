// Content script for replacing Romanian and Hungarian diacritics on Banca Transilvania website
// Replaces Romanian diacritics (ț, ă, â, î, ș) and Hungarian diacritics (á, é, í, ó, ö, ő, ú, ü, ű) with regular characters in non-password input fields

(function() {
  'use strict';

  /**
   * Replace Romanian and Hungarian diacritics with regular characters
   * @param {string} text - The text to process
   * @returns {string} The processed text
   */
  function replaceDiacritics(text) {
    if (!text) return text;
    return text
      .replace(/ț/g, 't')
      .replace(/Ț/g, 'T')
      .replace(/ă/g, 'a')
      .replace(/Ă/g, 'A')
      .replace(/â/g, 'a')
      .replace(/Â/g, 'A')
      .replace(/î/g, 'i')
      .replace(/Î/g, 'I')
      .replace(/ș/g, 's')
      .replace(/Ș/g, 'S')
      .replace(/á/g, 'a')
      .replace(/Á/g, 'A')
      .replace(/é/g, 'e')
      .replace(/É/g, 'E')
      .replace(/í/g, 'i')
      .replace(/Í/g, 'I')
      .replace(/ó/g, 'o')
      .replace(/Ó/g, 'O')
      .replace(/ö/g, 'o')
      .replace(/Ö/g, 'O')
      .replace(/ő/g, 'o')
      .replace(/Ő/g, 'O')
      .replace(/ú/g, 'u')
      .replace(/Ú/g, 'U')
      .replace(/ü/g, 'u')
      .replace(/Ü/g, 'U')
      .replace(/ű/g, 'u')
      .replace(/Ű/g, 'U');
  }

  /**
   * Handle input event on a field
   * @param {Event} event - The input event
   */
  function handleInput(event) {
    const input = event.target;
    
    // Only process if it's not a password field
    if (input.type === 'password') {
      return;
    }

    const cursorPosition = input.selectionStart;
    const originalValue = input.value;
    const newValue = replaceDiacritics(originalValue);

    // Only update if there was a change
    if (originalValue !== newValue) {
      input.value = newValue;
      
      // Since all diacritics are single-character replacements, cursor position remains the same
      input.setSelectionRange(cursorPosition, cursorPosition);
    }
  }

  /**
   * Setup input listeners for an element
   * @param {HTMLElement} element - The element to setup
   */
  function setupInputListener(element) {
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      // Don't add listener if already added
      if (!element.dataset.diacriticeListener) {
        element.addEventListener('input', handleInput);
        element.dataset.diacriticeListener = 'true';
      }
    }
  }

  /**
   * Process all input fields on the page
   */
  function processExistingInputs() {
    const inputs = document.querySelectorAll('input:not([type="password"]), textarea');
    inputs.forEach(setupInputListener);
  }

  /**
   * Observer callback for DOM mutations
   * @param {MutationRecord[]} mutations - The mutations
   */
  function handleMutations(mutations) {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          // Check if the node itself is an input
          setupInputListener(node);
          
          // Check for inputs within the node
          if (node.querySelectorAll) {
            const inputs = node.querySelectorAll('input:not([type="password"]), textarea');
            inputs.forEach(setupInputListener);
          }
        }
      });
    });
  }

  // Process existing inputs
  processExistingInputs();

  // Watch for dynamically added inputs
  const observer = new MutationObserver(handleMutations);
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  console.log('Diacritice BT extension loaded');
})();
