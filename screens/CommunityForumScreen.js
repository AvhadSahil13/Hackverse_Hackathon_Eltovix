// CommunityForumScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import BottomNav from "../components/BottomNav"; 

// import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome } from "@expo/vector-icons";

export default function CommunityForumScreen() {
  const navigation = useNavigation();
  // const [fromDate, setFromDate] = useState(new Date());
  // const [toDate, setToDate] = useState(new Date());
  const [message, setMessage] = useState("");
  // const [showFromPicker, setShowFromPicker] = useState(false);
  // const [showToPicker, setShowToPicker] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>{"<"} Community Forum</Text>
      </TouchableOpacity>
      <TextInput placeholder="Enter location" style={styles.input} />
      <FontAwesome
        name="map-marker"
        size={24}
        color="red"
        style={styles.icon}
      />

      {/* <Text style={styles.label}>Time</Text>
      <View style={styles.timeContainer}>
        <TouchableOpacity
          onPress={() => setShowFromPicker(true)}
          style={styles.dateInput}
        >
          <Text>{fromDate.toDateString()}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShowToPicker(true)}
          style={styles.dateInput}
        >
          <Text>{toDate.toDateString()}</Text>
        </TouchableOpacity>
      </View>
      {showFromPicker && (
        <DateTimePicker
          value={fromDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowFromPicker(false);
            if (date) setFromDate(date);
          }}
        />
      )}
      {showToPicker && (
        <DateTimePicker
          value={toDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowToPicker(false);
            if (date) setToDate(date);
          }}
        />
      )} */}

      <Text style={styles.label}>Message</Text>
      <TextInput
        placeholder="Explain the incident you encountered..."
        style={styles.textArea}
        multiline
        value={message}
        onChangeText={setMessage}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Report Incident</Text>
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDE5C0",
    padding: 20,
  },
  backText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  icon: {
    position: "absolute",
    right: 30,
    top: 50,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  dateInput: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  textArea: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    minHeight: 100,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#FF3B6D",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
