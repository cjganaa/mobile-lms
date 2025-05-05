import React from "react";
import { Link } from "expo-router";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { Ionicons} from "@expo/vector-icons";

export function ProfileCard(props:any) {
  return (
    <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image
            source={require('../../assets/images/profile.jpg')}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.userName}>Болд-Эрдэнэ Ган-Эрдэнэ</Text>
            <Text style={styles.userClass}>se401</Text>
          </View>
        </View>
      </View>
  );
}

const menuItems: { id: string; name: string; icon: keyof typeof Ionicons.glyphMap; path:string }[] = [
  { id: "1", name: "Хяналтын самбар", icon: "home-outline",path:"/home" },
  { id: "2", name: "Даалгавар", icon: "book-outline",path:"/menu/homework" },
  { id: "3", name: "Ирцийн мэдээлэл", icon: "calendar-outline",path:"/menu/attendance" },
  { id: "4", name: "Төлбөрийн мэдээлэл", icon: "cash-outline",path:"/menu/fee" },
  { id: "5", name: "Шалгалт", icon: "clipboard-outline" ,path:"/menu/exam"},
  { id: "6", name: "Дүнгийн хуудас", icon: "document-text-outline",path:"/menu/grade" },
  { id: "7", name: "Календарь", icon: "calendar-number-outline",path:"/menu/calendar" },
  { id: "8", name: "Мэдэгдлийн самбар", icon: "notifications-outline",path:"/menu/notice" },
  { id: "9", name: "Хувийн мэдээлэл", icon: "person-outline",path:"/menu/profile" }
];


const MenuScreen = () => {

  const renderItem = ({ item }: { item: { id: string; name: string; icon: keyof typeof Ionicons.glyphMap; path:string }}) => (
    <Link href={item.path as any} style={styles.menuItem}>
      <View style={styles.menuIcon}>
        <Ionicons name={item.icon} size={30} color="#822321" />
      </View>
      <Text style={styles.menuText}>{item.name}</Text>
    </Link>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen
              options={{
                title: 'menu',
                headerStyle: { backgroundColor: '#822321' },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerTitle: props => <ProfileCard {...props} />,
              }}
            />
      

      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.menuGrid}
      />

      <Link href={'/'} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Гарах</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#822321",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop:20
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  userClass: {
    fontSize: 14,
    color: "white",
    opacity: 0.8,
  },
  menuGrid: {
    width:"100%", 
    alignItems: "center",
  },
  menuItem: {
    width: "30%",
    alignItems: "center",
    marginVertical: 15,
  },
  menuIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  menuText: {
    fontSize: 14,
    color: "white",
    textAlign: "center"
  },
  logoutButton: {
    alignSelf: "center",
  },
  logoutText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});

export default MenuScreen;
