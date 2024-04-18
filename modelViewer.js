import React, { useState } from 'react';
import { Button, View, Image, StyleSheet, Text } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { readFile } from 'react-native-fs';  // Import react-native-fs

const modelViewer = () => {
    const [frontImageUri, setFrontImageUri] = useState(null);
    const [backImageUri, setBackImageUri] = useState(null);
    const [frontImageBase64, setFrontImageBase64] = useState(null);  // State to hold Base64 string
    const [backImageBase64, setBackImageBase64] = useState(null);    // State to hold Base64 string

    const handleImagePicker = async (side) => {
        const options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        launchImageLibrary(options, async (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: response.uri };
                const base64String = await convertImageToBase64(response.uri);  // Convert image to Base64
                if (side === 'front') {
                    setFrontImageUri(source.uri);
                    setFrontImageBase64(base64String);  // Store Base64 string
                } else {
                    setBackImageUri(source.uri);
                    setBackImageBase64(base64String);  // Store Base64 string
                }
                console.log(`Image selected for ${side}:`, source.uri);
            }
        });
    };

    const convertImageToBase64 = async (uri) => {
        try {
            const base64String = await readFile(uri, 'base64');
            return base64String;
        } catch (error) {
            console.error("Failed to convert image to Base64 string", error);
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Upload Front Image" onPress={() => handleImagePicker('front')} />
            <Button title="Upload Back Image" onPress={() => handleImagePicker('back')} />
            {frontImageUri && <Image source={{ uri: frontImageUri }} style={styles.preview} />}
            {backImageUri && <Image source={{ uri: backImageUri }} style={styles.preview} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    preview: {
        width: 100,
        height: 100,
        marginTop: 20,
    },
});

export default modelViewer;
