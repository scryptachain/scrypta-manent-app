#!/bin/bash
#USE THIS COMMANDS TO GENERATE AND SIGN THE ANDROID BUNDLE
ionic cordova build android --prod --release
cd platforms/android
./gradlew bundle
cd app/build/outputs/bundle/release
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ../../../../../../../keys/my-release-key.keystore app.aab alias_name
cd app/build/outputs/apk/release
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ../../../../../../../keys/my-release-key.keystore app-release-unsigned.apk alias_name