import { KeyboardAvoidingView, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React, {useState} from 'react'
import ComplaintHeader from '../components/ComplaintHeader'
import client from '../api/client'
import { auth } from '../firebase'

const AddComplaint = () => {
  const screenWidth = Dimensions.get('window').width;
  const navigation = useNavigation();
  
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [userName, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const addComplaint = async () => {
    try {
      auth.onAuthStateChanged(async user => {
        if (user) {
          const uid = user.uid;

          await client.get(`/users/${uid}`)
            .then(res => {
              setUsername(res.data.user.name);
              setUserEmail(res.data.user.email);
              console.log(res.data);
            })

          const complaint = {
            user: uid,
            status: 'Pending',
            subject: subject,
            body: body,
          }

          await client.post('/complaints', {
              ...complaint,
          });
          console.log('Complaint Added Successfully ');
        }
      })
    }catch(error){
      alert(error.message);
    }
  }

  const handleAddComplaint = async () => {
    await addComplaint();
    setTimeout(() => {
      navigation.push('AddComplaintConfirm')
    }, 3000);

    setBody('');
    setSubject('');
    setUsername('');
    setUserEmail('');
  }

  return (
    <View style={styles.container}>
      <ComplaintHeader navigation={navigation} width={screenWidth}/>  
      <ScrollView>
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
          <View style={styles.inputContainer}>
              <TextInput
                  placeholder='Enter Complaint Subject'
                  value={subject}
                  onChangeText={text => setSubject(text)}
                  style={styles.input}
              />
              <TextInput
                  placeholder='Enter Complaint Body'
                  value={body}
                  onChangeText={text => setBody(text)}
                  style={styles.input}
                  multiline={true}
              />
          </View>
          <View style={styles.buttonContainer}>
              <TouchableOpacity
                  onPress={handleAddComplaint}
                  style={styles.button}
              >
                  <Text style={styles.buttonText}>Submit Complaint</Text>
              </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  )
}

export default AddComplaint

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: 20,
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 15,
    borderWidth: 2,
    borderColor: '#0782F9',
  },
  button: {
    backgroundColor: '#0782F9',
    width: 300,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16
  },
})