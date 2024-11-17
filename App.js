import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, Modal, Text, FlatList, Image, TextInput } from 'react-native';
import ChatBot from './src/Chatbot'; // Asegúrate de tener este componente creado
import { Ionicons } from 'react-native-vector-icons';
import { useFonts } from 'expo-font';
import Animated, { FadeIn, FadeOut, SlideInLeft, SlideOutRight } from 'react-native-reanimated'; // Importa la animación

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isPatientInfoVisible, setIsPatientInfoVisible] = useState(false);
  const [isTreatmentsVisible, setIsTreatmentsVisible] = useState(false);
  const [isConsultorioInfoVisible, setIsConsultorioInfoVisible] = useState(false);
  const [isCitaModalVisible, setIsCitaModalVisible] = useState(false);

  const toggleChat = () => setIsChatOpen(!isChatOpen);
  const togglePatientInfo = () => setIsPatientInfoVisible(!isPatientInfoVisible);
  const toggleTreatments = () => setIsTreatmentsVisible(!isTreatmentsVisible);
  const toggleConsultorioInfo = () => setIsConsultorioInfoVisible(!isConsultorioInfoVisible);
  const toggleCitaModal = () => setIsCitaModalVisible(!isCitaModalVisible);

  // Datos del paciente
  const paciente = {
    nombre: 'Javier',
    apellidos: 'Fco',
    fechaDeNacimiento: '15/03/1985',
    genero: 'Masculino',
    telefono: '555-123-4567',
    direccion: 'Calle Falsa 123',
    email: 'juan.perez@example.com',
  };

  // Información del consultorio
  const consultorioInfo = {
    direccion: 'Calle Morelos #175, casi esquina con Galanea, Colonia Centro, Villahermosa, Tabasco',
    telefono: '9931778283',
    email: 'contacto@dentart.com',
    horario: 'Lunes a Viernes 9:00 AM - 6:00 PM, Sábados 8:00 AM - 2:00 PM'
  };

  // Lista de tratamientos con imágenes
  const tratamientos = [
    { 
      id: '1', 
      nombre: 'Limpieza Dental', 
      descripcion: 'Eliminación de sarro y placa bacteriana.', 
      precio: '$500',
      imagen: require('./assets/limpiar.jpg') 
    },
    { 
      id: '2', 
      nombre: 'Ortodoncia', 
      descripcion: 'Colocación de brackets para alineación dental.', 
      precio: '$5,000',
      imagen: require('./assets/ortodoncia.jpg') 
    },
    { 
      id: '3', 
      nombre: 'Blanqueamiento', 
      descripcion: 'Tratamiento para blanquear los dientes.', 
      precio: '$3,000',
      imagen: require('./assets/blanqueamiento (2).jpg') 
    },
    { 
      id: '4', 
      nombre: 'Implantes Dentales', 
      descripcion: 'Colocación de implantes para dientes perdidos.', 
      precio: '$10,000',
      imagen: require('./assets/implantes.jpg') 
    },
    { 
      id: '5', 
      nombre: 'Extracción', 
      descripcion: 'Extracción de dientes dañados o no funcionales.', 
      precio: '$1,500',
      imagen: require('./assets/extraccion.jpg') 
    },
  ];
  

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {/* Botón circular con logo de usuario */}
      <TouchableOpacity style={styles.userButton} onPress={togglePatientInfo}>
        <Ionicons name="person-circle" size={50} color="#007AFF" />
      </TouchableOpacity>

      {/* Apartado de bienvenida */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>¡Hola, {paciente.nombre}!</Text>
        <Text style={styles.welcomeSubtitle}>¿Cómo puedo ayudarte hoy?</Text>
      </View>

      {/* Opciones rápidas */}
      <View style={styles.quickOptions}>
  {/* Fila superior */}
  <View style={styles.row}>
    <TouchableOpacity style={styles.quickOptionButton} onPress={togglePatientInfo}>
      <Text style={styles.quickOptionText}>Ver Información</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.quickOptionButton} onPress={toggleConsultorioInfo}>
      <Text style={styles.quickOptionText}>Ver Datos del Consultorio</Text>
    </TouchableOpacity>
  </View>

  {/* Fila inferior */}
  <View style={styles.row}>
    <TouchableOpacity style={styles.quickOptionButton} onPress={toggleTreatments}>
      <Text style={styles.quickOptionText}>Ver Tratamientos</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.quickOptionButton} onPress={toggleCitaModal}>
      <Text style={styles.quickOptionText}>Agendar Cita</Text>
    </TouchableOpacity>
  </View>
