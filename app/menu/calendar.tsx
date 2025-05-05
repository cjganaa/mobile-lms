import { Stack } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['mn'] = {
  monthNames: [
    'Нэгдүгээр сар',
    'Хоёрдугаар сар',
    'Гуравдугаар сар',
    'Дөрөвдүгээр сар',
    'Тавдугаар сар',
    'Зургадугаар сар',
    'Долдугаар сар',
    'Наймдугаар сар',
    'Есдүгээр сар',
    'Аравдугаар сар',
    'Арван нэгдүгээр сар',
    'Арван хоёрдугаар сар',
  ],
  monthNamesShort: ['1-р сар', '2-р сар', '3-р сар', '4-р сар', '5-р сар', '6-р сар', '7-р сар', '8-р сар', '9-р сар', '10-р сар', '11-р сар', '12-р сар'],
  dayNames: ['Ням', 'Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба'],
  dayNamesShort: ['Ням', 'Дав', 'Мяг', 'Лха', 'Пүр', 'Баа', 'Бям'],
  today: 'Өнөөдөр',
};
LocaleConfig.defaultLocale = 'mn';

interface MarkedDates {
  [key: string]: { selected: boolean; marked?: boolean; selectedColor?: string; dotColor?: string };
}

interface Activity {
  date: string;
  title: string;
  description: string;
}

const activities: Activity[] = [
  { date: '2025-04-28', title: 'Лабораторийн ажил #1 хураалгах', description: 'Өгөгдлийн бүтэц хичээлийн 1-р лабораторийн ажлыг 17:00 цагт багтаан хураалгана.' },
  { date: '2025-04-28', title: 'Уулзалт багштай', description: 'Математик хичээлийн багштай курсын ажлын талаар уулзалт 14:00 цагт.' },
  { date: '2025-05-01', title: 'Баярын өдөр', description: 'Олон улсын хөдөлмөрчдийн өдөр.' },
  { date: '2025-05-05', title: 'Бие даалт #1 эхлэх', description: 'Алгоритм хичээлийн эхний бие даалт эхэлнэ. Хураалгах хугацаа: 2025-05-19.' },
  { date: '2025-05-05', title: 'Номын сангийн цаг', description: 'Сурах бичиг буцаах эцсийн хугацаа.' },
  { date: '2025-05-10', title: 'Эрдэм шинжилгээний бага хурал', description: 'Залуу судлаачдын ээлжит эрдэм шинжилгээний бага хурал.' },
  { date: '2025-05-15', title: 'Шалгалт #1', description: 'Объект хандалтат програмчлал хичээлийн эцсийн шалгалт 10:00 цагт болно.' },
  { date: '2025-05-15', title: 'Сагсан бөмбөгийн тэмцээн', description: 'Сургуулийн сагсан бөмбөгийн аварга шалгаруулах тэмцээн спортын зааланд болно.' },
  { date: '2025-05-18', title: 'Бие даалт #2 эхлэх', description: 'Веб хөгжүүлэлт хичээлийн 2-р бие даалт эхэлнэ.' },
  { date: '2025-05-19', title: 'Бие даалт #1 хураалгах', description: 'Алгоритм хичээлийн 1-р бие даалтыг хураалгах эцсийн хугацаа.' },
  { date: '2025-05-22', title: 'Лабораторийн ажил #2 хураалгах', description: 'Өгөгдлийн бүтэц хичээлийн 2-р лабораторийн ажлыг хураалгана.' },
  { date: '2025-05-25', title: 'Сургуулийн төгсөлтийн баяр', description: '2025 оны төгсөлтийн баяр.' },
  { date: '2025-05-28', title: 'Семинар', description: 'Мобиль програмчлалын сэдвээр семинар болно.' },
  { date: '2025-05-30', title: 'Шалгалт #2', description: 'Компьютерийн сүлжээ хичээлийн шалгалт.' },
];

export default function CalendarScreen() {
  const [selected, setSelected] = useState('');
  const [markedDates, setMarkedDates] = useState<MarkedDates>(() => {
    const initialMarked: MarkedDates = {};
    activities.forEach(activity => {
      initialMarked[activity.date] = { selected: false, marked: true, dotColor: '#822321' };
    });
    return initialMarked;
  });
  const [selectedActivities, setSelectedActivities] = useState<Activity[]>([]);

  const onDayPress = (day: { dateString: string }) => {
    setSelected(day.dateString);
    const newMarkedDates: MarkedDates = {
      ...markedDates,
      [day.dateString]: {
        ...markedDates[day.dateString],
        selected: true,
        selectedColor: '#822321',
      },
    };
    // Deselect previous selected day
    if (selected && selected !== day.dateString && markedDates[selected]) {
      newMarkedDates[selected] = { ...markedDates[selected], selected: false };
    }
    setMarkedDates(newMarkedDates);
    setSelectedActivities(activities.filter(activity => activity.date === day.dateString));
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        title: "Календарь"
      }} />
      <Calendar
        onDayPress={onDayPress}
        style={styles.calendar}
        markedDates={markedDates}
        theme={{
          selectedDayBackgroundColor: '#822321',
          todayTextColor: '#4CAF50',
          arrowColor: '#822321',
          dotColor: '#822321',
        }}
      />
      <View style={styles.activitiesContainer}>
        <Text style={styles.activitiesTitle}>
          {selected ? `${selected} - Үйл ажиллагаа` : 'Өдөр сонгоно уу'}
        </Text>
        <ScrollView>
          {selectedActivities.length > 0 ? (
            selectedActivities.map((activity, index) => (
              <View key={index} style={styles.activityItem}>
                <Text style={styles.activityTitleItem}>{activity.title}</Text>
                <Text style={styles.activityDescription}>{activity.description}</Text>
              </View>
            ))
          ) : selected ? (
            <Text style={styles.noActivity}>Сонгогдсон өдөрт үйл ажиллагаа байхгүй.</Text>
          ) : (
            <Text style={styles.instructionText}>Үйл ажиллагааг харахын тулд өдөр сонгоно уу.</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  calendar: {
    marginBottom: 20,
  },
  activitiesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  activitiesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  activityItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#822321',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  activityTitleItem: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  activityDescription: {
    fontSize: 14,
    color: '#555',
  },
  noActivity: {
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },
  instructionText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },
});