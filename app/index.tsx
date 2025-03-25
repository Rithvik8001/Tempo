import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";

export default function Index() {
  const todoItems = [
    { id: 1, title: "Complete RN Todo list!", isCompleted: false },
    { id: 2, title: "Study About Expo Router!", isCompleted: false },
    { id: 3, title: "This is Third Todo!", isCompleted: true },
    { id: 4, title: "This is Fourth Todo!", isCompleted: false },
    { id: 5, title: "This is Fifth Todo!", isCompleted: false },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header (Clean, Minimalist) */}
      <View style={styles.header}>
        <Text style={styles.title}>Todos</Text>
        <Image
          source={{ uri: "https://github.com/shadcn.png" }}
          style={styles.avatar}
        />
      </View>

      {/* Todo List (Neo-Brutalist Style) */}
      <FlatList
        contentContainerStyle={styles.todoContainer}
        data={todoItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Checkbox style={styles.checkbox} value={item.isCompleted} />
            <Text
              style={[
                styles.text,
                item.isCompleted && { textDecorationLine: "line-through" },
              ]}
            >
              {item.title}
            </Text>
            <TouchableOpacity
              onPress={() => {
                alert("Todo Deleted");
              }}
            >
              <Ionicons name="trash" size={18} color={"red"} />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "brown",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  todoContainer: {
    padding: 15,
  },
  card: {
    backgroundColor: "#fff",
    padding: 14,
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 10, // For Android
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 16,
    fontWeight: "semibold",
    textTransform: "uppercase",
    color: "#000",
  },
  checkbox: {
    marginRight: 15,
  },
});
