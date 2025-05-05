import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Attendance } from '../index';

interface Props {
  modalVisible: boolean;
  selectedSubject: string | null;
  attendanceData: Attendance[];
  closeModal: () => void;
}

interface AttendanceItemProps {
  item: Attendance;
}

const AttendanceItem: React.FC<AttendanceItemProps> = ({ item }) => (
  <View style={styles.attendanceItem}>
    <Text>
      {item.type} {item.lessonNumber}:
    </Text>
    <Text style={{ color: item.present ? '#00ce90' : '#fe4f66' }}>
      {item.present ? 'Ирсэн' : 'Ирээгүй'}
    </Text>
  </View>
);

export function AttendanceModal({ modalVisible, selectedSubject, attendanceData, closeModal }: Props) {
  const subjectAttendances = attendanceData.filter(att => att.subject === selectedSubject);
  const lectureAttendances = subjectAttendances.filter(att => att.type === 'Лекц');
  const labAttendances = subjectAttendances.filter(att => att.type === 'Лаб');

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{selectedSubject}</Text>
          <Text style={styles.sectionTitle}>Лекц</Text>
          <FlatList
            data={lectureAttendances}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={{ borderBottomWidth: 1 }}>
                <AttendanceItem item={item} />
              </View>
            )}
          />
          <Text style={styles.sectionTitle}>Лаборатори</Text>
          <FlatList
            data={labAttendances}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={{ borderBottomWidth: 1 }}>
                <AttendanceItem item={item} />
              </View>
            )}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={closeModal}
            >
              <Text style={styles.textStyle}>Хаах</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "flex-start",  
    shadowColor: "#000",
    gap: 5,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    width: "100%"
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  attendanceItem: {
    flexDirection: 'row',
    width: "100%",
    justifyContent: 'space-between',
    marginBottom: 3,
    borderBottomWidth: 0,
  },
  buttonContainer: {
    display:'flex',
    width:'100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 15,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#822321",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  }
});