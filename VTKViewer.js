import React, { useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, View, Text } from 'react-native';

const VTKViewer = () => {
    const [htmlContent, setHtmlContent] = useState(null);

    useEffect(() => {
        fetch('./assets/vtkAssets/vtkSphere.html')
            .then(response => response.text())
            .then(text => setHtmlContent(text))
            .catch(error => console.error(error));
    }, []);

    return (
        <View style={styles.container}>
            {htmlContent ? (
                <WebView 
                    originWhitelist={['*']}
                    source={{ html: htmlContent }}
                    style={styles.webview}
                />
            ) : (
                <Text>Loading...</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webview: {
        flex: 1,
    }
});

export default VTKViewer;
