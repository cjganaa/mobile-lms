import { Stack } from 'expo-router';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import React from 'react';

interface ExamResult {
  subject: string;
  examName: string;
  grade: number;
  maxGrade: number;
  examDate: string;
}

const examResultsData: ExamResult[] = [
  {
    subject: 'Өгөгдлийн бүтэц',
    examName: '1-р улирлын шалгалт',
    grade: 88,
    maxGrade: 100,
    examDate: '2025-03-15',
  },
  {
    subject: 'Алгоритм',
    examName: 'Эцсийн шалгалт',
    grade: 92,
    maxGrade: 100,
    examDate: '2025-04-20',
  },
  {
    subject: 'Объект хандалтат програмчлал',
    examName: 'Явцын шалгалт',
    grade: 78,
    maxGrade: 100,
    examDate: '2025-03-25',
  },
  {
    subject: 'Веб хөгжүүлэлт',
    examName: 'Төслийн хамгаалалт',
    grade: 95,
    maxGrade: 100,
    examDate: '2025-04-10',
  },
  {
    subject: 'Мобиль програмчлал',
    examName: '1-р сэдвийн шалгалт',
    grade: 85,
    maxGrade: 100,
    examDate: '2025-03-05',
  },
  {
    subject: 'Компьютерийн сүлжээ',
    examName: 'Лабораторийн шалгалт',
    grade: 90,
    maxGrade: 100,
    examDate: '2025-04-15',
  },
];

interface ExamResultItemProps {
  item: ExamResult;
}

const ExamResultItem: React.FC<ExamResultItemProps> = ({ item }) => (
  <View style={styles.examItem}>
    <Text style={styles.subjectTitle}>{item.subject}</Text>
    <View style={styles.details}>
      <Text>Шалгалтын нэр: {item.examName}</Text>
      <Text>Дүн: {item.grade}/{item.maxGrade} ({((item.grade / item.maxGrade) * 100).toFixed(2)}%)</Text>
      <Text>Огноо: {item.examDate}</Text>
    </View>
  </View>
);

export default function ExamResultsScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        title: "Шалгалтын дүн"
      }} />
      <FlatList
        data={examResultsData}
        keyExtractor={(item) => `${item.subject}-${item.examName}`}
        renderItem={({ item }) => <ExamResultItem item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  examItem: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderLeftWidth: 5,
    borderLeftColor: '#822321',
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
    color: '#333',
  },
  details: {
    marginLeft: 10,
  },
});