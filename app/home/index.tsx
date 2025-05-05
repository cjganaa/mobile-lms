import { View, StyleSheet } from 'react-native';
import React, { useState } from "react";
import { ProfileCard } from './components/ProfileCard';
import { NoticeBoard } from './components/NoticeBoard';
import { AttendanceList } from './components/AttendanceList';
interface Assignment {
  id: string;
  type: 'Лаборатори' | 'Бие даалт';
  title: string;
  grade: number;
  maxGrade: number;
}

interface Exam {
  id: string;
  name: string;
  grade: number;
  maxGrade: number;
}

export interface SubjectGrades {
  subject: string;
  attendancePercentage: number;
  assignments: Assignment[];
  exams: Exam[];
}

export interface Attendance {
  id: string;
  subject: string;
  type: 'Лекц' | 'Лаб';
  lessonNumber: number;
  present: boolean;
  teacher: string;
}

export const attendanceData: Attendance[] = [
  { "id": "1", "subject": "Өгөгдлийн бүтэц", "type": "Лекц", "lessonNumber": 1, "present": true, "teacher": "Батаа" },
  { "id": "2", "subject": "Өгөгдлийн бүтэц", "type": "Лаб", "lessonNumber": 1, "present": true, "teacher": "Нараа"},
  { "id": "3", "subject": "Өгөгдлийн бүтэц", "type": "Лекц", "lessonNumber": 2, "present": false, "teacher": "Батаа" },
  { "id": "4", "subject": "Өгөгдлийн бүтэц", "type": "Лаб", "lessonNumber": 2, "present": true, "teacher": "Нараа" },
  { "id": "5", "subject": "Өгөгдлийн бүтэц", "type": "Лекц", "lessonNumber": 3, "present": true, "teacher": "Батаа" },
  { "id": "6", "subject": "Өгөгдлийн бүтэц", "type": "Лаб", "lessonNumber": 3, "present": false, "teacher": "Нараа" },
  { "id": "7", "subject": "Өгөгдлийн бүтэц", "type": "Лекц", "lessonNumber": 4, "present": true, "teacher": "Батаа" },
  { "id": "8", "subject": "Өгөгдлийн бүтэц", "type": "Лаб", "lessonNumber": 4, "present": true, "teacher": "Нараа" },
  { "id": "9", "subject": "Өгөгдлийн бүтэц", "type": "Лекц", "lessonNumber": 5, "present": false, "teacher": "Батаа" },
  { "id": "10", "subject": "Өгөгдлийн бүтэц", "type": "Лаб", "lessonNumber": 5, "present": true, "teacher": "Нараа"},
  { "id": "11", "subject": "Алгоритм", "type": "Лекц", "lessonNumber": 1, "present": true, "teacher": "Сараа" },
  { "id": "12", "subject": "Алгоритм", "type": "Лаб", "lessonNumber": 1, "present": true, "teacher": "Ганбаатар" },
  { "id": "13", "subject": "Алгоритм", "type": "Лекц", "lessonNumber": 2, "present": false, "teacher": "Сараа" },
  { "id": "14", "subject": "Алгоритм", "type": "Лаб", "lessonNumber": 2, "present": true, "teacher": "Ганбаатар"},
  { "id": "15", "subject": "Алгоритм", "type": "Лекц", "lessonNumber": 3, "present": true, "teacher": "Сараа" },
  { "id": "16", "subject": "Алгоритм", "type": "Лаб", "lessonNumber": 3, "present": false, "teacher": "Ганбаатар" },
  { "id": "17", "subject": "Алгоритм", "type": "Лекц", "lessonNumber": 4, "present": true, "teacher": "Сараа" },
  { "id": "18", "subject": "Алгоритм", "type": "Лаб", "lessonNumber": 4, "present": true, "teacher": "Ганбаатар" },
  { "id": "19", "subject": "Алгоритм", "type": "Лекц", "lessonNumber": 5, "present": false, "teacher": "Сараа" },
  { "id": "20", "subject": "Алгоритм", "type": "Лаб", "lessonNumber": 5, "present": true, "teacher": "Ганбаатар" },
  { "id": "21", "subject": "Объект хандалтат програмчлал", "type": "Лекц", "lessonNumber": 1, "present": true, "teacher": "Ганболд" },
  { "id": "22", "subject": "Объект хандалтат програмчлал", "type": "Лаб", "lessonNumber": 1, "present": false, "teacher": "Цэцэг" },
  { "id": "23", "subject": "Объект хандалтат програмчлал", "type": "Лекц", "lessonNumber": 2, "present": true, "teacher": "Ганболд" },
  { "id": "24", "subject": "Объект хандалтат програмчлал", "type": "Лаб", "lessonNumber": 2, "present": true, "teacher": "Цэцэг"},
  { "id": "25", "subject": "Объект хандалтат програмчлал", "type": "Лекц", "lessonNumber": 3, "present": false, "teacher": "Ганболд" },
  { "id": "26", "subject": "Объект хандалтат програмчлал", "type": "Лаб", "lessonNumber": 3, "present": true, "teacher": "Цэцэг" },
  { "id": "27", "subject": "Объект хандалтат програмчлал", "type": "Лекц", "lessonNumber": 4, "present": true, "teacher": "Ганболд" },
  { "id": "28", "subject": "Объект хандалтат програмчлал", "type": "Лаб", "lessonNumber": 4, "present": false, "teacher": "Цэцэг" },
  { "id": "29", "subject": "Объект хандалтат програмчлал", "type": "Лекц", "lessonNumber": 5, "present": true, "teacher": "Ганболд" },
  { "id": "30", "subject": "Объект хандалтат програмчлал", "type": "Лаб", "lessonNumber": 5, "present": true, "teacher": "Цэцэг" },
  { "id": "31", "subject": "Веб хөгжүүлэлт", "type": "Лекц", "lessonNumber": 1, "present": false, "teacher": "Оюун" },
  { "id": "32", "subject": "Веб хөгжүүлэлт", "type": "Лаб", "lessonNumber": 1, "present": true, "teacher": "Мөнх" },
  { "id": "33", "subject": "Веб хөгжүүлэлт", "type": "Лекц", "lessonNumber": 2, "present": true, "teacher": "Оюун" },
  { "id": "34", "subject": "Веб хөгжүүлэлт", "type": "Лаб", "lessonNumber": 2, "present": false, "teacher": "Мөнх" },
  { "id": "35", "subject": "Веб хөгжүүлэлт", "type": "Лекц", "lessonNumber": 3, "present": true, "teacher": "Оюун" },
  { "id": "36", "subject": "Веб хөгжүүлэлт", "type": "Лаб", "lessonNumber": 3, "present": true, "teacher": "Мөнх" },
  { "id": "37", "subject": "Веб хөгжүүлэлт", "type": "Лекц", "lessonNumber": 4, "present": false, "teacher": "Оюун" },
  { "id": "38", "subject": "Веб хөгжүүлэлт", "type": "Лаб", "lessonNumber": 4, "present": true, "teacher": "Мөнх" },
  { "id": "39", "subject": "Веб хөгжүүлэлт", "type": "Лекц", "lessonNumber": 5, "present": true, "teacher": "Оюун" },
  { "id": "40", "subject": "Веб хөгжүүлэлт", "type": "Лаб", "lessonNumber": 5, "present": false, "teacher": "Мөнх"},
  { "id": "41", "subject": "Мобиль програмчлал", "type": "Лекц", "lessonNumber": 1, "present": true, "teacher": "Энхээ" },
  { "id": "42", "subject": "Мобиль програмчлал", "type": "Лаб", "lessonNumber": 1, "present": true, "teacher": "Уянга" },
  { "id": "43", "subject": "Мобиль програмчлал", "type": "Лекц", "lessonNumber": 2, "present": true, "teacher": "Энхээ" },
  { "id": "44", "subject": "Мобиль програмчлал", "type": "Лаб", "lessonNumber": 2, "present": false, "teacher": "Уянга" },
  { "id": "45", "subject": "Мобиль програмчлал", "type": "Лекц", "lessonNumber": 3, "present": false, "teacher": "Энхээ" },
  { "id": "46", "subject": "Мобиль програмчлал", "type": "Лаб", "lessonNumber": 3, "present": true, "teacher": "Уянга" },
  { "id": "47", "subject": "Мобиль програмчлал", "type": "Лекц", "lessonNumber": 4, "present": true, "teacher": "Энхээ" },
  { "id": "48", "subject": "Мобиль програмчлал", "type": "Лаб", "lessonNumber": 4, "present": true, "teacher": "Уянга" },
  { "id": "49", "subject": "Мобиль програмчлал", "type": "Лекц", "lessonNumber": 5, "present": true, "teacher": "Энхээ" },
  { "id": "50", "subject": "Мобиль програмчлал", "type": "Лаб", "lessonNumber": 5, "present": false, "teacher": "Уянга"},
  { "id": "51", "subject": "Компьютерийн сүлжээ", "type": "Лекц", "lessonNumber": 1, "present": false, "teacher": "Нараа" },
  { "id": "52", "subject": "Компьютерийн сүлжээ", "type": "Лаб", "lessonNumber": 1, "present": false, "teacher": "Уянга" },
  { "id": "53", "subject": "Компьютерийн сүлжээ", "type": "Лекц", "lessonNumber": 2, "present": true, "teacher": "Нараа" },
  { "id": "54", "subject": "Компьютерийн сүлжээ", "type": "Лаб", "lessonNumber": 2, "present": true, "teacher": "Уянга" },
  { "id": "55", "subject": "Компьютерийн сүлжээ", "type": "Лекц", "lessonNumber": 3, "present": false, "teacher": "Нараа" },
  { "id": "56", "subject": "Компьютерийн сүлжээ", "type": "Лаб", "lessonNumber": 3, "present": false, "teacher": "Уянга" },
  { "id": "57", "subject": "Компьютерийн сүлжээ", "type": "Лекц", "lessonNumber": 4, "present": true, "teacher": "Нараа" },
  { "id": "58", "subject": "Компьютерийн сүлжээ", "type": "Лаб", "lessonNumber": 4, "present": true, "teacher": "Уянга"},
  { "id": "59", "subject": "Компьютерийн сүлжээ", "type": "Лекц", "lessonNumber": 5, "present": false, "teacher": "Нараа" },
  { "id": "60", "subject": "Компьютерийн сүлжээ", "type": "Лаб", "lessonNumber": 5, "present": true, "teacher": "Уянга" },
  { "id": "61", "subject": "Хиймэл оюун ухаан", "type": "Лекц", "lessonNumber": 1, "present": true, "teacher": "Уянга" },
  { "id": "62", "subject": "Хиймэл оюун ухаан", "type": "Лаб", "lessonNumber": 1, "present": true, "teacher": "Цэцэг" },
  { "id": "63", "subject": "Хиймэл оюун ухаан", "type": "Лекц", "lessonNumber": 2, "present": true, "teacher": "Уянга" },
  { "id": "64", "subject": "Хиймэл оюун ухаан", "type": "Лаб", "lessonNumber": 2, "present": false, "teacher": "Цэцэг" },
  { "id": "65", "subject": "Хиймэл оюун ухаан", "type": "Лекц", "lessonNumber": 3, "present": false, "teacher": "Уянга" },
  { "id": "66", "subject": "Хиймэл оюун ухаан", "type": "Лаб", "lessonNumber": 3, "present": true, "teacher": "Цэцэг" },
  { "id": "67", "subject": "Хиймэл оюун ухаан", "type": "Лекц", "lessonNumber": 4, "present": true, "teacher": "Уянга" },
  { "id": "68", "subject": "Хиймэл оюун ухаан", "type": "Лаб", "lessonNumber": 4, "present": true, "teacher": "Цэцэг"},
  { "id": "69", "subject": "Хиймэл оюун ухаан", "type": "Лекц", "lessonNumber": 5, "present": true, "teacher": "Уянга" },
  { "id": "70", "subject": "Хиймэл оюун ухаан", "type": "Лаб", "lessonNumber": 5, "present": false, "teacher": "Цэцэг" }
];

