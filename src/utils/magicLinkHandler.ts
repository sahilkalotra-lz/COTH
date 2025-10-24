// import DeviceInfo from 'react-native-device-info';
// import Toast from 'react-native-toast-message';
import { Appearance } from 'react-native';
import { AppDispatch } from '../store';
import { setUser, setToken, setMagicLinkLoginLoading, SetUserData, clearAuth } from '../store/slices/authSlice';
import { setFontSize, setLanguage, setEditSectionCustomizationList, ChangeFontSize, setApperenceIndex, setLightTheame, setLangImage } from '../store/slices/settingsSlice';

// Import your existing API functions
import { loginUser, getUserProfile } from '../services/api/api';

export const handleMagicLinkLogin = async (
  MagicLinkTokenId: string,
  dispatch: AppDispatch,
  navigation: any,
  langData: any,
  authUrl: string,
  profileUrl: string
) => {
  try {
    if (!MagicLinkTokenId) return;
    
    dispatch(setMagicLinkLoginLoading(true));

    // Use your existing API functions with the URLs you provide
    const response = await loginUser(authUrl, { token: MagicLinkTokenId });
    
    // Store the token in Redux
    dispatch(setToken(response.data?.TokenId));
    
    const profileRes = await getUserProfile(profileUrl);

    const profileData = JSON.parse(profileRes?.data?.ExtendedData);
    if (!profileData) throw new Error('Invalid profile data');

    // Redux setup
    if (profileData.EditSectionCustomizationList?.length) {
      dispatch(setEditSectionCustomizationList(profileData.EditSectionCustomizationList));
    }
    dispatch(ChangeFontSize((profileData?.ArticleFontSize - 10) / 2));

    const appearance = profileData?.Appearance;
    const apperenceIndex = [1, 2, 3].includes(appearance) ? appearance : 1;
    const isLightTheme = appearance === 2 || Appearance.getColorScheme() !== 'dark';

    dispatch(setApperenceIndex(apperenceIndex));
    dispatch(setLightTheame(isLightTheme));
    dispatch(setLanguage(profileData?.AppLanguage));
    dispatch(setLangImage(profileData?.AppLanguage));

    // Store complete user data in Redux
    const completeUserData = {
      ...profileRes.data,
      TokenId: response.data?.TokenId
    };
    
    dispatch(SetUserData(JSON.stringify(completeUserData)));

    console.log('Magic link login successful');
    // Toast.show({
    //   type: 'success',
    //   text1: langData?.Success || 'Success',
    //   text2: langData?.LoginSuccess || 'Login Success',
    //   visibilityTime: 3000,
    // });

    navigation.replace('Main');
  } catch (err) {
    console.error('Magic link login error:', err);
    // Toast.show({
    //   type: 'error',
    //   text1: langData?.MaginLinkExpire || 'Magic Link Expired',
    //   text2: langData?.MaginLinkExpireMessage || 'The magic link has expired or is invalid',
    //   visibilityTime: 3000,
    // });
    // Clear user data from Redux
    dispatch(clearAuth());
  } finally {
    dispatch(setMagicLinkLoginLoading(false));
  }
};
