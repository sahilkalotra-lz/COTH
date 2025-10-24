import { useState, useEffect } from 'react';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';
import useAppConfig from './useAppConfig';
import { IS_IOS, STRINGS } from '../utils/constants';
import { fetchQueryApi } from '../services/api/api';
import { useAppNavigation } from './useAppNavigation';

export const useSignUpForm = () => {
    const { t } = useTranslation();
    const navigation = useAppNavigation();

    const { getApplicationUrls } = useAppConfig();

    const [deviceId, setDeviceId] = useState('');
    const [form, setForm] = useState({
        firstName: 'Sam',
        lastName: 'Manikshaw',
        email: 'sammmy@yopmail.com',
        country: 'United States',
        gender: 'male',
        checked: true,
        countryCode: 'USA',
    });
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        DeviceInfo.getUniqueId().then((id) => setDeviceId(id || 'unknown'));
    }, []);

    const validate = () => {
        const errors: Record<string, string> = {};
        if (!form.firstName.trim()) errors.firstName = t(STRINGS.FIRST_NAME_REQUIRED);
        if (!form.lastName.trim()) errors.lastName = t(STRINGS.LAST_NAME_REQUIRED);
        if (!form.email.trim()) errors.email = t(STRINGS.EMAIL_REQUIRED);
        if (!form.country.trim()) errors.country = t(STRINGS.COUNTRY_REQUIRED);
        if (!form.gender.trim()) errors.gender = t(STRINGS.GENDER_REQUIRED);
        if (!form.checked) errors.terms = t(STRINGS.TERMS_REQUIRED);
        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSignUp = async () => {
        if (!validate()) {
            Toast.show({
                type: 'error',
                text1: t(STRINGS.ALL_FIELDS_REQUIRED),
            });
            return;
        }

        const urls = getApplicationUrls();
        const url = urls?.UrlEmailVerif?.replace(/\{email\}/g, form.email);
        if (!url) return;

        const result = await fetchQueryApi(url).catch(() => ({ data: null }));
        if (result.data) {
            Toast.show({ type: 'error', text1: t(STRINGS.EMAIL_ALREADY_EXISTS) });
            return;
        }

        const payload: any = {
            Gender: form.gender,
            FirstName: form.firstName,
            LastName: form.lastName,
            email: form.email,
            password: null,
            Code: '',
            NoEmail: form.checked,
            Country: form.countryCode,
            DeviceType: IS_IOS ? 'apple' : 'google',
            DeviceId: deviceId,
        };

        navigation.navigate('VerificationCode', payload);
    };

    return { form, setForm, fieldErrors, handleSignUp };
};
