import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pda.dontouch',
  appName: 'dontouch',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
