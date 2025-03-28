import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

const SelfDefenceTut = () => {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [playing, setPlaying] = useState(true);

    const videos = [
        { id: "3Q8nIhuEwU4", title: "Basic Self-Defense Moves Everyone Should Know" },
        { id: "3jZ5vnv-LZc", title: "How to Escape from an Attacker" },
        { id: "0aY1zqg77j4", title: "5 Effective Self-Defense Techniques for Women" },
        { id: "6My8Gz0anpE", title: "How to React in a Dangerous Situation" },
    ];

    const nextVideo = () => {
        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
        setPlaying(true);
    };

    const handleSearch = () => {
        const foundIndex = videos.findIndex(video =>
            video.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (foundIndex !== -1) {
            setCurrentVideoIndex(foundIndex);
            setPlaying(true);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Self-Defense Tutorials</Text>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search self-defense tutorials..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Text style={styles.searchButtonText}>Search</Text>
                </TouchableOpacity>
            </View>

            {/* Video Player */}
            <View style={styles.videoContainer}>
                <YoutubePlayer
                    height={220}
                    play={playing}
                    videoId={videos[currentVideoIndex].id}
                    webViewProps={{
                        allowsFullscreenVideo: true,
                    }}
                    onChangeState={event => event === "ended" && setPlaying(false)}
                />
            </View>

            {/* Next Video Button */}
            <TouchableOpacity style={styles.nextButton} onPress={nextVideo}>
                <Text style={styles.nextButtonText}>Next Video ▶</Text>
            </TouchableOpacity>

            {/* Caption Container */}
            <View style={styles.captionContainer}>
                <Text style={styles.caption}>{videos[currentVideoIndex].title}</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f8f8",
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 15,
        color: "#ff3974",
    },
    searchContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
    },
    searchInput: {
        width: "70%",
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        backgroundColor: "#fff",
    },
    searchButton: {
        marginLeft: 10,
        backgroundColor: "#ff3974",
        padding: 10,
        borderRadius: 5,
    },
    searchButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    videoContainer: {
        marginBottom: 10,
        alignItems: "center",
    },
    captionContainer: {
        marginTop: 5,
        backgroundColor: "#ff3974",
        padding: 10,
        borderRadius: 8,
        width: "90%",
        alignItems: "center",
        alignSelf: "center",
    },
    caption: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    nextButton: {
        backgroundColor: "#ff3974",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignSelf: "center",
        marginVertical: 10,
    },
    nextButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default SelfDefenceTut;
