import { Picker } from '@react-native-picker/picker'; // суулгасан байх шаардлагатай
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { attendanceData, gradesData } from './index';

const SubjectDetailsScreen = () => {
  const subjectName = 'Өгөгдлийн бүтэц';
  const subjectAttendance = attendanceData.filter(item => item.subject === subjectName);
  const subjectGrades = gradesData[subjectName];

  const [selectedType, setSelectedType] = useState('Лекц');
  const [totalGrade, setTotalGrade] = useState(0);

  const filteredAttendance = subjectAttendance.filter(item => item.type === selectedType);
  const homeworkAssignments = subjectGrades?.assignments?.filter(item => item.type === 'Бие даалт') || [];
  const otherAssignments = subjectGrades?.assignments?.filter(item => item.type !== 'Бие даалт') || [];
  const exams = subjectGrades?.exams || [];

  useEffect(() => {
    if (subjectGrades && subjectAttendance) {
      calculateTotalGrade();
    }
  }, [subjectGrades, subjectAttendance]);

  const calculateTotalGrade = () => {
    let attendancePercentage = 0;
    const totalLectures = subjectAttendance.filter(item => item.type === 'Лекц').length;
    const attendedLectures = subjectAttendance.filter(item => item.type === 'Лекц' && item.present).length;
    const totalLabs = subjectAttendance.filter(item => item.type === 'Лаб').length;
    const attendedLabs = subjectAttendance.filter(item => item.type === 'Лаб' && item.present).length;

    const totalLessons = totalLectures + totalLabs;
    const attendedLessons = attendedLectures + attendedLabs;
    attendancePercentage = totalLessons > 0 ? (attendedLessons / totalLessons) * 100 : 0;

    let homeworkGrade = 0;
    let homeworkMaxGrade = 0;
    homeworkAssignments.forEach(item => {
      homeworkGrade += item.grade;
      homeworkMaxGrade += item.maxGrade;
    });
    const homeworkPercentage = homeworkMaxGrade > 0 ? (homeworkGrade / homeworkMaxGrade) * 100 : 0;

    let otherAssignmentsGrade = 0;
    let otherAssignmentsMaxGrade = 0;
    otherAssignments.forEach(item => {
      otherAssignmentsGrade += item.grade;
      otherAssignmentsMaxGrade += item.maxGrade;
    });
    const otherAssignmentsPercentage = otherAssignmentsMaxGrade > 0 ? (otherAssignmentsGrade / otherAssignmentsMaxGrade) * 100 : 0;

    let examGrade = 0;
    let examMaxGrade = 0;
    exams.forEach(item => {
      examGrade += item.grade;
      examMaxGrade += item.maxGrade;
    });
    const examPercentage = examMaxGrade > 0 ? (examGrade / examMaxGrade) * 100 : 0;

    const finalGrade =
      (attendancePercentage * 0.10) +
      (examPercentage * 0.30) +
      (homeworkPercentage * 0.30) +
      (otherAssignmentsPercentage * 0.30);

    setTotalGrade(parseFloat(finalGrade.toFixed(2)));
  };

  if (!subjectGrades) {
    return <Text>Мэдээлэл олдсонгүй.</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{
        headerShown: true,
        title: "Дэлгэрэнгүй",
      }} />

      <Text style={styles.title}>{subjectGrades.subject}</Text>

      <View style={styles.totalGradeSection}>
        <Text style={styles.totalGradeText}>Нийт Дүн: {totalGrade}%</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ирц</Text>
        <Picker
          selectedValue={selectedType}
          onValueChange={(itemValue) => setSelectedType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Лекц" value="Лекц" />
          <Picker.Item label="Лаб" value="Лаб" />
        </Picker>

        <Text>Нийт: {filteredAttendance.length}</Text>
        <Text>Ирсэн: {filteredAttendance.filter(item => item.present).length}</Text>

        <FlatList
          style={{ borderWidth: 1, padding: 10, borderRadius: 10 }}
          data={filteredAttendance}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text>{item.type} {item.lessonNumber}</Text>
              <Text style={[styles.attendanceText, { color: item.present ? '#00ce90' : '#fe4f66' }]}>{item.present ? 'Ирсэн' : 'Ирээгүй'}</Text>
            </View>
          )}
          scrollEnabled={false}
        />
      </View>

      {homeworkAssignments.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Бие Даалт</Text>
          <FlatList
            data={homeworkAssignments}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <Text>{item.title}</Text>
                <Text>Оноо: {item.grade}/{item.maxGrade}</Text>
              </View>
            )}
            scrollEnabled={false}
          />
        </View>
      )}

      {otherAssignments.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Даалгавар</Text>
          <FlatList
            data={otherAssignments}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <Text>{item.title} ({item.type})</Text>
                <Text>Оноо: {item.grade}/{item.maxGrade}</Text>
              </View>
            )}
            scrollEnabled={false}
          />
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Шалгалт</Text>
        <FlatList
          data={exams}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text>{item.name}</Text>
              <Text>Оноо: {item.grade}/{item.maxGrade}</Text>
            </View>
          )}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    paddingBottom: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  picker: {
    backgroundColor: '#eee',
    marginBottom: 10,
  },
  attendanceText: {
    color: '#000',
    fontWeight: '500',
  },
  totalGradeSection: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  totalGradeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#822321',
  },
});

export default SubjectDetailsScreen;