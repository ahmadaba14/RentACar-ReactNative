import { Dimensions, ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from 'react-native'
import React, { useState } from 'react'
import DamageControlFormHeader from '../components/DamageControlFormHeader'
import { useNavigation } from '@react-navigation/native'
import DropDownPicker from 'react-native-dropdown-picker'
import { IconButton } from 'react-native-paper';

const DamageControlForm = ({route}) => {
    const details = route.params.data;
    const navigation = useNavigation();
    const screenWidth = Dimensions.get('window').width;

    const [inputs, setInputs] = useState([{
        key: '',
        damagePart: '',
        damagePartParent: '',
        damageDescription: '',
        open: false
    }])

    const [count, setCount] = useState(0);

    const [damageFactor, setDamageFactor] = useState(0);

    const [items, setItems] = useState([
        {label: 'External Body Parts', value: 'External Body Parts', disabled: true},
        {label: 'Bumper', value: 'Bumper', parent: 'External Body Parts'},
        {label: 'Fender', value: 'Fender', parent: 'External Body Parts'},
        {label: 'Doors', value: 'Doors', parent: 'External Body Parts'},
        {label: 'Hood', value: 'Hood', parent: 'External Body Parts'},
        {label: 'Trunk', value: 'Trunk', parent: 'External Body Parts'},
        {label: 'Mirrors', value: 'Mirrors', parent: 'External Body Parts'},
        {label: 'Windscreen', value: 'Windscreen', parent: 'External Body Parts'},
        {label: 'Tyres', value: 'Tyres', parent: 'External Body Parts'},
        {label: 'Rims', value: 'Rims', parent: 'External Body Parts'},
        {label: 'Exhausts', value: 'Exhausts', parent: 'External Body Parts'},
        {label: 'Windows', value: 'Windows', parent: 'External Body Parts'},

        {label: 'Engine Parts', value: 'Engine Parts', disabled: true},
        {label: 'Engine', value: 'Engine', parent: 'Engine Parts'},
        {label: 'Belt Chain', value: 'Belt Chain', parent: 'Engine Parts'},
        {label: 'Tensioners', value: 'Tensioners', parent: 'Engine Parts'},
        {label: 'Fuel & Engine Management Parts', value: 'Fuel & Engine Management Parts', parent: 'Engine Parts'},
        {label: 'Ignition', value: 'Ignition', parent: 'Engine Parts'},
        {label: 'Steering', value: 'Steering', parent: 'Engine Parts'},
        {label: 'Suspension', value: 'Suspension', parent: 'Engine Parts'},

        {label: 'Transmission', value: 'Transmission', disabled: true},
        {label: 'Gearbox', value: 'Gearbox', parent: 'Transmission'},
        {label: 'Oil Parts', value: 'Oil Parts', parent: 'Transmission'},
        {label: 'Clutch & Associated Parts', value: 'Clutch & Associated Parts', parent: 'Transmission'},

        {label: 'Brake', value: 'Brake', disabled: true},
        {label: 'Brake & Accessories', value: 'Brake & Accessories', parent: 'Brake'},
        {label: 'Brake Pads', value: 'Brake Pads', parent: 'Brake'},
        {label: 'Brake Hydraulics', value: 'Brake Hydraulics', parent: 'Brake'},

        {label: 'Cooling', value: 'Cooling', disabled: true},
        {label: 'Air Conditioning', value: 'Air Conditioning', parent: 'Cooling'},
        {label: 'Heating', value: 'Heating', parent: 'Cooling'},

        {label: 'Electrical', value: 'Electrical', disabled: true},
        {label: 'Electrical Items & Parts', value: 'Electrical Items & Parts', parent: 'Electrical'},
        {label: 'External Lights & Indicators', value: 'External Lights & Indicators', parent: 'Electrical'},

        {label: 'Other', value: 'Other', disabled: true},
        {label: 'Seats', value: 'Seats', parent: 'Other'},
        {label: 'Seat Covers', value: 'Seat Covers', parent: 'Other'},
        {label: 'Other Parts', value: 'Other Parts', parent: 'Other'},
    ]);

    const addHandler = ()=>{
        if (inputs.length !== 0) {
            if(inputs[count].damagePart === '' || inputs[count].damagePartParent === '' || inputs[count].damageDescription === ''){
                alert('Please fill all the fields');
                return;
            }
        }
        const _inputs = [...inputs];
        _inputs.push({key: '', damagePart: '', damageDescription: ''});
        setInputs(_inputs);
        setCount(count+1);
    }

    const deleteHandler = (key)=>{
        const _inputs = inputs.filter((input,index) => index != key);
        setInputs(_inputs);
        setCount(count-1);
    }

    const openHandler = (key)=>{
        const _inputs = [...inputs];
        _inputs[key].open = true;
        setInputs(_inputs);
    }

    const closeHandler = (key)=>{
        const _inputs = [...inputs];
        _inputs[key].open = false;
        setInputs(_inputs);
    }

    const damagePartHandler = (item, key)=>{
        const _inputs = [...inputs];
        _inputs[key].damagePart = item.value;
        _inputs[key].damagePartParent = item.parent;
        _inputs[key].open = false;
        _inputs[key].key = key;
        setInputs(_inputs);
    }

    const damageDescriptionHandler = (text, key)=>{
        const _inputs = [...inputs];
        _inputs[key].damageDescription = text;
        _inputs[key].key = key;
        setInputs(_inputs);
    }

    const submitHandler = ()=>{
        if (inputs.length !== 0) {
            if(inputs[count].damagePart === '' || inputs[count].damagePartParent === '' || inputs[count].damageDescription === ''){
                alert('Please fill all the fields');
                return;
            }
        } else {
            alert('Please add atleast one damage part');
            return;
        }
        inputs.forEach((input, index)=>{
            switch (input.damagePartParent) {
                case 'External Body Parts':
                    setDamageFactor(damageFactor + 20);
                    break;
                case 'Engine Parts':
                    setDamageFactor(damageFactor + 90);
                    break;
                case 'Transmission':
                    setDamageFactor(damageFactor + 80);
                    break;
                case 'Brake':
                    setDamageFactor(damageFactor + 70);
                    break;
                case 'Electrical':
                    setDamageFactor(damageFactor + 50);
                    break;
                case 'Cooling':
                    setDamageFactor(damageFactor + 10);
                    break;
                default:
                    break;
            }
        });

        const estRent = Math.round(((details.carPrice - (details.carPrice * (details.mileage * 0.00000333))) * 0.002) - damageFactor);

        const minRent = Math.floor(estRent - (estRent * 0.05));

        const maxRent = Math.floor(estRent + (estRent * 0.05));

        navigation.navigate('RentEstimationScreen', {
            data: {
                carDetails: details,
                damages: inputs,
                estRent: estRent,
                minRent: minRent,
                maxRent: maxRent,
            }
        })
    }

    return (
    <View style={styles.container}>
        <DamageControlFormHeader navigation={navigation} width={screenWidth} route={details}/>
        <ScrollView style={styles.inputsContainer} contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between', flexDirection: 'column'}}>
            <View style={{justifyContent: 'flex-start'}}>
                {inputs.map((input, key)=>(
                <View>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>Damage {key + 1}</Text>
                        <TouchableOpacity 
                            onPress = {()=> deleteHandler(key)}
                            style={styles.deleteButton}
                        >
                            <Text style={{color: "white", fontSize: 16}}>Delete</Text>
                        </TouchableOpacity> 
                    </View>
                    <DropDownPicker
                        placeholder='Select Damaged Part'
                        placeholderStyle={{color: '#0782F9'}}
                        textStyle={{color: '#0782F9'}}
                        open={input.open}
                        value={input.damagePart}
                        items={items}
                        onOpen={() => openHandler(key)}
                        onClose={() => closeHandler(key)}
                        onSelectItem={(item)=>damagePartHandler(item,key)}
                        setItems={setItems}
                        style={{width: 300, marginVertical: 10, padding: 10, borderRadius: 10, borderColor: '#0782F9'}}
                        dropDownContainerStyle={{maxHeight: 200, borderRadius: 10, borderColor: '#0782F9'}}
                        listItemLabelStyle={{color: '#0782F9'}}
                        selectedItemLabelStyle={{fontWeight: 'bold'}}
                        listMode='SCROLLVIEW'
                    />
                    <TextInput 
                        placeholder={"Describe Damage"} 
                        value={input.damageDescription}  
                        onChangeText={(text)=>damageDescriptionHandler(text,key)}
                        style={styles.input}
                        multiline={true}
                    />
                </View>
                ))}
                <View style={styles.addButton}>
                    <IconButton
                        icon="plus-circle"
                        color='#0782F9'
                        size={40}
                        onPress={addHandler}
                    />
                    <Text style={styles.addButtonText}>Add Damage</Text>
                </View>
            </View>
        <TouchableOpacity
            onPress={submitHandler}
            style={styles.button}
        >
            <Text style={styles.buttonText}>Submit Damages</Text>
        </TouchableOpacity>
        </ScrollView>
    </View>
    )
}

export default DamageControlForm

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    headerContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginTop: 15,
    },
    headerText:{
        fontWeight: 'bold',
        fontSize: 20,
        color: '#0782F9',
    },
    inputsContainer: {
        flex: 1, 
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: "lightgray"
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 5,
        width: 100,
        borderRadius: 10,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: "white", 
        fontSize: 16
    }, 
    button: {
        backgroundColor: '#0782F9',
        width: 300,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 15,
        justifyContent: 'flex-end'
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 15,
        borderWidth: 2,
        borderColor: '#0782F9',
        height: 100,
        textAlign: 'left',
        textAlignVertical: 'top',
        maxWidth: 300,
    },
    addButton: {
        alignSelf: 'center',
        alignItems: 'center'
    },
    addButtonText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
        marginTop: -15
    },
})