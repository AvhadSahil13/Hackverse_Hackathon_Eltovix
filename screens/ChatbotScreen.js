import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";

const ChatbotScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    const newMessages = [...messages, { text: inputText, sender: "user" }];
    setMessages(newMessages);
    setInputText("");

    // Simulating chatbot response (You can integrate AI later)
    setTimeout(() => {
      setMessages([...newMessages, { text: "I'm here to help! How can I assist you?", sender: "bot" }]);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, item.sender === "user" ? styles.userMessage : styles.botMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10 },
  messageContainer: { padding: 10, borderRadius: 10, marginVertical: 5, maxWidth: "80%" },
  userMessage: { backgroundColor: "#FF3B30", alignSelf: "flex-end" },
  botMessage: { backgroundColor: "#ddd", alignSelf: "flex-start" },
  messageText: { color: "white" },
  inputContainer: { flexDirection: "row", padding: 10, borderTopWidth: 1, borderColor: "#ccc" },
  input: { flex: 1, borderWidth: 1, borderColor: "#ccc", borderRadius: 20, padding: 10, marginRight: 10 },
  sendButton: { backgroundColor: "#FF3B30", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20 },
  sendButtonText: { color: "white", fontWeight: "bold" },
});

export default ChatbotScreen;
