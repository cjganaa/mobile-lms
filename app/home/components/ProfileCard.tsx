import { Link } from 'expo-router';
import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { Fontisto } from '@expo/vector-icons';

export function ProfileCard(props: any) {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Link href={"/menu"}>
          <Fontisto name="nav-icon-grid-a" size={24} color="white" />
        </Link>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.name}>Болд-Эрдэнэ Ган-Эрдэнэ</Text>
        <Text style={styles.className}>se401</Text>
      </View>
      <View style={styles.imageWrapper}>
        <Image
          source={require('../../../assets/images/profile.jpg')}
          style={styles.profileImage}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#822321",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    color: "white",
    fontSize: 18,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  className: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
  },
  imageWrapper: {
    position: "relative",
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "white",
  },
});