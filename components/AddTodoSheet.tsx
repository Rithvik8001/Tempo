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

export function AddTodoSheet({ isOpen, translateY, onClose, onAdd }: AddTodoSheetProps) {
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
        <Text style={styles.title}>Add New Todo</Text>
        <View style={styles.inputContainer}>
          <TextInput
            ref={inputRef}
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Enter your todo..."
            placeholderTextColor="#666"
            onSubmitEditing={handleAdd}
            returnKeyType="done"
          />
        </View>
        <TouchableOpacity 
          style={[
            styles.button,
            Platform.OS === "ios" && { marginBottom: 34 }
          ]} 
          onPress={handleAdd}
        >
          <Text style={styles.buttonText}>Add Todo</Text>
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
    backgroundColor: "#fafafa",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingTop: 0,
    borderWidth: 3,
    borderBottomWidth: 0,
    borderColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 10,
    zIndex: 2,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: "#000",
    borderRadius: 3,
    alignSelf: "center",
    marginVertical: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "brown",
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: "#fff",
    borderWidth: 3,
    borderColor: "#000",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 10,
    marginBottom: 20,
  },
  input: {
    padding: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
});
