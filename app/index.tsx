import { useState, useRef } from "react";
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TodoItem } from "../components/TodoItem";
import { AddTodoSheet } from "../components/AddTodoSheet";
import { Todo } from "../types";

const SHEET_MAX_HEIGHT = 300;

export default function Index() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [todoItems, setTodoItems] = useState<Todo[]>([]);
  const translateY = useRef(new Animated.Value(SHEET_MAX_HEIGHT)).current;

  const toggleSheet = () => {
    const toValue = isSheetOpen ? SHEET_MAX_HEIGHT : 0;
    setIsSheetOpen(!isSheetOpen);

    Animated.spring(translateY, {
      toValue,
      useNativeDriver: true,
      bounciness: 2,
    }).start();
  };

  const handleAddTodo = (text: string) => {
    const newTodo = {
      id: Date.now(),
      title: text,
      isCompleted: false,
    };
    setTodoItems([...todoItems, newTodo]);
    toggleSheet();
  };

  const handleDeleteTodo = (id: number) => {
    setTodoItems(todoItems.filter((todo) => todo.id !== id));
  };

  const handleToggleTodo = (id: number) => {
    setTodoItems(
      todoItems.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header (Clean, Minimalist) */}
        <View style={styles.header}>
          <Text style={styles.title}>Todos</Text>
          <Image
            source={{ uri: "https://github.com/shadcn.png" }}
            style={styles.avatar}
          />
        </View>

        {/* Todo List */}
        {todoItems.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No todos yet!</Text>
            <Text style={styles.emptyStateSubtext}>
              Tap the + button to add your first todo
            </Text>
          </View>
        ) : (
          <FlatList
            contentContainerStyle={styles.todoContainer}
            data={todoItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TodoItem
                todo={item}
                onDelete={handleDeleteTodo}
                onToggle={handleToggleTodo}
              />
            )}
          />
        )}

        {/* Add Todo Sheet */}
        <AddTodoSheet
          isOpen={isSheetOpen}
          translateY={translateY}
          onClose={toggleSheet}
          onAdd={handleAddTodo}
        />

        {/* Floating Action Button */}
        <TouchableOpacity style={styles.fab} onPress={toggleSheet}>
          <Ionicons
            name={isSheetOpen ? "close" : "add"}
            size={32}
            color="brown"
          />
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  safeArea: {
    flex: 1,
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
    paddingBottom: 100,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 100,
  },
  emptyStateText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 16,
    color: "#999",
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 10,
    zIndex: 2,
  },
});
