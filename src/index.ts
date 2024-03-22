// mdEditor main.js
import { initialize, reinitialize, isValid, checkAllValidity } from './functions';
export async function init(): Promise<void> {
  try {
    // Wait for the DOMContentLoaded event before executing further
    await new Promise<void>((resolve) => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => resolve());
      } else {
        resolve();
      }
    });
    initialize();
  } catch (error: any) {
    throw new Error(`${error.message}\r\nFailed to initialize mark down editor.`);
  }
}

// Call the init function immediately when the module is imported
init();

// Make functions available in the global scope for the browser console
(window as any).isValid = isValid;
(window as any).checkAllValidity = checkAllValidity;
(window as any).reinitialize = reinitialize;
