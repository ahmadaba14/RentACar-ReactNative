import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Alert, ImageBackground} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import CarDocumentsHeader from '../components/CarDocumentsHeader';
import * as ImagePicker from 'expo-image-picker'
import { IconButton, Modal } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import { Camera } from 'expo-camera';
// import ScanbotSDK, {DocumentScannerConfiguration} from 'react-native-scanbot-sdk'

let camera = Camera;

const CarDocumentsSubmission = ({route}) => {
    const details = route.params.data;
    const screenWidth = Dimensions.get('window').width;
    const navigation = useNavigation();

    const [plateImage, setPlateImage] = useState('');
    const [documentImage, setDocumentImage] = useState('');

    const [modalVisible, setModalVisible] = useState(false);

    const [startCamera, setStartCamera] = useState(false);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [flashMode, setFlashMode] = useState('off')
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)

    const [startScanner, setStartScanner] = useState(false);
    const documentScannerElement = useRef(null);
    const [document, setDocument] = useState({});
    const [enableTorch, setEnableTorch] = useState(false);

    const _startCamera = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status === 'granted') {
            setStartCamera(true)
        } else {
            Alert.alert('No permission to access camera');
        }
    }

    const _takePicture = async () => {
        if (!camera) return
        const photo = await camera.takePictureAsync()
        setPreviewVisible(true)
        setCapturedImage(photo)
    }

    const _retakePicture = () => {
        setCapturedImage(null)
        setPreviewVisible(false)
        _startCamera()
    }

    const _savePhoto = () => {
        setPlateImage(capturedImage.uri);
        setStartCamera(false);
        setPreviewVisible(false);
        setModalVisible(false);
    }

    const _handleFlashMode = () => {
        if (flashMode === 'on') {
            setFlashMode('off')
        } else if (flashMode === 'off') {
            setFlashMode('on')
        } else {
            setFlashMode('auto')
        }
    }

    const _switchCamera = () => {
        if (cameraType === 'back') {
          setCameraType('front')
        } else {
          setCameraType('back')
        }
    }

    const closeCamera = () => {
        setStartCamera(false);
        setPreviewVisible(false);
        setModalVisible(false);
    }

    // const scanDocument = async () => {
    //     const config = {
    //         multiPageEnabled: false,
    //         ignoreBadAspectRatio: true
    //     }
    //     const result = await ScanbotSDK.UI.startDocumentScanner(config);
    //     if (result.status === 'OK') {
    //         setDocumentImage(result.pages[0].documentPreviewImageFileUri);
    //     }
    // }

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status != "granted") {
            alert("We need permissions to access your camera roll")
        }
        else {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 0.6,
            });
    
            if (!result.cancelled){
                setPlateImage(result.uri);
                setModalVisible(false);
            }
        }
    }

    return (
        <View style={styles.container}>
            {startCamera ? (
                <View style={styles.cameraContainer}>
                    {previewVisible && capturedImage ? (
                        <CameraPreview photo={capturedImage} savePhoto={_savePhoto} retakePicture={_retakePicture}/>
                    ) : (
                        <Camera
                            type={cameraType}
                            ratio="16:9"
                            style={{flex: 1}}
                            flashMode={flashMode}
                            ref={(r) => {
                            camera = r
                            }}
                        >
                            <View
                                style={{
                                flex: 1,
                                width: '100%',
                                backgroundColor: 'transparent',
                                flexDirection: 'row'
                                }}
                            >
                                <View
                                    style={{
                                        position: 'absolute',
                                        left: '5%',
                                        top: '10%',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={_handleFlashMode}
                                        style={{
                                            position: 'absolute',
                                            backgroundColor: flashMode === 'off' ? '#000' : '#fff',
                                            borderRadius: 5,
                                            height: 25,
                                            width: 25,
                                        }}
                                    >
                                            <Text
                                                style={{
                                                fontSize: 20
                                                }}
                                            >
                                            ⚡️
                                            </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.switchCameraButton} onPress={_switchCamera}>
                                        <Text
                                            style={{
                                                fontSize: 20
                                            }}
                                            >
                                            {cameraType === 'front' ? '🤳' : '📷'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity
                                    onPress={closeCamera} 
                                    style={{
                                        position: 'absolute',
                                        right: '5%',
                                        top: '10%',
                                        backgroundColor: 'red',
                                        borderRadius: 50,
                                        height: 40,
                                        width: 40,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            color: '#fff'
                                        }} 
                                    >
                                        X
                                    </Text>
                                </TouchableOpacity>
                                <View style={styles.cameraCaptureContainer}>
                                    <View style={styles.captureContainer}>
                                        <TouchableOpacity
                                            onPress={_takePicture}
                                            style={styles.captureButton}
                                        />
                                    </View>
                                </View>
                            </View>
                        </Camera>
                    )}
                </View>
            ) : (
                <View style={{alignItems: 'center'}}>
                    <CarDocumentsHeader navigation={navigation} width={screenWidth}/>
                    <ScrollView>
                        <View style={styles.bodyContainer}>
                            <Text style={styles.headerText}>Number Plate Picture</Text>
                            <Text style={styles.bodyText}>Take Picture from the front of the car and make sure both Car and Number Plate are visible.</Text>
                            <View style={styles.imageContainer}>
                                <TouchableOpacity style={styles.imageButton} onPress={() => {setModalVisible(true)}}>
                                    <Text style={styles.imageButtonText}>Take Picture</Text>
                                </TouchableOpacity>
                                <Image
                                    source={plateImage === '' ? require('../images/camera-icon-21.png') : {uri: plateImage}}
                                    style={styles.image} 
                                />
                            </View>
                        </View>
                        <View style={styles.bodyContainer}>
                            <Text style={styles.headerText}>Document Picture</Text>
                            <Text style={styles.bodyText}>Take Picture from the top of document in a bright place</Text>
                            <View style={styles.imageContainer}>
                                <TouchableOpacity style={styles.imageButton}>
                                    <Text style={styles.imageButtonText}>Take Picture</Text>
                                </TouchableOpacity>
                                <Image
                                    source={documentImage === '' ? require('../images/camera-icon-21.png') : {uri: documentImage}}
                                    style={styles.image} 
                                />
                            </View>
                        </View>
                        <TouchableOpacity
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Submit Documents</Text>
                        </TouchableOpacity>
                    </ScrollView>
                    <Modal 
                        visible={modalVisible} 
                        style={styles.modalStyle} 
                        onDismiss={() => setModalVisible(false)}
                    >
                        <View style={styles.modalContent}>
                            <TouchableOpacity style={styles.modalButton} onPress={_startCamera}>
                                <Icon
                                    name="camera"
                                    type='material-community'
                                    color={'white'}
                                    size={25}
                                />
                                <Text style={styles.modalButtonText}>Take Picture</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={pickImage}>
                                <Icon
                                    name="upload"
                                    type='material-community'
                                    color={'white'}
                                    size={25}
                                />
                                <Text style={styles.modalButtonText}>Upload Picture</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </View>
            )}
        </View>
    )
}

export default CarDocumentsSubmission

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: 'center',
    },
    bodyContainer: {
        alignItems: 'center',
        marginTop: 20,
        width: Dimensions.get('window').width-60,
    },
    headerText:{
        fontWeight: 'bold',
        fontSize: 30,
        color: '#0782F9',
        textAlign: 'center',
    },
    bodyText: {
        fontSize: 14,
        textAlign: 'center',
        color: '#0782F9',
        marginVertical: 10,
    },
    imageButton: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 15,
        borderWidth: 2,
        borderColor: '#0782F9',
        marginRight: 20,
    },
    imageButtonText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16
    },
    imageContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-evenly', 
        alignItems: 'center',
        marginTop: 20
    },
    image: {
        width: 130, 
        height: 130, 
        borderWidth: 2, 
        borderColor: '#0782F9',
        borderRadius: 5,
        resizeMode: 'contain'
    },
    button: {
        backgroundColor: '#0782F9',
        width: 300,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 50
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
    modalStyle: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        borderColor: '#0782F9',
    },
    modalButton: {
        backgroundColor: '#0782F9',
        width: 200,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginVertical: 10
    },
    modalButtonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 14,
        marginLeft: 10,
    },
    cameraCaptureContainer: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        flex: 1,
        width: '100%',
        padding: 20,
        justifyContent: 'space-between'
    },
    captureContainer: {
        alignSelf: 'center',
        flex: 1,
        alignItems: 'center'
    },
    captureButton: {
        width: 70,
        height: 70,
        bottom: 0,
        borderRadius: 50,
        backgroundColor: '#fff'
    },
    cameraContainer: {
        flex: 1,
        width: '100%'
    },
    previewButton: {
        backgroundColor: '#0782F9',
        width: 130,
        height: 40,
        alignItems: 'center',
        borderRadius: 4
    },
    previewButtonText: {
        color: 'white',
        fontSize: 20
    },
    switchCameraButton: {
        marginTop: 30,
        height: 25,
        width: 25
    }
})

const CameraPreview = ({photo, retakePicture, savePhoto}) => {
    console.log('sdsfds', photo)
    return (
      <View
        style={{
          backgroundColor: 'transparent',
          flex: 1,
          width: '100%',
          height: '100%'
        }}
      >
        <ImageBackground
          source={{uri: photo && photo.uri}}
          style={{
            flex: 1
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              padding: 15,
              justifyContent: 'flex-end'
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <TouchableOpacity
                onPress={retakePicture}
                style={styles.previewButton}
              >
                <Text
                  style={styles.previewButtonText}
                >
                  Re-take
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={savePhoto}
                style={styles.previewButton}
              >
                <Text
                  style={styles.previewButtonText}
                >
                  Save Photo
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    )
}