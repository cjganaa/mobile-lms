import { Link, useRouter } from "expo-router";
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

interface LoginScreenProps {}

export const LoginScreen: React.FC<LoginScreenProps> = () => {
    const [db, setDb] = useState<SQLite.SQLiteDatabase | undefined>(undefined);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();
    const [isDbReady, setIsDbReady] = useState<boolean>(false);

    useEffect(() => {
        const initializeDatabase = async () => {
            try {
                const database = await SQLite.openDatabaseAsync('app.db');
                setDb(database);
                await database.execAsync('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE NOT NULL, password TEXT NOT NULL);');
                setIsDbReady(true);
                //const user = await database.runAsync('INSERT INTO users (username, password) VALUES (?, ?)', 'ganaa', '1234');
                console.log("successfully");
            } catch (error: any) {
                console.error('Бааз үүсгэхэд алдаа гарлаа:', error);
                Alert.alert('Алдаа!', 'Бааз үүсгэх үед алдаа гарлаа.');
            }
        };
        
        initializeDatabase();
    }, []);

    const handleLogin = async () => {
        if (!isDbReady || !db) {
            Alert.alert('Анхаар!', 'Баазтай холбогдож байна, түр хүлээнэ үү.');
            return;
        }

        if (!username || !password) {
            Alert.alert('Анхаар!', 'Хэрэглэгчийн нэр болон нууц үгээ оруулна уу.');
            return;
        }

        try {
            const results = await db.getFirstAsync(
                'SELECT * FROM users WHERE username = ? AND password = ?;',
                [username, password]
            );
            if (results) {
                console.log('Амжилттай нэвтэрлээ:', results);
                router.push('/home');
            } else {
                Alert.alert('Алдаа!', 'Хэрэглэгчийн нэр эсвэл нууц үг буруу байна.');
            }
        } catch (error: any) {
            console.error('Нэвтрэхэд алдаа гарлаа:', error);
            Alert.alert('Алдаа!', 'Нэвтрэх үед алдаа гарлаа.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={{ width: "70%", height: "70%" }} source={require('../../assets/images/nmit-logo.jpg')} />
                <Text style={{ color: "black", fontSize: 30 }}>Нэвтрэх</Text>
            </View>
            <View style={styles.form}>
                <Text style={{ alignSelf: "flex-start" }}>Сурагчийн нэр</Text>
                <TextInput style={styles.input} value={username} onChangeText={setUsername} />
                <Text>Нууц үг</Text>
                <TextInput secureTextEntry={true} style={styles.input} value={password} onChangeText={setPassword} />
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Нэвтрэх</Text>
                </TouchableOpacity>
                <Link href={"/home"} style={styles.forgotPasswordLink}>
                    <Text>Нууц үг сэргээх</Text>
                </Link>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
    },
    header: {
        width: '100%',
        height: '50%',
        backgroundColor: "white",
        borderBottomLeftRadius: 40,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        height: '50%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        padding: 20,
    },
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    },
    loginButton: {
        width: "100%",
        backgroundColor: '#822321',
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
    },
    loginButtonText: {
        color: 'white',
    },
    forgotPasswordLink: {
        width: "100%",
        textAlign: "center",
        color: "#822321",
    },
});