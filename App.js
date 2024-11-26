// Entry point for the application

import RadialMenu from 'react-native-radial-menu';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default function App() {
  const [option, setOption] = useState("None");

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Hello, World!</Text>
      </View>
      <View style={styles.container}>
        <RadialMenu onOpen={() => console.log("Menu opened")} onClose={() => console.log("Menu closed")}>
          <Text style={styles.menuItem}>Example Menu</Text>
          <Text onSelect={() => setOption("Selected A")} style={styles.menuItem}>Option A</Text>
          <Text onSelect={() => setOption("Selected B")} style={styles.menuItem}>Option B</Text>
          <Text onSelect={() => setOption("Selected C")} style={styles.menuItem}>Option C</Text>
        </RadialMenu>
      </View>
      <View style={styles.container}>
      <Text>
        {`You've selected option: ${option}`}
      </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title : {
    fontSize: 36,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItem: {
    backgroundColor: 'black',
    color: 'white'
  }
});
