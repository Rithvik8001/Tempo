import { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Platform,
  Keyboard,
} from "react-native";

interface AddTodoSheetProps {
  isOpen: boolean;
  translateY: Animated.Value;
  onClose: () => void;
  onAdd: (text: string) => void;
}

export function AddTodoSheet({
  isOpen,
  translateY,
  onClose,
  onAdd,
}: AddTodoSheetProps) {
  const [text, setText] = useState("");
  const inputRef = useRef<TextInput>(null);

  const handleAdd = () => {
    if (text.trim()) {
      onAdd(text.trim());
      setText("");
      Keyboard.dismiss();
    }
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <Animated.View
          style={[
            styles.backdrop,
            {
              opacity: translateY.interpolate({
                inputRange: [0, 300],
                outputRange: [0.5, 0],
              }),
            },
          ]}
        >
          <TouchableOpacity
            style={styles.backdropTouchable}
            activeOpacity={1}
            onPress={() => {
              Keyboard.dismiss();
              onClose();
            }}
          />
        </Animated.View>
      )}

      {/* Sheet */}
      <Animated.View
        style={[
          styles.sheet,
          {
            transform: [{ translateY }],
          },
        ]}
      >
        <View style={styles.handle} />
        <Text style={styles.title}>New Task</Text>
        <View style={styles.inputContainer}>
          <TextInput
            ref={inputRef}
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="What's on your mind?"
            placeholderTextColor="#8E8E93"
            onSubmitEditing={handleAdd}
            returnKeyType="done"
            multiline
          />
        </View>
        <TouchableOpacity
          style={[styles.button, Platform.OS === "ios" && { marginBottom: 34 }]}
          onPress={handleAdd}
        >
          <Text style={styles.buttonText}>Add Task</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#000",
    zIndex: 1,
  },
  backdropTouchable: {
    flex: 1,
  },
  sheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 300,
    backgroundColor: "#fff",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 20,
    paddingTop: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 2,
  },
  handle: {
    width: 36,
    height: 5,
    backgroundColor: "#E5E5EA",
    borderRadius: 2.5,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 16,
  },
  inputContainer: {
    backgroundColor: "#F2F2F7",
    borderRadius: 10,
    marginBottom: 24,
  },
  input: {
    padding: 16,
    fontSize: 17,
    color: "#000000",
    minHeight: 80,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#fff",
  },
});
