import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.example.app",
  appName: "meme-app",
  webDir: "dist",
  server: {
    androidScheme: "https",
    url: "http://192.168.1.52:5173",
    cleartext: true,
  },
};

export default config;
