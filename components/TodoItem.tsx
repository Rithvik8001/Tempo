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
    <View style={styles.card}>
      <Checkbox 
        style={styles.checkbox} 
        value={todo.isCompleted}
        onValueChange={() => onToggle(todo.id)} 
      />
      <Text
        style={[
          styles.text,
          todo.isCompleted && { textDecorationLine: "line-through" },
        ]}
      >
        {todo.title}
      </Text>
      <TouchableOpacity onPress={() => onDelete(todo.id)}>
        <Ionicons name="trash" size={18} color={"red"} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
    elevation: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  checkbox: {
    marginRight: 15,
  },
});
