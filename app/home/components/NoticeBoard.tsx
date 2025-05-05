import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import React from 'react';

const notices = [
  { "id": "1", "title": "Дараагийн сард сургуулийн амралт эхэлнэ", "date": "2025-03-02", "image": "" },
  { "id": "2", "title": "Зуны номын үзэсгэлэн 6-р сард болно", "date": "2025-03-02", "image": "" },
  { "id": "3", "title": "Програм хангамжийн инженерчлэлийн семинар болно", "date": "2025-03-05", "image": "" },
  { "id": "4", "title": "Хакатон тэмцээн зохион байгуулагдана", "date": "2025-03-10", "image": "" },
  { "id": "5", "title": "Компьютерийн сүлжээний практик сургалт", "date": "2025-03-15", "image": "" },
  { "id": "6", "title": "Ажлын байрны өдөрлөг: Програм хангамжийн чиглэл", "date": "2025-03-18", "image": "" },
  { "id": "7", "title": "Оюутнуудын бүтээлийн үзэсгэлэн гарна", "date": "2025-03-20", "image": "" }
];

export function NoticeBoard() {
  return (
    <View>
      <Text style={styles.sectionTitle}>Мэдэгдэл</Text>
      <View style={styles.innerContainer}>
        <FlatList
          style={{
            minHeight: 180
          }}
          horizontal
          data={notices}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.noticeCard}>
              {item.image ? (
                <Image source={{ uri: item.image }} style={styles.noticeImage} />
              ) : (
                <View style={[styles.noticeImage, { backgroundColor: 'lightgray' }]} />
              )}
              <Text style={styles.noticeTitle}>{item.title}</Text>
              <Text style={styles.noticeDate}>{item.date}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  innerContainer: { paddingHorizontal: 16 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#822321", marginBottom: 8, marginTop: 16, marginLeft:20 },

  noticeCard: { backgroundColor: "#F5F5F5", padding: 12, borderRadius: 10, marginRight: 10, width: 160 },
  noticeImage: { width: "100%", height: 80, alignSelf: "center", borderRadius: 8 },
  noticeTitle: { fontSize: 14, fontWeight: "600", marginTop: 6 },
  noticeDate: { fontSize: 12, color: "gray", marginTop: 2 },
});