export const gradesData: { [subject: string]: SubjectGrades } = {
  'Өгөгдлийн бүтэц': {
    subject: 'Өгөгдлийн бүтэц',
    attendancePercentage: 85,
    assignments: [
      { id: '1', type: 'Лаборатори', title: 'Бүлэг 1', grade: 90, maxGrade: 100 },
      { id: '2', type: 'Бие даалт', title: 'Модуль 1', grade: 85, maxGrade: 100 },
      { id: '3', type: 'Лаборатори', title: 'Бүлэг 2', grade: 92, maxGrade: 100 },
    ],
    exams: [
      { id: '101', name: '1-р улирлын шалгалт', grade: 88, maxGrade: 100 },
      { id: '102', name: 'Эцсийн шалгалт', grade: 95, maxGrade: 100 },
    ],
  },
  'Алгоритм': {
    subject: 'Алгоритм',
    attendancePercentage: 92,
    assignments: [
      { id: '4', type: 'Лаборатори', title: 'Бүлэг 1', grade: 78, maxGrade: 100 },
      { id: '5', type: 'Бие даалт', title: 'Модуль 1', grade: 92, maxGrade: 100 },
    ],
    exams: [
      { id: '201', name: 'Эцсийн шалгалт', grade: 92, maxGrade: 100 },
    ],
  },
  'Объект хандалтат програмчлал': {
    subject: 'Объект хандалтат програмчлал',
    attendancePercentage: 78,
    assignments: [
      { id: '6', type: 'Лаборатори', title: 'Бүлэг 1', grade: 88, maxGrade: 100 },
      { id: '7', type: 'Бие даалт', title: 'Модуль 1', grade: 95, maxGrade: 100 },
      { id: '8', type: 'Лаборатори', title: 'Бүлэг 2', grade: 80, maxGrade: 100 },
      { id: '9', type: 'Бие даалт', title: 'Модуль 2', grade: 90, maxGrade: 100 },
    ],
    exams: [
      { id: '301', name: 'Явцын шалгалт', grade: 78, maxGrade: 100 },
      { id: '302', name: 'Эцсийн шалгалт', grade: 85, maxGrade: 100 },
    ],
  },
  'Веб хөгжүүлэлт': {
    subject: 'Веб хөгжүүлэлт',
    attendancePercentage: 60,
    assignments: [
      { id: '10', type: 'Лаборатори', title: 'Бүлэг 1', grade: 65, maxGrade: 100 },
      { id: '11', type: 'Бие даалт', title: 'Төсөл 1', grade: 75, maxGrade: 100 },
    ],
    exams: [
      { id: '401', name: 'Эцсийн шалгалт', grade: 70, maxGrade: 100 },
    ],
  },
  'Мобиль програмчлал': {
    subject: 'Мобиль програмчлал',
    attendancePercentage: 98,
    assignments: [
      { id: '12', type: 'Лаборатори', title: 'Бүлэг 1', grade: 95, maxGrade: 100 },
      { id: '13', type: 'Бие даалт', title: 'Төсөл 1', grade: 88, maxGrade: 100 },
      { id: '14', type: 'Лаборатори', title: 'Бүлэг 2', grade: 92, maxGrade: 100 },
    ],
    exams: [
      { id: '501', name: '1-р сэдвийн шалгалт', grade: 85, maxGrade: 100 },
      { id: '502', name: 'Эцсийн шалгалт', grade: 90, maxGrade: 100 },
    ],
  },
  'Компьютерийн сүлжээ': {
    subject: 'Компьютерийн сүлжээ',
    attendancePercentage: 70,
    assignments: [
      { id: '15', type: 'Лаборатори', title: 'Сүлжээний үндэс', grade: 80, maxGrade: 100 },
      { id: '16', type: 'Бие даалт', title: 'Сүлжээний төсөл', grade: 70, maxGrade: 100 },
    ],
    exams: [
      { id: '601', name: 'Эцсийн шалгалт', grade: 75, maxGrade: 100 },
    ],
  },
  'Хиймэл оюун ухаан': {
    subject: 'Хиймэл оюун ухаан',
    attendancePercentage: 88,
    assignments: [
      { id: '17', type: 'Лаборатори', title: 'Нейрон сүлжээ', grade: 95, maxGrade: 100 },
      { id: '18', type: 'Бие даалт', title: 'Машин сургалт', grade: 85, maxGrade: 100 },
    ],
    exams: [
      { id: '701', name: 'Эцсийн шалгалт', grade: 90, maxGrade: 100 },
    ],
  },
};

export default function Home() {
  const [homework] = useState<Attendance[]>(attendanceData);

  return (
    <View style={styles.container}>
      <ProfileCard />
      <NoticeBoard />
      <AttendanceList  attendanceData={attendanceData} gradeData={gradesData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", paddingTop: 20 },
});