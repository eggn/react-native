import * as Font from 'expo-font';

export const loadFontsExpo = async (callback) => {
    return await Font.loadAsync({ 'Lato': require('../../assets/fonts/Lato.ttf') })    
}