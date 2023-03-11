import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import { useFonts } from 'expo-font';
import store from './store';
import { Provider } from 'react-redux';
import StackNavigator from './StackNavigator';


export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }


  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <StackNavigator/>
      
    </Provider>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff'
  }

});
