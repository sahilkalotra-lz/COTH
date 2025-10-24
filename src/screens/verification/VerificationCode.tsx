import React, { useState, useMemo, useRef, useEffect, memo } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Image,
    TextInput,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { AnyIfEmpty, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import HeaderComponent from '../../components/common/HeaderComponent';
import ButtonComponent from '../../components/common/ButtonComponent';
import { STRINGS } from '../../utils/constants';
import createStyles from './styles';
import images from '../../assets/images';
import { Theme } from '../../themes';
import useAppConfig from '../../hooks/useAppConfig';
import { sendOtpToEmail, verifyOtp } from '../../services/api/api';
import { generateOTP } from '../../utils/otp-generator';


interface Props {
    otpValues: string[];
    focusedIndex: number;
    onOtpChange: (value: string, index: number) => void;
    onOtpFocus: (index: number) => void;
    onOtpKeyPress: (key: string, index: number) => void;
    styles: any;
}

const OtpInputComponent = ({
    otpValues = [],
    focusedIndex = 0,
    onOtpChange = () => { },
    onOtpFocus = () => { },
    onOtpKeyPress = () => { },
    styles = {},
}: Props) => {
    const inputRefs = useRef<TextInput[]>([]);

    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, 4);
    }, []);

    // Focus the input when focusedIndex changes
    useEffect(() => {
        if (inputRefs.current[focusedIndex]) {
            inputRefs.current[focusedIndex].focus();
        }
    }, [focusedIndex]);

    // Find the first empty field to determine which fields should be accessible
    const firstEmptyIndex = otpValues.findIndex(value => value === '');

    return (
        <View style={styles.otpContainer}>
            {otpValues.map((value, index) => {
                const isAccessible = index <= firstEmptyIndex || firstEmptyIndex === -1;
                return (
                    <TextInput key={index} value={value}
                        ref={(ref) => { ref && (inputRefs.current[index] = ref) }}
                        style={[
                            styles.otpInput,
                            focusedIndex === index && styles.otpInputFocused,
                        ]}
                        onChangeText={(text) => { text.length <= 1 && onOtpChange(text, index) }}
                        onKeyPress={({ nativeEvent }) => onOtpKeyPress(nativeEvent.key, index)}
                        onFocus={() => onOtpFocus(index)} keyboardType="numeric"
                        maxLength={1} autoFocus={index === 0} selectTextOnFocus
                        textContentType="oneTimeCode" editable={isAccessible}
                        pointerEvents={isAccessible ? 'auto' : 'none'}
                    />
                );
            })}
        </View>
    );
};


const LogoComponent = ({ theme, styles }: { theme: Theme, styles: any }) => {
    return (
        <View style={styles.header}>
            <Image source={images.logo} style={styles.logo} tintColor={theme.colors.logo} resizeMode="contain" />
        </View>
    )
}

const VerificationCodeScreen: React.FC = ({ route }: any) => {
    const form = route.params;

    const { theme } = useTheme();
    const styles = useMemo(() => createStyles(theme), [theme]);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { t } = useTranslation();
    const { getApplicationUrls } = useAppConfig();
    const applicationUrls = getApplicationUrls();

    const [otpValues, setOtpValues] = useState(['', '', '', '']);
    const [focusedIndex, setFocusedIndex] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [emailOTP, setEmailOTP] = useState('');
    const [isResending, setIsResending] = useState(false);

    // Send OTP to email
    const sendOtp = async () => {
        try {
            const OTP = generateOTP();
            setEmailOTP(OTP);

            const data = {
                ...form,
                Code: OTP
            };

            const response = await sendOtpToEmail(
                applicationUrls?.UrlRegisterStep1 || '',
                data
            );

        } catch (err: any) {
            console.log('OTP Send Error:', err.response.data);
        }
    };

    // Resend OTP
    const handleResendOtp = async () => {
        setIsResending(true);
        try {
            await sendOtp();
        } catch (err) {
            console.log('Resend OTP Error:', err);
        } finally {
            setIsResending(false);
        }
    };

    // Send OTP on component mount
    useEffect(() => {
        sendOtp();
    }, []);

    const handleOtpChange = (value: string, index: number) => {
        setError('');
        const updated = [...otpValues];
        updated[index] = value;
        setOtpValues(updated);

        if (value && index < 3) setTimeout(() => setFocusedIndex(index + 1), 100);
    };

    const handleOtpKeyPress = (key: string, index: number) => {
        if (key === 'Backspace' && !otpValues[index] && index > 0) setFocusedIndex(index - 1);
    };

    const handleOtpFocus = (index: number) => {
        const firstEmptyIndex = otpValues.findIndex(value => value === '');

        if (index <= firstEmptyIndex || firstEmptyIndex === -1) setFocusedIndex(index);
        else setFocusedIndex(firstEmptyIndex);
    };

    const handleSubmit = async () => {
        const code = otpValues.join('');
        if (!/^\d{4}$/.test(code)) {
            setError(STRINGS.ENTER_VALID_OTP);
            return;
        }

        if (code !== emailOTP) {
            setError(STRINGS.ENTER_VALID_OTP);
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            const data = {
                ...form,
                Code: code
            };

            const response = await verifyOtp(
                applicationUrls?.UrlRegisterStep2 || '',
                JSON.stringify(data)
            );

            if (response && response.status === 200) {
                // Store user data and navigate to main screen
                Alert.alert(
                    t(STRINGS.SUCCESS),
                    t(STRINGS.LOGIN_SUCCESS),
                    [{
                        text: t(STRINGS.OK),
                        onPress: () => navigation.navigate('Main' as never)
                    }]
                );
            } else if (response && response.status === 204) {
                Alert.alert(
                    t(STRINGS.NOT_MATCH),
                    t(STRINGS.INVALID_EMAIL_AND_PASS),
                    [{ text: t(STRINGS.OK) }]
                );
            }
        } catch (err) {
            console.log('OTP Verification Error:', err);
            Alert.alert(
                t(STRINGS.ERROR),
                t(STRINGS.INTERNAL_ERROR),
                [{ text: t(STRINGS.OK) }]
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.container} behavior={'padding'} >
                <HeaderComponent />
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <LogoComponent theme={theme} styles={styles} />
                    <View style={styles.contentContainer}>
                        <Text style={styles.title}>{t(STRINGS.VERIFICATION_CODE)}</Text>
                        <Text style={styles.subtitle}>
                            {t(STRINGS.VERIFICATION_CODE_DESCRIPTION)}
                        </Text>
                    </View>

                    <OtpInputComponent otpValues={otpValues} focusedIndex={focusedIndex}
                        onOtpChange={handleOtpChange} onOtpFocus={handleOtpFocus}
                        onOtpKeyPress={handleOtpKeyPress} styles={styles} />

                    {error ? <Text style={styles.errorText}>{t(error)}</Text> : null}

                    <ButtonComponent
                        handleNext={handleSubmit}
                        label={isSubmitting ? 'Verifying...' : t(STRINGS.SUBMIT)}
                    />

                    <View style={styles.signUpContainer}>
                        <Text style={styles.signUpText}>{t(STRINGS.NOT_RECEIVE_OTP)}</Text>
                        <TouchableOpacity onPress={handleResendOtp} disabled={isResending}>
                            <Text style={styles.signUpLink}>
                                {isResending ? t(STRINGS.PLEASE_WAIT) : t(STRINGS.RESEND)}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default VerificationCodeScreen;
