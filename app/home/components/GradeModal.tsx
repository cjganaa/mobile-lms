import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { SubjectGrades } from '../index';

interface AssignmentItemProps {
  item: SubjectGrades['assignments'][0];
}

const AssignmentItem: React.FC<AssignmentItemProps> = ({ item }) => (
  <View style={modalStyles.assignmentItem}>
    <Text>{item.title} ({item.type})</Text>
    <Text>Дүн: {item.grade}/{item.maxGrade}</Text>
  </View>
);

interface ExamItemProps {
  item: SubjectGrades['exams'][0];
}

const ExamItem: React.FC<ExamItemProps> = ({ item }) => (
  <View style={modalStyles.examItem}>
    <Text>{item.name}</Text>
    <Text>Дүн: {item.grade}/{item.maxGrade}</Text>
  </View>
);

interface Props {
  modalVisible: boolean;
  selectedSubjectData: SubjectGrades | null;
  closeModal: () => void;
}

export function GradeModal({ modalVisible, selectedSubjectData, closeModal }: Props) {
  const calculateFinalGrade = (subjectData: SubjectGrades | null): string => {
    if (!subjectData) {
      return '0%';
    }

    let assignmentWeight = 0.3;
    let labWeight = 0.3;
    let examWeight = 0.3;
    const attendanceWeight = 0.1;

    let totalAssignmentScore = 0;
    let totalLabScore = 0;
    let totalExamScore = 0;

    const assignmentGrades = subjectData.assignments.filter(a => a.type === 'Бие даалт').map(a => a.grade / a.maxGrade);
    const labGrades = subjectData.assignments.filter(a => a.type === 'Лаборатори').map(a => a.grade / a.maxGrade);
    const examGrades = subjectData.exams.map(e => e.grade / e.maxGrade);

    if (assignmentGrades.length > 0) {
      totalAssignmentScore = assignmentGrades.reduce((sum, grade) => sum + grade, 0) / assignmentGrades.length;
    }
    if (labGrades.length > 0) {
      totalLabScore = labGrades.reduce((sum, grade) => sum + grade, 0) / labGrades.length;
    }
    if (examGrades.length > 0) {
      totalExamScore = examGrades.reduce((sum, grade) => sum + grade, 0) / examGrades.length;
    }

    const attendanceScore = subjectData.attendancePercentage / 100;
    const finalScore = (attendanceScore * attendanceWeight) + (totalAssignmentScore * assignmentWeight) + (totalLabScore * labWeight) + (totalExamScore * examWeight);

    return (finalScore * 100).toFixed(2) + '%';
  };

  return (
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
              <Text style={modalStyles.attendance}>Ирц: {selectedSubjectData.attendancePercentage}%</Text>
              <Text style={modalStyles.finalGrade}>Нийт дүн: {calculateFinalGrade(selectedSubjectData)}</Text>
              <Text style={modalStyles.subtitle}>Шалгалтууд:</Text>
              <FlatList
                data={selectedSubjectData.exams}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ExamItem item={item} />}
              />
              <Text style={modalStyles.subtitle}>Лабораторийн болон Бие Даалтын Дүн:</Text>
              <FlatList
                data={selectedSubjectData.assignments}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <AssignmentItem item={item} />}
              />
            </>
          )}
          <TouchableOpacity style={[modalStyles.button, modalStyles.buttonClose]} onPress={closeModal}>
            <Text style={modalStyles.textStyle}>Хаах</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

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
    marginBottom: 10,
  },
  attendance: {
    fontSize: 16,
    marginBottom: 10,
    color: '#822321',
    fontWeight: 'bold',
  },
  finalGrade: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'green',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  assignmentItem: {
    marginBottom: 8,
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: '#822321',
  },
  examItem: {
    marginBottom: 8,
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: 'blue',
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