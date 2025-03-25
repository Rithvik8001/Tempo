import { Text, View, SafeAreaView, FlatList, StyleSheet } from "react-native";

export default function Index() {
  const todoItems = [
    { id: 1, title: "This is First Todo!", isCompleted: false },
    { id: 2, title: "This is Second Todo!", isCompleted: false },
    { id: 3, title: "This is Third Todo!", isCompleted: false },
    { id: 4, title: "This is Fourth Todo!", isCompleted: false },
    { id: 5, title: "This is Fifth Todo!", isCompleted: false },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Your Todos</Text>
      </View>
      <FlatList
        style={styles.todoContainer}
        data={todoItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}>{item.title}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa", // Ultra-light background
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 6, height: 6 }, // Sharp offset shadow
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 10, // For Android
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#000",
  },
  todoContainer: {
    padding: 20,
  },
});
