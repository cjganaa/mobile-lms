import { Stack } from 'expo-router';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import React from 'react';

interface PaymentInfo {
  semester: string;
  creditsEarned: number;
  tuitionFee: number;
  paidAmount: number;
  paymentStatus: 'Төлөгдсөн' | 'Хүлээгдэж буй' | 'Хугацаа хэтэрсэн';
  paymentDueDate?: string;
}

const paymentData: PaymentInfo[] = [
  {
    semester: '2025-Хавар',
    creditsEarned: 15,
    tuitionFee: 1500000,
    paidAmount: 1500000,
    paymentStatus: 'Төлөгдсөн',
  },
  {
    semester: '2025-Намар',
    creditsEarned: 18,
    tuitionFee: 1800000,
    paidAmount: 900000,
    paymentStatus: 'Хүлээгдэж буй',
    paymentDueDate: '2024-11-15',
  },
  {
    semester: '2024-Хавар',
    creditsEarned: 16,
    tuitionFee: 1600000,
    paidAmount: 1600000,
    paymentStatus: 'Төлөгдсөн',
  },
  {
    semester: '2024-Намар',
    creditsEarned: 17,
    tuitionFee: 1700000,
    paidAmount: 0,
    paymentStatus: 'Хүлээгдэж буй',
    paymentDueDate: '2025-11-10',
  },
  {
    semester: '2023-Хавар',
    creditsEarned: 15,
    tuitionFee: 1550000,
    paidAmount: 1550000,
    paymentStatus: 'Төлөгдсөн',
  },
  {
    semester: '2023-Намар',
    creditsEarned: 18,
    tuitionFee: 1850000,
    paidAmount: 500000,
    paymentStatus: 'Хугацаа хэтэрсэн',
    paymentDueDate: '2026-11-05',
  },
];

interface PaymentItemProps {
  item: PaymentInfo;
}

const PaymentItem: React.FC<PaymentItemProps> = ({ item }) => {
  const getStatusStyle = () => {
    switch (item.paymentStatus) {
      case 'Төлөгдсөн':
        return styles.status_Төлөгдсөн;
      case 'Хүлээгдэж буй':
        return styles.status_Хүлээгдэж_буй;
      case 'Хугацаа хэтэрсэн':
        return styles.status_Хугацаа_хэтэрсэн;
      default:
        return {}; // Default style or no style
    }
  };

  return (
    <View style={styles.paymentItem}>
      <Text style={styles.semester}>{item.semester}</Text>
      <View style={styles.details}>
        <Text>Кредит: {item.creditsEarned}</Text>
        <Text>Төлбөр: {item.tuitionFee.toLocaleString('mn-MN')}₮</Text>
        <Text>Төлсөн: {item.paidAmount.toLocaleString('mn-MN')}₮</Text>
        <Text style={[styles.status, getStatusStyle()]}>
          Статус: {item.paymentStatus}
        </Text>
        {item.paymentDueDate && (
          <Text>Дуусах хугацаа: {item.paymentDueDate}</Text>
        )}
      </View>
    </View>
  );
};

export default function PaymentScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        title: "Төлбөрийн мэдээлэл"
      }} />
      <FlatList
        data={paymentData}
        keyExtractor={(item) => item.semester}
        renderItem={({ item }) => <PaymentItem item={item} />}
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
  paymentItem: {
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
  semester: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  details: {
    marginLeft: 10,
  },
  status: {
    fontWeight: 'bold',
    marginTop: 5,
  },
  status_Төлөгдсөн: {
    color: 'green',
  },
  status_Хүлээгдэж_буй: {
    color: 'orange',
  },
  status_Хугацаа_хэтэрсэн: {
    color: 'red',
  },
});