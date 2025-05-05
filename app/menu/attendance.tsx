import { Stack } from 'expo-router';
import { View, Text, StyleSheet, useWindowDimensions, FlatList, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import React, { useState } from 'react';

interface AttendanceData {
  subject: string;
  present: number;
  leave: number;
  absent: number;
  teacher: string;
  detailedAttendance?: {
    presentDates?: string[];
    absentDates?: string[];
    leaveDates?: string[];
  };
}

const lectureAttendanceData: AttendanceData[] = [
  { subject: 'Өгөгдлийн бүтэц', present: 80, leave: 10, absent: 10, teacher: 'Бат', detailedAttendance: { presentDates: ['2024-05-01', '2024-05-08'], absentDates: ['2024-05-15'], leaveDates: ['2024-05-22'] } },
  { subject: 'Алгоритм', present: 70, leave: 20, absent: 10, teacher: 'Оюун', detailedAttendance: { presentDates: ['2024-05-02'], absentDates: ['2024-05-09', '2024-05-16'], leaveDates: ['2024-05-23', '2024-05-30'] } },
  { subject: 'Объект хандалтат програмчлал', present: 90, leave: 5, absent: 5, teacher: 'Дорж', detailedAttendance: { presentDates: ['2024-05-03', '2024-05-10', '2024-05-17'], absentDates: ['2024-05-24'], leaveDates: ['2024-05-31'] } },
  { subject: 'Веб хөгжүүлэлт', present: 60, leave: 30, absent: 10, teacher: 'Сараа', detailedAttendance: { presentDates: ['2024-05-04', '2024-05-11'], absentDates: ['2024-05-18', '2024-05-25'], leaveDates: ['2024-06-01', '2024-06-08', '2024-06-15'] } },
  { subject: 'Мобиль програмчлал', present: 95, leave: 5, absent: 0, teacher: 'Эрдэнэ', detailedAttendance: { presentDates: ['2024-05-05', '2024-05-12', '2024-05-19', '2024-05-26'], absentDates: [], leaveDates: ['2024-06-02'] } },
];

const labAttendanceData: AttendanceData[] = [
  { subject: 'Өгөгдлийн бүтэц Лаб', present: 85, leave: 10, absent: 5, teacher: 'Нараа', detailedAttendance: { presentDates: ['2024-05-06', '2024-05-13'], absentDates: ['2024-05-20'], leaveDates: ['2024-06-03'] } },
  { subject: 'Алгоритм Лаб', present: 65, leave: 25, absent: 10, teacher: 'Ганбаатар', detailedAttendance: { presentDates: ['2024-05-07'], absentDates: ['2024-05-14', '2024-05-21'], leaveDates: ['2024-06-04', '2024-06-11', '2024-06-18'] } },
  { subject: 'Объект хандалтат програмчлал Лаб', present: 92, leave: 3, absent: 5, teacher: 'Цэцэг', detailedAttendance: { presentDates: ['2024-05-08', '2024-05-15', '2024-05-22'], absentDates: ['2024-05-29'], leaveDates: ['2024-06-05'] } },
  { subject: 'Веб хөгжүүлэлт Лаб', present: 55, leave: 35, absent: 10, teacher: 'Мөнх', detailedAttendance: { presentDates: ['2024-05-09', '2024-05-16'], absentDates: ['2024-05-23', '2024-05-30'], leaveDates: ['2024-06-06', '2024-06-13', '2024-06-20'] } },
  { subject: 'Мобиль програмчлал Лаб', present: 98, leave: 2, absent: 0, teacher: 'Уянга', detailedAttendance: { presentDates: ['2024-05-10', '2024-05-17', '2024-05-24', '2024-05-31'], absentDates: [], leaveDates: ['2024-06-07'] } },
];

interface AttendanceItemProps {
  item: AttendanceData;
  onPress: (item: AttendanceData) => void;
}

const AttendanceItem: React.FC<AttendanceItemProps> = ({ item, onPress }) => (
  <TouchableOpacity style={styles.homeworkTextContainer} onPress={() => onPress(item)}>
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 280 }}>
      <Text style={[styles.homeworkText]}>{item.subject}</Text>
      <Text>{item.teacher}</Text>
    </View>
    <View style={{ flex: 1, flexDirection: 'row', gap: 10, alignItems: 'center', width: 280 }}>
      <Text>Ирц</Text>
      <View style={{ width: 200, height: 10, backgroundColor: "#ddd", borderRadius: 5, flex: 1, flexDirection: "row", overflow: 'hidden' }}>
        <View style={{ width: `${item.present}%`, height: "100%", backgroundColor: "#00ce90" }} />
        <View style={{ width: `${item.leave}%`, height: "100%", backgroundColor: "#d4f5ff" }} />
        <View style={{ width: `${item.absent}%`, height: "100%", backgroundColor: "#fe4f66" }} />
      </View>
    </View>
  </TouchableOpacity>
);

const ColorExplanation = () => (
  <View style={styles.colorExplanationContainer}>
    <View style={styles.colorItem}>
      <View style={[styles.colorBox, { backgroundColor: '#00ce90' }]} />
      <Text style={styles.colorText}>Ирсэн</Text>
    </View>
    <View style={styles.colorItem}>
      <View style={[styles.colorBox, { backgroundColor: '#d4f5ff' }]} />
      <Text style={styles.colorText}>Чөлөөтэй</Text>
    </View>
    <View style={styles.colorItem}>
      <View style={[styles.colorBox, { backgroundColor: '#fe4f66' }]} />
      <Text style={styles.colorText}>Тасалсан</Text>
    </View>
  </View>
);

const LectureScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSubjectData, setSelectedSubjectData] = useState<AttendanceData | null>(null);

  const handleItemPress = (item: AttendanceData) => {
    setSelectedSubjectData(item);
    setModalVisible(true);
  };

  return (
    <ScrollView style={[styles.scene, { backgroundColor: 'white' }]}>
      <Text style={styles.headerText}>Лекцийн ирц</Text>
      <ColorExplanation />
      {lectureAttendanceData.map((item, index) => (
        <AttendanceItem key={index} item={item} onPress={handleItemPress} />
      ))}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{selectedSubjectData?.subject}</Text>
            <Text>Багш: {selectedSubjectData?.teacher}</Text>
            <Text>Ирсэн: {selectedSubjectData?.present}%</Text>
            <Text>Чөлөөтэй: {selectedSubjectData?.leave}%</Text>
            <Text>Тасалсан: {selectedSubjectData?.absent}%</Text>
            {selectedSubjectData?.detailedAttendance?.presentDates && selectedSubjectData.detailedAttendance.presentDates.length > 0 && (
              <View>
                <Text style={styles.modalSubtitle}>Ирсэн өдрүүд:</Text>
                {selectedSubjectData.detailedAttendance.presentDates.map((date, index) => (
                  <Text key={index}>{date}</Text>
                ))}
              </View>
            )}
            {selectedSubjectData?.detailedAttendance?.absentDates && selectedSubjectData.detailedAttendance.absentDates.length > 0 && (
              <View>
                <Text style={styles.modalSubtitle}>Тасалсан өдрүүд:</Text>
                {selectedSubjectData.detailedAttendance.absentDates.map((date, index) => (
                  <Text key={index}>{date}</Text>
                ))}
              </View>
            )}
            {selectedSubjectData?.detailedAttendance?.leaveDates && selectedSubjectData.detailedAttendance.leaveDates.length > 0 && (
              <View>
                <Text style={styles.modalSubtitle}>Чөлөөтэй өдрүүд:</Text>
                {selectedSubjectData.detailedAttendance.leaveDates.map((date, index) => (
                  <Text key={index}>{date}</Text>
                ))}
              </View>
            )}
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Хаах</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const LabScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSubjectData, setSelectedSubjectData] = useState<AttendanceData | null>(null);

  const handleItemPress = (item: AttendanceData) => {
    setSelectedSubjectData(item);
    setModalVisible(true);
  };

  return (
    <ScrollView style={[styles.scene, { backgroundColor: 'white' }]}>
      <Text style={styles.headerText}>Лабораторийн ирц</Text>
      <ColorExplanation />
      {labAttendanceData.map((item, index) => (
        <AttendanceItem key={index} item={item} onPress={handleItemPress} />
      ))}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{selectedSubjectData?.subject}</Text>
            <Text>Багш: {selectedSubjectData?.teacher}</Text>
            <Text>Ирсэн: {selectedSubjectData?.present}%</Text>
            <Text>Чөлөөтэй: {selectedSubjectData?.leave}%</Text>
            <Text>Тасалсан: {selectedSubjectData?.absent}%</Text>
            {selectedSubjectData?.detailedAttendance?.presentDates && selectedSubjectData.detailedAttendance.presentDates.length > 0 && (
              <View>
                <Text style={styles.modalSubtitle}>Ирсэн өдрүүд:</Text>
                {selectedSubjectData.detailedAttendance.presentDates.map((date, index) => (
                  <Text key={index}>{date}</Text>
                ))}
              </View>
            )}
            {selectedSubjectData?.detailedAttendance?.absentDates && selectedSubjectData.detailedAttendance.absentDates.length > 0 && (
              <View>
                <Text style={styles.modalSubtitle}>Тасалсан өдрүүд:</Text>
                {selectedSubjectData.detailedAttendance.absentDates.map((date, index) => (
                  <Text key={index}>{date}</Text>
                ))}
              </View>
            )}
            {selectedSubjectData?.detailedAttendance?.leaveDates && selectedSubjectData.detailedAttendance.leaveDates.length > 0 && (
              <View>
                <Text style={styles.modalSubtitle}>Чөлөөтэй өдрүүд:</Text>
                {selectedSubjectData.detailedAttendance.leaveDates.map((date, index) => (
                  <Text key={index}>{date}</Text>
                ))}
              </View>
            )}
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Хаах</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

interface Route {
  key: string;
  title: string;
}

interface State {
  index: number;
  routes: Route[];
}

const renderScene = SceneMap({
  lecture: LectureScreen,
  lab: LabScreen,
});

const Homework: React.FC = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState<number>(0);
  const [routes] = React.useState<Route[]>([
    { key: 'lecture', title: 'Лекц' },
    { key: 'lab', title: 'Лаборатор' },
  ]);

  return (
    <View style={[styles.container, { backgroundColor: 'white' }]}>
      <Stack.Screen options={{
        title: "Ирц"
      }} />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'white' }}
            style={{ backgroundColor: '#822321' }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scene: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  homeworkTextContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems:'flex-start',
    gap:5
  },
  homeworkText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  colorExplanationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  colorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  colorBox: {
    width: 20,
    height: 10,
    borderRadius: 5,
  },
  colorText: {
    fontSize: 14,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
  buttonClose: {
    backgroundColor: '#822321',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
});

export default Homework;