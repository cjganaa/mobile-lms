import { Link } from 'expo-router';
import React, { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { CircularProgress } from 'react-native-circular-progress';
import { Attendance, SubjectGrades } from '../index';
import { AttendanceModal } from './AttendanceModal';
import { GradeModal } from './GradeModal';


type Props = {
  attendanceData: Attendance[];
  gradeData: { [subject: string]: SubjectGrades };
};

export function AttendanceList({ attendanceData, gradeData }: Props) {
  const [attendanceModalVisible, setAttendanceModalVisible] = useState(false);
  const [selectedSubjectForAttendance, setSelectedSubjectForAttendance] = useState<string | null>(null);
  const [gradeModalVisible, setGradeModalVisible] = useState(false);
  const [selectedGradeData, setSelectedGradeData] = useState<SubjectGrades | null>(null);

  const handleAttendancePress = (item: Attendance) => {
    setSelectedSubjectForAttendance(item.subject);
    setAttendanceModalVisible(true);
  };

  const closeAttendanceModal = () => {
    setAttendanceModalVisible(false);
    setSelectedSubjectForAttendance(null);
  };

  const handleGradePress = (item: Attendance) => {
    const subjectGradeData = gradeData[item.subject];
    if (subjectGradeData) {
      setSelectedGradeData(subjectGradeData);
      setGradeModalVisible(true);
    } else {
      console.log(`${item.subject} хичээлийн дүнгийн мэдээлэл байхгүй байна.`);
    }
  };

  const closeGradeModal = () => {
    setGradeModalVisible(false);
    setSelectedGradeData(null);
  };

  const calculateAttendancePercentage = (item: Attendance) => {
    const subjectAttendances = attendanceData.filter(att => att.subject === item.subject);
    const total = subjectAttendances.length;
    const presentCount = subjectAttendances.filter(att => att.present).length;
    return total > 0 ? (presentCount / total) * 100 : 0;
  };

  const getCircularBarColor = (percentage: number) => {
    if (percentage >= 90) {
      return '#00ce90';
    } else if (percentage >= 80) {
      return '#20c800';
    } else if (percentage >= 70) {
      return '#FFA000';
    } else {
      return '#fe4f66';
    }
  };

  const calculateFinalGradePercentage = useMemo(() => (subject: string): string => {
    const subjectData = gradeData[subject];
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

    return (finalScore * 100).toFixed(0);
  }, [gradeData]);

  return (
    <View style={{ flex: 1 }}>
      <Link href={'/menu'} style={{ marginHorizontal: 16, marginBottom: 8 }}>
        <Text style={styles.sectionTitle}>Дүнгийн мэдээлэл</Text>
      </Link>
      <FlatList
        data={attendanceData.filter((item, index, self) =>
          index === self.findIndex((t) => (
            t.subject === item.subject
          ))
        )}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.homeworkCard}>
            <View style={styles.progressContainer}>
              <CircularProgress
                size={50}
                width={5}
                fill={Number(calculateFinalGradePercentage(item.subject))}
                tintColor={getCircularBarColor(Number(calculateFinalGradePercentage(item.subject)))}
                backgroundColor="#ddd"
                rotation={0}
                lineCap="round"
              >
                {(fill: number) => (
                  <Text style={styles.progressText}>
                    {fill}%
                  </Text>
                )}
              </CircularProgress>
            </View>
            <View style={styles.homeworkTextContainer}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                <Text style={[styles.homeworkText]}>{item.subject}</Text>
                <Text style={styles.teacherText}>{item.teacher}</Text>
              </View>
              <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', marginBottom: 5 }}>
                <Text style={styles.label}>Ирц:</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressBarFill, { width: `${(attendanceData.filter(att => att.subject === item.subject && att.present).length / attendanceData.filter(att => att.subject === item.subject).length * 100 || 0)}%` }]} />
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Link href={'/home/details'}>
                  <View style={styles.detailsButton}>
                    <Text style={styles.detailsButtonText}>Дэлгэрэнгүй</Text>
                  </View>
                </Link>
                
              </View>
            </View>
          </View>
        )}
      />
      <AttendanceModal
        modalVisible={attendanceModalVisible}
        selectedSubject={selectedSubjectForAttendance}
        attendanceData={attendanceData}
        closeModal={closeAttendanceModal}
      />
      <GradeModal
        modalVisible={gradeModalVisible}
        selectedSubjectData={selectedGradeData}
        closeModal={closeGradeModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#822321", marginBottom: 8 },
  homeworkCard: { flexDirection: "row", backgroundColor: "#F3F4F6", padding: 12, borderRadius: 10, marginBottom: 8, marginHorizontal: 16 },
  homeworkTextContainer: { marginLeft: 12, flex: 1 },
  homeworkText: { fontSize: 16, fontWeight: "600", marginBottom: 2 },
  teacherText: { fontSize: 12, color: 'gray' },
  progressContainer: {
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 12,
    color: 'gray',
  },
  progressBar: {
    width: 120,
    height: 8,
    backgroundColor: "#ddd",
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#00ce90",
    borderRadius: 4,
  },
  detailsButton: {
    backgroundColor: '#007bff',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  detailsButtonText: {
    color: 'white',
    fontSize: 10,
  },
});