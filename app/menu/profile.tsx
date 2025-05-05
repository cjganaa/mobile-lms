import { Stack, useRouter } from 'expo-router';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';

interface ProfileInfoItemProps {
  label: string;
  value: string | number;
}

const ProfileInfoItem: React.FC<ProfileInfoItemProps> = ({ label, value }) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

export default function ProfileScreen() {
  const router = useRouter();

  const profileData = {
    name: 'Болд-Эрдэнэ Ган-Эрдэнэ',
    studentId: 'SE21D105',
    major: 'Програм хангамжийн инженер',
    email: 'boldoo.ganaa@example.com',
    phoneNumber: '99112233',
    address: 'Улаанбаатар хот',
    profileImage: require('../../assets/images/profile.jpg'),
  };

  const handleEditProfile = () => {
    // Профайл засварлах хуудас руу навигац хийх логик энд байна
    console.log('Профайл засварлах...');
  };

  const handleSettings = () => {
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        title: "Хувийн мэдээлэл",
        headerRight: () => (
          <TouchableOpacity onPress={handleSettings} style={{ marginRight: 15 }}>
            <Feather name="settings" size={24} color="#822321" />
          </TouchableOpacity>
        ),
      }} />

      <View style={styles.profileHeader}>
        <View style={styles.imageContainer}>
          <Image source={profileData.profileImage} style={styles.profileImage} />
        </View>
        <Text style={styles.name}>{profileData.name}</Text>
        <Text style={styles.studentId}>{profileData.studentId}</Text>
      </View>

      <View style={styles.profileInfo}>
        <ProfileInfoItem label="Мэргэжил" value={profileData.major} />
        <ProfileInfoItem label="Имэйл" value={profileData.email} />
        <ProfileInfoItem label="Утасны дугаар" value={profileData.phoneNumber} />
        <ProfileInfoItem label="Хаяг" value={profileData.address} />
      </View>

      <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
        <Text style={styles.editButtonText}>Профайл засварлах</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  profileHeader: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 10,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  studentId: {
    fontSize: 16,
    color: 'gray',
  },
  profileInfo: {
    paddingHorizontal: 20,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoLabel: {
    fontSize: 16,
    color: '#555',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  editButton: {
    backgroundColor: '#822321',
    paddingVertical: 15,
    borderRadius: 8,
    margin: 20,
    alignItems: 'center',
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});