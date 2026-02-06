import { defineConfig } from 'eslint/config';
export default defineConfig([
  {
    languageOptions: {
      globals: {
        theme: 'readonly'
      }
    }
  }
]);
