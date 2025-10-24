import React, { useState, useEffect, useMemo, memo } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Image,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../../store/slices/authSlice';
import { RootState } from '../../store';
import { useNavigation } from '@react-navigation/native';
import HeaderComponent from '../../components/common/HeaderComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '../../assets/images';
import createStyles from './styles';
import TextInputComponent from '../../components/common/TextInputComponent';
import ButtonComponent from '../../components/common/ButtonComponent';
import { STRINGS } from '../../utils/constants';
import useAppConfig from '../../hooks/useAppConfig';
import { fetchQueryApi } from '../../services/api/api';
import { useTranslation } from 'react-i18next';

const SignInScreen: React.FC = () => {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { t } = useTranslation();

    const { error } = useSelector((state: RootState) => state.auth);
    const { getApplicationUrls } = useAppConfig();
    const applicationUrls = getApplicationUrls();

    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignIn = async () => {
        if (!email.trim()) {
            setErrorMessage(STRINGS.SIGN_IN_ERROR_MESSAGE);
            return;
        }
        try {
            const authUrl = applicationUrls?.UrlSendMAgicLink.replace('{email}', email).replace('{DeviceType}', 'gpi_app');
            const result = await fetchQueryApi(authUrl || '');
            console.log('result', result);
        } catch (err) {
            // handled by slice
            console.log('err', err);
        }
    };

    const handleSignUp = () => navigation.navigate('SignUp' as never);
    const handleSkip = () => navigation.navigate('Main' as never);

    useEffect(() => {
        if (error) {
            dispatch(clearError());
        }
    }, [error, dispatch]);

    useEffect(() => {
        if (email) setErrorMessage('');
    }, [email]);

    // https://grandprix.info/sudo/ec710154-077f-4ed1-87e8-fd10776af229?target=app

    const LogoComponent = memo(() => {
        return (
            <View style={styles.header}>
                <Image source={images.logo} style={styles.logo} tintColor={theme.colors.logo} resizeMode="contain" />
            </View>
        )
    });

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} >
                <HeaderComponent />
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <LogoComponent />
                    <View style={styles.contentContainer}>
                        <Text style={styles.title}>{t(STRINGS.SIGN_IN)}</Text>
                        <Text style={styles.subtitle}>{t(STRINGS.PLEASE_SIGN_IN_TO_YOUR_ACCOUNT)}</Text>
                    </View>

                    <TextInputComponent label={t(STRINGS.EMAIL)} placeholder={STRINGS.EMAIL_PLACEHOLDER}
                        value={email} onChangeText={setEmail} type="text" error={errorMessage}
                        keyboardType="email-address" autoCapitalize="none" />

                    <ButtonComponent handleNext={handleSignIn} label={t(STRINGS.SIGN_IN)} />

                    <View style={styles.signUpContainer}>
                        <Text style={styles.signUpText}>{t(STRINGS.NOT_A_MEMBER_YET)}</Text>
                        <TouchableOpacity onPress={handleSignUp}>
                            <Text style={styles.signUpLink}>{t(STRINGS.SIGN_UP)}</Text>
                        </TouchableOpacity>
                    </View>

                    {__DEV__ && <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                        <Text style={styles.skipButtonText}>{t(STRINGS.CONTINUE_WITHOUT_SIGNING_IN)}</Text>
                    </TouchableOpacity>}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default SignInScreen;