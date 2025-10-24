import React, { memo } from 'react';
import { View, ScrollView, Text, TouchableOpacity, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { useNavigation } from '@react-navigation/native';
import TextInputComponent from '../../components/common/TextInputComponent';
import ButtonComponent from '../../components/common/ButtonComponent';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { STRINGS } from '../../utils/constants';
import createStyles from './styles';
import images from '../../assets/images';
import { useTranslation } from 'react-i18next';
import { useSignUpForm } from '../../hooks/useSignUpForm';
import HeaderComponent from '../../components/common/HeaderComponent';

const SignUpScreen = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation();
  const { form, setForm, fieldErrors, handleSignUp } = useSignUpForm();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
        <HeaderComponent />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <Image source={images.logo} style={styles.logo} resizeMode="contain" />
          </View>

          <Text style={styles.title}>{t(STRINGS.CREATE_YOUR_ACCOUNT)}</Text>
          <View style={styles.inputContainer}>
            <TextInputComponent
              label={t(STRINGS.FIRST_NAME)}
              value={form.firstName} placeholder={t(STRINGS.FIRST_NAME)}
              onChangeText={(text) => setForm((prev) => ({ ...prev, firstName: text }))}
              error={fieldErrors.firstName}
            />

            <TextInputComponent
              label={t(STRINGS.LAST_NAME)}
              value={form.lastName} placeholder={t(STRINGS.LAST_NAME)}
              onChangeText={(text) => setForm((prev) => ({ ...prev, lastName: text }))}
              error={fieldErrors.lastName}
            />

            <TextInputComponent
              label={t(STRINGS.EMAIL)}
              value={form.email} placeholder={t(STRINGS.EMAIL_PLACEHOLDER)}
              onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
              error={fieldErrors.email}
            />
            <View style={styles.countryPickerContainer}>
              <TextInputComponent
                label={t(STRINGS.COUNTRY)}
                value={form.country}
                type="country" placeholder={t(STRINGS.COUNTRY_PLACEHOLDER)}
                containerStyle={styles.inputWrapper}
                onCountrySelect={(text) => {
                  console.log('textCountry', text);
                  setForm((prev) => ({ ...prev, country: text.name, countryCode: text.cca2 }));
                }}
                error={fieldErrors.country} onChangeText={(text) => setForm((prev) => ({ ...prev, country: text }))} />

              <TextInputComponent
                label={t(STRINGS.GENDER)}
                value={form.gender} containerStyle={styles.inputWrapper}
                onChangeText={(text) => setForm((prev) => ({ ...prev, gender: text }))}
                type="dropdown"
                options={[{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }]}
                error={fieldErrors.gender}
              />
            </View>

            <View style={styles.checkboxContainer}>
              <TouchableOpacity onPress={() => setForm((prev) => ({ ...prev, checked: !prev.checked }))}>
                <FeatherIcon name={form.checked ? 'check-square' : 'square'} size={18} color={theme.colors.border} />
              </TouchableOpacity>
              <Text style={styles.checkboxText}>
                {t(STRINGS.I_AGREE_TO_THE_TERMS_AND_CONDITIONS)}
              </Text>
            </View>
          </View>

          <ButtonComponent handleNext={handleSignUp} label={t(STRINGS.SIGN_UP)} />

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>{t(STRINGS.ALREADY_HAVE_AN_ACCOUNT)}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn' as never)}>
              <Text style={styles.signUpLink}>{t(STRINGS.SIGN_IN)}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default memo(SignUpScreen);
