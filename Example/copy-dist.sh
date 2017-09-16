cd ..
yarn run build
cd Example
cp -R ../src ./node_modules/react-native-router-flux
cp -R ../dist ./node_modules/react-native-router-flux
