//Entry point of the application

import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TableProvider } from "./app/contexts/TableContext";
import OrderingPage from "./app/screens/OrderingPage";
import TableSelectionPage from "./app/screens/TableSelectionPage";
import { GestureHandlerRootView } from "react-native-gesture-handler";

//Using a stack navigator due to the simple structure of the app.
//The ordering page will serve as the bottom of the stack, and will never be popped.
//Table page is added to the stack when accessed - and removed when closed.
//This by default also supports intuitive gesters like swiping from the edge of the screen to clear it
//If we end up needing a new navigation structure for more pages, it will be simple to add them to the stack navigation structure.
//We'd just need to ensure proper handling of pages, i.e. disallow things like "menu page -> table -> setting -> table -> setting ... " occupying the stack.
const Stack = createStackNavigator();

export default function App() {
  //Tracks an order per table, allowing orders to persist across changing tables.
  //Suitable for small scale, does not maintain when closing app.
  //Defined here so that it can persist across all pages (passing it as a prop to each page.)
  const [orders, setOrders] = useState([[], [], [], [], []]);

  //Actual JSX that will be rendered
  //First we wrap the app in the GestureHandlerRootView so that the whole app can respond to gestures. (i.e. swiping)
  //Next we wrap the app in our table provider; This allows the whole app to access table information.
  //Next we load the navigation structure, then the initial page.
  //Loads the ordering page as it is the initial page in the navigator
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TableProvider>
        <NavigationContainer>
          {/* Create the stack navigator: set the Ordering Page to be the initial page. */}
          <Stack.Navigator initialRouteName="OrderingPage">
            <Stack.Screen name="OrderingPage">
              {(props) => (
                <OrderingPage
                  {...props}
                  orders={orders}
                  setOrders={setOrders}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="TableSelectionPage">
              {(props) => <TableSelectionPage {...props} orders={orders} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </TableProvider>
    </GestureHandlerRootView>
  );
}
