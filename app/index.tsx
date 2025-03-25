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
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Inbox</Text>
            <Text style={styles.subtitle}>
              {todoItems.length === 0
                ? "No tasks yet"
                : `${todoItems.filter((t) => !t.isCompleted).length} remaining`}
            </Text>
          </View>
          <Image
            source={{ uri: "https://github.com/shadcn.png" }}
            style={styles.avatar}
          />
        </View>

        {/* Todo List */}
        {todoItems.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>All Clear</Text>
            <Text style={styles.emptyStateSubtext}>
              Add tasks to get started
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
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: "#8E8E93",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E5E5EA",
  },
  todoContainer: {
    paddingVertical: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 100,
  },
  emptyStateText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 17,
    color: "#8E8E93",
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
});
