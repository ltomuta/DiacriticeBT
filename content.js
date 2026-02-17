// Content script for replacing Romanian diacritics on Banca Transilvania website
// Replaces ț with t in non-password input fields

(function() {
  'use strict';

  /**
   * Replace ț with t in a string
   * @param {string} text - The text to process
   * @returns {string} The processed text
   */
  function replaceDiacritics(text) {
    if (!text) return text;
    return text.replace(/ț/g, 't').replace(/Ț/g, 'T');
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
      
      // Restore cursor position
      // Adjust cursor position if characters were replaced before cursor
      const beforeCursor = originalValue.substring(0, cursorPosition);
      const newBeforeCursor = replaceDiacritics(beforeCursor);
      const newCursorPosition = cursorPosition - (beforeCursor.length - newBeforeCursor.length);
      
      input.setSelectionRange(newCursorPosition, newCursorPosition);
      
      // Trigger input event to ensure any listeners are notified
      input.dispatchEvent(new Event('input', { bubbles: true }));
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
