# React + TypeScript + Vite

```
 npm run dev
```

# Ionic Capacitor

Download **Android APK** file by using **Ionic Capacitor**

Ionic Capacitor 이용해서 Android APK 파일 다운로드

1.  Clone build/android branch and Move to the directory

```
git clone --branch build/android https://github.com/PDA-Dontouch/app-client.git Dontouch-Android

cd Dontouch-Android
```

2.  Npm install

```
npm install
```

3.  Set .env file

4.  Add Android platform

```
npx cap add android
```

5.  Build project

```
npm run build
```

6.  Sync Android

```
npx cap sync android
```

7.  If you have an android emulator, you can run this project by using this command.

```
npm run android-open
```

8.  If you don't have, then you can make an Apk file and download it on Android device by using this command.

```
npm run build-android
```
