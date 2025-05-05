import { Link } from "expo-router";
import { View,Image, TextInput,Text } from "react-native";
import { StyleSheet } from "react-native";

export function LoginScreen(){
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={{width:"70%",height:"70%"}} source={require('../../assets/images/nmit-logo.jpg')}></Image>
                <Text style={{color:"black",fontSize:30}}>Нэвтрэх</Text>
            </View>
            <View style={styles.form}>
                <Text style={{alignSelf:"flex-start"}}>Сурагчийн нэр</Text>
                <TextInput style={styles.input}/>
                <Text>Нууц үг</Text>
                <TextInput secureTextEntry={true} style={styles.input}/>
                <Link href={"/home"} style={{width:"100%"}}><View style ={{width:"100%",height:"35%", backgroundColor:'#822321',padding:10,flex:1,justifyContent:"center",alignItems:"center", borderRadius: 5,}}><Text style={{color:'white'}}>Нэвтрэх</Text></View></Link>
                <Link href={"/home"} style={{width:"100%", textAlign:"center",color:"#822321"}}><Text>Нууц үг сэргээх</Text></Link>
            </View>
        </View>
    );
}

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
        width:'100%',
        height:'50%',
        backgroundColor:"white",
        borderBottomLeftRadius:40,
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        width:'100%',
        height:'50%',
        flex:1,
        flexDirection:'column',
        justifyContent:'space-evenly',
        padding:20,
    },
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
      },
  });