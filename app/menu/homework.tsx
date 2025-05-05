import { Stack } from 'expo-router';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';

interface Assignment {
  id: string;
  type: 'Лаборатори' | 'Бие даалт';
  title: string;
  grade: number;
  maxGrade: number;
  submittedDate: string;
}

interface SubjectGrades {
  subject: string;
  assignments: Assignment[];
}

const gradesData: SubjectGrades[] = [
  {
    subject: 'Өгөгдлийн бүтэц',
    assignments: [
      { id: '1', type: 'Лаборатори', title: 'Бүлэг 1', grade: 90, maxGrade: 100, submittedDate: '2025-04-15' },
      { id: '2', type: 'Бие даалт', title: 'Модуль 1', grade: 85, maxGrade: 100, submittedDate: '2025-04-22' },
      { id: '3', type: 'Лаборатори', title: 'Бүлэг 2', grade: 92, maxGrade: 100, submittedDate: '2025-04-29' },
    ],
  },
  {
    subject: 'Алгоритм',
    assignments: [
      { id: '4', type: 'Лаборатори', title: 'Бүлэг 1', grade: 78, maxGrade: 100, submittedDate: '2025-04-18' },
      { id: '5', type: 'Бие даалт', title: 'Модуль 1', grade: 92, maxGrade: 100, submittedDate: '2025-04-25' },
    ],
  },
  {
    subject: 'Объект хандалтат програмчлал',
    assignments: [
      { id: '6', type: 'Лаборатори', title: 'Бүлэг 1', grade: 88, maxGrade: 100, submittedDate: '2025-04-20' },
      { id: '7', type: 'Бие даалт', title: 'Модуль 1', grade: 95, maxGrade: 100, submittedDate: '2025-04-27' },
      { id: '8', type: 'Лаборатори', title: 'Бүлэг 2', grade: 80, maxGrade: 100, submittedDate: '2025-05-03' },
      { id: '9', type: 'Бие даалт', title: 'Модуль 2', grade: 90, maxGrade: 100, submittedDate: '2025-05-10' },
    ],
  },
  {
    subject: 'Веб хөгжүүлэлт',
    assignments: [
      { id: '10', type: 'Лаборатори', title: 'Бүлэг 1', grade: 65, maxGrade: 100, submittedDate: '2025-04-22' },
      { id: '11', type: 'Бие даалт', title: 'Төсөл 1', grade: 75, maxGrade: 100, submittedDate: '2025-04-29' },
    ],
  },
  {
    subject: 'Мобиль програмчлал',
    assignments: [
      { id: '12', type: 'Лаборатори', title: 'Бүлэг 1', grade: 95, maxGrade: 100, submittedDate: '2025-04-25' },
      { id: '13', type: 'Бие даалт', title: 'Төсөл 1', grade: 88, maxGrade: 100, submittedDate: '2025-05-02' },
      { id: '14', type: 'Лаборатори', title: 'Бүлэг 2', grade: 92, maxGrade: 100, submittedDate: '2025-05-09' },
    ],
  },
];

interface SubjectItemProps {
  item: SubjectGrades;
  onPress: (subjectData: SubjectGrades) => void;
}

const SubjectItem: React.FC<SubjectItemProps> = ({ item, onPress }) => (
  <TouchableOpacity style={styles.subjectItem} onPress={() => onPress(item)}>
    <Text style={styles.subjectTitle}>{item.subject}</Text>
    <View style={styles.gradesOverview}>
      {item.assignments.slice(0, 2).map(assignment => (
        <Text key={assignment.id} style={styles.gradeOverviewText}>
          {assignment.type.substring(0, 3)}: {assignment.grade}
        </Text>
      ))}
      {item.assignments.length > 2 && (
        <Text style={styles.gradeOverviewText}>+{item.assignments.length - 2} дүн</Text>
      )}
    </View>
  </TouchableOpacity>
);

const GradesListScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSubjectData, setSelectedSubjectData] = useState<SubjectGrades | null>(null);

  const handleSubjectPress = (subjectData: SubjectGrades) => {
    setSelectedSubjectData(subjectData);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedSubjectData(null);
  };

  const calculateTotalPercentage = (assignments: Assignment[]): string => {
    if (assignments.length === 0) {
      return '0%';
    }
    const totalGrade = assignments.reduce((sum, assignment) => sum + assignment.grade, 0);
    const totalMaxGrade = assignments.reduce((sum, assignment) => sum + assignment.maxGrade, 0);
    const percentage = totalMaxGrade > 0 ? ((totalGrade / totalMaxGrade) * 100).toFixed(2) : '0.00';
    return `${percentage}%`;
  };

  return (
    <View style={styles.scene}>
      <FlatList
        data={gradesData}
        keyExtractor={(item) => item.subject}
        renderItem={({ item }) => <SubjectItem item={item} onPress={handleSubjectPress} />}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            {selectedSubjectData && (
              <>
                <Text style={modalStyles.modalTitle}>{selectedSubjectData.subject}</Text>
                <Text style={modalStyles.modalSubtitle}>Хураалгасан даалгаврууд:</Text>
                {selectedSubjectData.assignments.map(assignment => (
                  <View key={assignment.id} style={modalStyles.assignmentItem}>
                    <Text>{assignment.title} ({assignment.type})</Text>
                    <Text>Дүн: {assignment.grade}/{assignment.maxGrade}</Text>
                    <Text>Хураалгасан огноо: {assignment.submittedDate}</Text>
                  </View>
                ))}
                <Text style={modalStyles.modalTotal}>Нийт дүн: {calculateTotalPercentage(selectedSubjectData.assignments)}</Text>
              </>
            )}
            <TouchableOpacity style={[modalStyles.button, modalStyles.buttonClose]} onPress={closeModal}>
              <Text style={modalStyles.textStyle}>Хаах</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default function Homework() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        title: "Даалгавар"
      }} />
      <GradesListScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  scene: {
    flex: 1,
    padding: 16,
  },
  subjectItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  subjectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  gradesOverview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gradeOverviewText: {
    fontSize: 14,
    marginRight: 8,
    color: 'gray',
  },
});

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  assignmentItem: {
    marginBottom: 8,
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: '#822321',
  },
  modalTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    textAlign: 'right',
    width: '100%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 20,
  },
  buttonClose: {
    backgroundColor: '#822321',
    alignSelf: 'flex-end',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});