</View>


      {/* Apartado de tratamientos con animación */}
      {isTreatmentsVisible && (
  <View style={styles.treatmentsContainer}>
    <Text style={styles.treatmentsTitle}>Tratamientos Disponibles</Text>
    <FlatList
      data={tratamientos}
      renderItem={({ item }) => (
        <View style={styles.treatmentItem}>
          <Image source={item.imagen} style={styles.treatmentImage} />
          <Text style={styles.treatmentName}>{item.nombre}</Text>
          <Text style={styles.treatmentDescription}>{item.descripcion}</Text>
          <Text style={styles.treatmentPrice}>{item.precio}</Text>
        </View>
      )}
      keyExtractor={(item) => item.id}
    />
  </View>
)}


      {/* Burbuja flotante del chat */}
      {!isChatOpen && (
        <TouchableOpacity style={styles.bubble} onPress={toggleChat}>
          <Ionicons name="chatbubbles-outline" size={30} color="#fff" />
        </TouchableOpacity>
      )}

      {/* Modal para información del paciente */}
      <Modal animationType="slide" transparent={true} visible={isPatientInfoVisible} onRequestClose={togglePatientInfo}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Información del Paciente</Text>
            <Text style={styles.patientInfoText}>Nombre: {paciente.nombre} {paciente.apellidos}</Text>
            <Text style={styles.patientInfoText}>Fecha de Nacimiento: {paciente.fechaDeNacimiento}</Text>
            <Text style={styles.patientInfoText}>Género: {paciente.genero}</Text>
            <Text style={styles.patientInfoText}>Teléfono: {paciente.telefono}</Text>
            <Text style={styles.patientInfoText}>Dirección: {paciente.direccion}</Text>
            <Text style={styles.patientInfoText}>Email: {paciente.email}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={togglePatientInfo}>
              <Ionicons name="close" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal para información del consultorio */}
      <Modal animationType="slide" transparent={true} visible={isConsultorioInfoVisible} onRequestClose={toggleConsultorioInfo}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Datos del Consultorio</Text>
            <Text style={styles.patientInfoText}>Dirección: {consultorioInfo.direccion}</Text>
            <Text style={styles.patientInfoText}>Teléfono: {consultorioInfo.telefono}</Text>
            <Text style={styles.patientInfoText}>Email: {consultorioInfo.email}</Text>
            <Text style={styles.patientInfoText}>Horario: {consultorioInfo.horario}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={toggleConsultorioInfo}>
              <Ionicons name="close" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal para el ChatBot */}
      <Modal animationType="slide" transparent={true} visible={isChatOpen} onRequestClose={toggleChat}>
        <View style={styles.modalOverlay}>
          <View style={styles.chatModalContainer}>
            <ChatBot />
            <TouchableOpacity style={styles.closeButton} onPress={toggleChat}>
              <Ionicons name="close" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal para Agendar Cita */}
      <Modal animationType="slide" transparent={true} visible={isCitaModalVisible} onRequestClose={toggleCitaModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Agendar Cita</Text>
            <TextInput placeholder="Fecha de Cita" style={styles.inputField} />
            <TextInput placeholder="Tratamiento" style={styles.inputField} />
            <TextInput placeholder="Detalles Adicionales" style={styles.inputField} />
            <TouchableOpacity style={styles.submitButton} onPress={() => alert('Cita Agendada')}>
              <Text style={styles.submitButtonText}>Confirmar Cita</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={toggleCitaModal}>
              <Ionicons name="close" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  userButton: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#888',
  },
  quickOptions: {
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20, // Espacio entre las filas
  },
  quickOptionButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1, // Hace que cada botón ocupe el mismo espacio
    marginHorizontal: 10, // Espacio entre los botones
  },
  quickOptionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  treatmentsContainer: {
    marginTop: 20,
  },
  treatmentsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 10,
  },
  treatmentItem: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
  },
  treatmentImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  treatmentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  treatmentDescription: {
    fontSize: 14,
    color: '#666',
  },
  treatmentPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginTop: 5,
  },
  bubble: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007AFF',
    borderRadius: 30,
    padding: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  chatModalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    height: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    backgroundColor: '#ff0000',
    borderRadius: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  patientInfoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputField: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
})