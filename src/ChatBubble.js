import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "react-native-vector-icons";

// Importa tus imágenes
import UserIcon from 'C:/Users/javie/OneDrive/Documentos/geminiApp/assets/icon.png'; // Asegúrate de usar la ruta correcta desde el archivo actual
import AiIcon from 'C:/Users/javie/OneDrive/Documentos/geminiApp/assets/ai-icon.png';

const ChatBubble = ({ role, text, onSpeech }) => {
    return (
        <Animatable.View
            animation="fadeInUp"
            duration={500}
            style={[
                styles.chatItemContainer,
                role === "user" ? styles.userChatItemContainer : styles.modelChatItemContainer,
            ]}
        >
            {/* Icono de usuario o IA */}
            <Image source={role === "user" ? UserIcon : AiIcon} style={styles.icon} />
            <View style={[styles.chatItem, role === "user" ? styles.userChatItem : styles.modelChatItem]}>
                {/* Texto del mensaje */}
                <Text style={styles.chatText}>{text}</Text>
                {role === "model" && (
                    <TouchableOpacity onPress={onSpeech} style={styles.speakerIcon}>
                        <Ionicons name="volume-high-outline" size={20} color="#007AFF" />
                    </TouchableOpacity>
                )}
            </View>
        </Animatable.View>
    );
};

const styles = StyleSheet.create({
    chatItemContainer: {
        flexDirection: "row",
        alignItems: "flex-end",
        marginVertical: 5,
        paddingHorizontal: 10,
    },
    userChatItemContainer: {
        alignSelf: "flex-end",
        flexDirection: "row-reverse", // Icono a la derecha
    },
    modelChatItemContainer: {
        alignSelf: "flex-start",
    },
    icon: {
        width: 40,
        height: 40,
        borderRadius: 20, // Hace que los íconos sean redondos
        marginHorizontal: 5,
    },
    chatItem: {
        padding: 10,
        borderRadius: 10,
        maxWidth: "75%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3, // Sombra en Android
    },
    userChatItem: {
        backgroundColor: "#007AFF", // Azul para usuario
    },
    modelChatItem: {
        backgroundColor: "#EAEAEA", // Gris claro para modelo
    },
    chatText: {
        fontSize: 16,
        color: "#000",
        fontFamily: "Roboto-Bold", // Usa la fuente personalizada, asegúrate de cargarla
    },
    speakerIcon: {
        position: "absolute",
        bottom: 5,
        right: 5,
        backgroundColor: "#fff",
        padding: 5,
        borderRadius: 50,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3, // Sombra en Android
    },
});

export default ChatBubble; 