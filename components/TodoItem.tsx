import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";
import { Todo } from "../types";

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

export function TodoItem({ todo, onDelete, onToggle }: TodoItemProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onToggle(todo.id)}
      activeOpacity={0.7}
    >
      <View style={styles.card}>
        <View style={styles.leftSection}>
          <Checkbox
            style={styles.checkbox}
            value={todo.isCompleted}
            onValueChange={() => onToggle(todo.id)}
            color={todo.isCompleted ? "#007AFF" : undefined}
          />
          <Text style={[styles.text, todo.isCompleted && styles.completedText]}>
            {todo.title}
          </Text>
        </View>
        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation();
            onDelete(todo.id);
          }}
          style={styles.deleteButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="trash-outline" size={16} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    marginHorizontal: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E5EA",
  },
  leftSection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    flex: 1,
    fontSize: 17,
    marginLeft: 12,
    color: "#000000",
    fontWeight: "400",
  },
  completedText: {
    color: "#8E8E93",
    textDecorationLine: "line-through",
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#007AFF",
  },
  deleteButton: {
    marginLeft: 12,
    padding: 4,
  },
});
