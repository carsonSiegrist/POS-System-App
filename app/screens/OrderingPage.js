import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Alert,
} from "react-native";
import RadialMenu from "react-native-radial-menu";
import { TableContext } from "../contexts/TableContext";
import { TouchableOpacity } from "react-native-gesture-handler";

// Suppress specific warning (introduced by RadialMenu library)
console.warn = () => {};

//orders stores all the orders. order at index 0 corresponds to table 1.
export default function OrderingPage({ navigation, orders, setOrders }) {
  const { currentTable } = useContext(TableContext); //Get current table

  //Example menu
  const menuItems = [
    { id: "1", name: "Hamburger", price: 9.99 },
    { id: "2", name: "Hamburger Meal", price: 12.99 },
    { id: "3", name: "Cheeseburger", price: 10.49 },
    { id: "4", name: "Cheeseburger Meal", price: 13.49 },

    { id: "5", name: "Vanilla Cupcake", price: 6.99 },
    { id: "6", name: "Red Velvet Cupcake", price: 6.99 },
    { id: "7", name: "Chocolate Cupcake", price: 6.99 },
    { id: "8", name: "Pumpkin Cupcake", price: 6.99 },

    { id: "9", name: "Steak (Rare)", price: 12.99 },
    { id: "10", name: "Steak (Medium-Rare)", price: 12.99 },
    { id: "11", name: "Steak (Medium)", price: 12.99 },
    { id: "12", name: "Steak (Well Done)", price: 99.99 },
  ];

  // Ensure orders array is long enough to store data for the current table
  const ensureOrdersLength = () => {
    const index = currentTable - 1;
    const diff = currentTable - orders.length;
    for (let i = 0; i < diff; i++) {
      setOrders([...orders, []]);
    }
  };

  const addToOrder = (item) => {
    ensureOrdersLength();
    const updatedOrders = [...orders];
    //Table id's are 1 based indexing, orders array is 0 based. table num to order index = table num -1
    updatedOrders[currentTable - 1] = [
      ...updatedOrders[currentTable - 1],
      item,
    ];
    setOrders(updatedOrders);
  };

  const removeFromOrder = (index) => {
    ensureOrdersLength();
    const currentOrder = orders[currentTable - 1] || []; // Ensure we have an array
    const updatedOrder = currentOrder.filter((_, i) => i !== index);
    const updatedOrders = [...orders];
    updatedOrders[currentTable - 1] = updatedOrder;
    setOrders(updatedOrders);
  };

  //Simulate handling payment. Simply splash to screen that payment is accepted.
  //Then clear order (that order is "finished")
  const handleTender = () => {
    ensureOrdersLength();
    //Calculate the total
    const tableOrder = orders[currentTable - 1] || [];
    //Calculate the sum of all item prices to 2 points precision (standard for USD)
    const total = tableOrder
      .reduce((sum, item) => sum + item.price, 0)
      .toFixed(2);
    Alert.alert(`Payment of $${total} was accepted!`);
    //Clear order
    const updatedOrders = [...orders];
    updatedOrders[currentTable - 1] = [];
    setOrders(updatedOrders);
  };

  // Handle item selection
  const handleItemSelect = (itemName) => {
    console.log("Handling item select: ", itemName);
    const item = GetItemByName(itemName);
    if (item) {
      console.log(`Selected item: ${item.name}`);
      addToOrder(item);
    }
  };

  // Helper function to get item by name
  const GetItemByName = (itemName) => {
    return menuItems[itemName] || null;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Menu Section (left 2/3 of screen*/}
      <View style={styles.menu}>
        <Text style={styles.header}>Menu</Text>

        <RadialMenu style={styles.radialMenu}>
          <Text>Hamburger</Text>
          <Text
            onSelect={() =>
              addToOrder({ id: "1", name: "Hamburger", price: 9.99 })
            }
            style={styles.menuItem}
          >
            Hamburger
          </Text>
          <Text
            onSelect={() =>
              addToOrder({ id: "2", name: "Hamburger Meal", price: 12.99 })
            }
            style={styles.menuItem}
          >
            Hamburger Meal
          </Text>
          <Text
            onSelect={() =>
              addToOrder({ id: "3", name: "Cheeseburger", price: 10.49 })
            }
            style={styles.menuItem}
          >
            Cheeseburger
          </Text>
          <Text
            onSelect={() =>
              addToOrder({ id: "4", name: "Cheeseburger Meal", price: 13.49 })
            }
            style={styles.menuItem}
          >
            Cheeseburger Meal
          </Text>
        </RadialMenu>

        {menuItems.map((item) => (
          <Button
            key={item.id}
            title={`${item.name} - $${item.price.toFixed(2)}`}
            onPress={() => addToOrder(item)}
          />
        ))}
      </View>

      {/* Order Section (right 1/3 of screen*/}
      <View style={styles.order}>
        <Text style={styles.header}>Current Order (Table {currentTable})</Text>
        <Button
          title="Change Table"
          onPress={() => navigation.navigate("TableSelectionPage")}
        />

        <FlatList
          data={orders[currentTable - 1] || []}
          keyExtractor={(item, index) => `${item.id}-${index}`} //Ensure unique
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => removeFromOrder(index)}
              style={styles.orderItem}
            >
              <Text>{item.name}</Text>
              <Text>{item.price.toFixed(2)}</Text>
            </TouchableOpacity>
          )}
        />

        {/* Tender and Total Button */}
        <View style={styles.totalContainer}>
          <Text style={styles.total}>
            Total: $
            {(
              orders[currentTable - 1]?.reduce(
                (sum, item) => sum + item.price,
                0
              ) || 0
            ).toFixed(2)}
          </Text>
          <Button title="Tender" onPress={handleTender} />
        </View>
      </View>
    </SafeAreaView>
  );

  /*
      <View>
        <RadialMenu
          onOpen={() => console.log("Menu opened")}
          onClose={() => console.log("Menu closed")}
        >
          <Text style={styles.menuItem}>Example Menu</Text>
          <Text
            onSelect={() => console.log("Selected A")}
            style={styles.menuItem}
          >
            Option A
          </Text>
          <Text
            onSelect={() => console.log("Selected B")}
            style={styles.menuItem}
          >
            Option B
          </Text>
          <Text
            onSelect={() => console.log("Selected C")}
            style={styles.menuItem}
          >
            Option C
          </Text>
        </RadialMenu>
      </View>
*/
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  menu: {
    flex: 2,
    padding: 10,
  },
  order: {
    flex: 1,
    padding: 10,
    borderLeftWidth: 1,
    borderColor: "#ccc",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  deleteAction: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    width: 80,
    height: "100%",
  },
  radialMenu: {
    padding: 150, // Ensure there's 50px of space from the nearest element
    left: 100,
    top: 100,
  },
  animatedItem: {
    overflow: "hidden",
  },
  totalContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  total: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
