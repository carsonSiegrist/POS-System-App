import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { TableContext } from "../contexts/TableContext";

export default function TableSelectionPage({ navigation }) {
  const { setCurrentTable } = useContext(TableContext);

  const tables = [1, 2, 3, 4, 5]; // Table ids, can be set to whatever.

  //Redirect users back to the ordering page after they select
  //We pop the stack navigator to return in order to avoid stacking a great many pages on top of each other
  const selectTable = (table) => {
    setCurrentTable(table);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Table Selection</Text>
      <View style={styles.tables}>
        {
          //map() applies a function to each element of the array
          tables.map((table) => (
            <Button
              key={table}
              title={`Table ${table}`}
              onPress={() => selectTable(table)}
            />
          ))
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 24, fontWeight: "bold" },
  tables: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
});
