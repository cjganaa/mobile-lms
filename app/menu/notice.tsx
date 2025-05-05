import { Stack } from 'expo-router';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';

interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
}

const initialNotices: Notice[] = [
  {
    id: '1',
    title: 'Шинэчилсэн сургалтын төлөвлөгөө',
    content: '2025 оны хичээлийн жилийн шинэчилсэн сургалтын төлөвлөгөөг танилцуулж байна. Дэлгэрэнгүйг эндээс үзнэ үү: [холбоос]',
    date: '2025-04-25',
  },
  {
    id: '2',
    title: 'Удахгүй болох эрдэм шинжилгээний хурал',
    content: 'Залуу судлаачдын ээлжит эрдэм шинжилгээний хурал 2025 оны 5-р сарын 10-нд болно. Илтгэл ирүүлэх хугацааг анхаарна уу.',
    date: '2025-04-20',
  },
  {
    id: '3',
    title: 'Номын сангийн ажиллах цагийн өөрчлөлт',
    content: '2025 оны 5-р сарын 1-нээс эхлэн номын сан ажлын өдрүүдэд 9:00-18:00 цаг хүртэл ажиллана.',
    date: '2025-04-15',
  },
  {
    id: '4',
    title: 'Онлайн лекцийн хуваарь',
    content: 'Дараагийн долоо хоногийн онлайн лекцийн хуваарь шинэчлэгдлээ. Хуваарийг эндээс харна уу: [холбоос]',
    date: '2025-04-26',
  },
  {
    id: '5',
    title: 'Тэтгэлгийн хөтөлбөр',
    content: 'Шилдэг оюутнуудад зориулсан тэтгэлгийн хөтөлбөрт бүртгэл эхэллээ. Бүртгүүлэх эцсийн хугацаа: 2025-05-15.',
    date: '2025-04-24',
  },
  {
    id: '6',
    title: 'Спорт заалны цагийн өөрчлөлт',
    content: 'Спорт заал 2025 оны 4-р сарын 28-наас эхлэн засварын улмаас түр хугацаагаар ажиллахгүй.',
    date: '2025-04-22',
  },
  {
    id: '7',
    title: 'Оюутны зөвлөлийн хурал',
    content: 'Оюутны зөвлөлийн ээлжит хурал 2025 оны 4-р сарын 29-нд 15:00 цагт болно.',
    date: '2025-04-23',
  },
  {
    id: '8',
    title: 'Компьютерийн лабораторийн шинэчлэл',
    content: 'Компьютерийн лабораторид шинэ техник хэрэгсэл суурилуулж байна. 5-р сарын эхээр ашиглалтад орно.',
    date: '2025-04-21',
  },
  {
    id: '9',
    title: 'Соёлын арга хэмжээ',
    content: 'Энэ сарын сүүлээр оюутнуудын соёлын арга хэмжээ зохион байгуулагдана. Идэвхтэй оролцоорой.',
    date: '2025-04-19',
  },
  {
    id: '10',
    title: 'Сайн дурын ажил',
    content: 'Байгаль орчныг хамгаалах сайн дурын ажилд оролцохыг уриалж байна. Бүртгэл энд: [холбоос]',
    date: '2025-04-17',
  },
];

interface NoticeItemProps {
  item: Notice;
  onPress: (notice: Notice) => void;
}

const NoticeItem: React.FC<NoticeItemProps> = ({ item, onPress }) => (
  <TouchableOpacity style={styles.noticeItem} onPress={() => onPress(item)}>
    <Text style={styles.noticeTitle}>{item.title}</Text>
    <Text style={styles.noticeDate}>{item.date}</Text>
  </TouchableOpacity>
);

interface NoticeDetailsModalProps {
  visible: boolean;
  notice: Notice | null;
  onClose: () => void;
}

const NoticeDetailsModal: React.FC<NoticeDetailsModalProps> = ({ visible, notice, onClose }) => {
  if (!visible || !notice) {
    return null;
  }

  return (
    <View style={modalStyles.centeredView}>
      <View style={modalStyles.modalView}>
        <Text style={modalStyles.modalTitle}>{notice.title}</Text>
        <Text style={modalStyles.modalDate}>{notice.date}</Text>
        <Text style={modalStyles.modalContent}>{notice.content}</Text>
        <TouchableOpacity style={modalStyles.closeButton} onPress={onClose}>
          <Text style={modalStyles.closeButtonText}>Хаах</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function NoticeScreen() {
  const [notices, setNotices] = useState<Notice[]>(initialNotices);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleNoticePress = (notice: Notice) => {
    setSelectedNotice(notice);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedNotice(null);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        title: "Мэдэгдлийн самбар"
      }} />
      <FlatList
        data={notices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NoticeItem item={item} onPress={handleNoticePress} />
        )}
      />
      <NoticeDetailsModal
        visible={isModalVisible}
        notice={selectedNotice}
        onClose={handleCloseModal}
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
  noticeItem: {
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
  noticeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  noticeDate: {
    fontSize: 12,
    color: 'gray',
  },
});

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  modalDate: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 10,
  },
  modalContent: {
    fontSize: 16,
    color: '#555',
    marginBottom: 15,
  },
  closeButton: {
    backgroundColor: '#822321',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});