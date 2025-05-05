import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // суулгасан байх шаардлагатай
import { attendanceData, gradesData } from './index';
import { Stack } from 'expo-router';

const SubjectDetailsScreen = () => {
  const subjectName = 'Өгөгдлийн бүтэц';
  const subjectAttendance = attendanceData.filter(item => item.subject === subjectName);
  const subjectGrades = gradesData[subjectName];

  const [selectedType, setSelectedType] = useState('Лекц');

  const filteredAttendance = subjectAttendance.filter(item => item.type === selectedType);

  if (!subjectGrades) {
    return <Text>Мэдээлэл олдсонгүй.</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        headerShown: true,
        title: "Дэлгэрэнгүй",
      }} />

      <Text style={styles.title}>{subjectGrades.subject}</Text>

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
            style={{borderWidth:1, padding:10, borderRadius:10,}}
          data={filteredAttendance}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text>{item.type} {item.lessonNumber}</Text>
              <Text style={[styles.attendanceText,{color:item.present ? '#00ce90' : '#fe4f66'}]}>{item.present ? 'Ирсэн' : 'Ирээгүй'}</Text>
            </View>
          )}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Даалгавар</Text>
        <FlatList
          data={subjectGrades.assignments}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text>{item.title} ({item.type})</Text>
              <Text>Оноо: {item.grade}/{item.maxGrade}</Text>
            </View>
          )}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Шалгалт</Text>
        <FlatList
          data={subjectGrades.exams}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text>{item.name}</Text>
              <Text>Оноо: {item.grade}/{item.maxGrade}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
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
  }
});

export default SubjectDetailsScreen;
