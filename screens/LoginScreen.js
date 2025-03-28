import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <View style={styles.container}>
            {/* Background Design */}
            <View style={styles.headerBackground} />

            {/* Login Title */}
            <Text style={styles.loginText}>Login</Text>

            {/* Email Input */}
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#fff"
                value={email}
                onChangeText={setEmail}
            />

            {/* Password Input */}
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#fff"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            {/* Forgot Password */}
            <TouchableOpacity>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Social Login */}
            <View style={styles.socialContainer}>
                <TouchableOpacity>
                    <Image source={require("../assets/google.png")} style={styles.socialIcon} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require("../assets/facebook.png")} style={styles.socialIcon} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require("../assets/insta.png")} style={styles.socialIcon} />
                </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("Home")}>
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            {/* Register Text */}
            <Text style={styles.registerText}>
                New Here?{" "}
                <Text style={styles.registerLink} onPress={() => navigation.navigate("Register")}>
                    Register
                </Text>
            </Text>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FF3B30",
        alignItems: "center",
        justifyContent: "center",
    },
    headerBackground: {
        position: "absolute",
        width: "100%",
        height: "30%",
        backgroundColor: "#FEE4C4",
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
        top: 0,
    },
    loginText: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#FFF",
        marginBottom: 20,
    },
    input: {
        width: "80%",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        padding: 12,
        marginVertical: 10,
        borderRadius: 8,
        color: "#FFF",
    },
    forgotPassword: {
        color: "#FFF",
        textAlign: "right",
        width: "80%",
        marginBottom: 20,
    },
    socialContainer: {
        flexDirection: "row",
        gap: 20,
        marginBottom: 20,
    },
    socialIcon: {
        width: 30,
        height: 30,
        backgroundColor: "transparent",
      },
    loginButton: {
        backgroundColor: "#FEE4C4",
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 8,
        marginBottom: 20,
    },
    loginButtonText: {
        color: "#FF3B30",
        fontWeight: "bold",
        fontSize: 18,
    },
    registerText: {
        color: "#FFF",
        fontSize: 14,
    },
    registerLink: {
        fontWeight: "bold",
        textDecorationLine: "underline",
    },
});

export default LoginScreen;
