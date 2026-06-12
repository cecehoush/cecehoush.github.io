import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Custom domain (cecehoush.com) serves from the apex, so base is '/'.
// The public/CNAME file tells GitHub Pages to use the custom domain.
export default defineConfig({
  plugins: [react()],
  base: '/',
});
