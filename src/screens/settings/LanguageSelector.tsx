import React, { useMemo } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    StyleSheet,
} from 'react-native';
import { useLocalization } from '../../hooks/useLocalization';
import { LanguageConfig } from '../../services/localization/localization-service';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderComponent from '../../components/common/HeaderComponent';
import { useTranslation } from 'react-i18next';
import { fontFamily, fontSizes, Theme } from '../../themes';
import { useTheme } from '../../hooks/useTheme';
import { colors } from '../../themes/colors';

export const LanguageSelector: React.FC = () => {
    const { theme } = useTheme();
    const styles = useMemo(() => createStyles(theme), []);
    const { t } = useTranslation();
    const {
        currentLanguage,
        getAvailableLanguages,
        switchLanguage,
        isLoading,
    } = useLocalization();


    const availableLanguages = getAvailableLanguages();

    const handleLanguageSelect = async (language: LanguageConfig) => {
        try {
            await switchLanguage(language.LangCode);
        } catch (error) {
            console.error('Failed to switch language:', error);
        }
    };

    const renderLanguageItem = ({ item }: { item: LanguageConfig }) => {
        const isSelected = item.LangCode === currentLanguage;

        return (
            <TouchableOpacity style={styles.languageItem}
                onPress={() => handleLanguageSelect(item)}
                disabled={isLoading}>
                <View style={styles.languageItemContent}>
                    <View style={styles.flagContainer}>
                        {item.IconUrl ? (
                            <Image source={{ uri: item.IconUrl }} style={styles.flagIcon} />
                        ) : (
                            <View style={styles.defaultFlag}>
                                <Text style={styles.defaultFlagText}>🌐</Text>
                            </View>
                        )}
                    </View>
                    <Text style={[styles.languageName, !isSelected && styles.unselectedLanguageName]}>
                        {item.LangName}
                    </Text>
                    <View style={styles.radioContainer}>
                        <View style={[styles.radioButton, isSelected && styles.radioButtonSelected]}>
                            <View style={[styles.radioButtonInner, isSelected && styles.radioButtonInnerSelected]} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent title={t("SelectLanguage")} />

            <FlatList
                data={availableLanguages}
                keyExtractor={(item) => item.LangCode}
                renderItem={renderLanguageItem}
                style={styles.languageList}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

const createStyles = (theme: Theme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        languageList: {
            flex: 1,
        },
        languageItem: {
            paddingVertical: 16,
            paddingHorizontal: 20,
        },
        languageItemContent: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        flagContainer: {
            width: 40,
            height: 40,
            marginRight: 16,
            justifyContent: 'center',
            alignItems: 'center',
        },
        flagIcon: {
            width: 40,
            height: 40,
            borderRadius: 20,
        },
        defaultFlag: {
            width: 40,
            height: 40,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
        },
        defaultFlagText: {
            fontSize: 20,
        },
        languageName: {
            fontSize: fontSizes.medium.md,
            color: theme.colors.text,
            flex: 1,
            fontFamily: fontFamily.regular,
        },
        unselectedLanguageName: {
            color: '#999',
        },
        radioContainer: {
            marginLeft: 16,
        },
        radioButton: {
            width: 17,
            height: 17,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: colors.BGray,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.colors.background,
        },
        radioButtonSelected: {
            borderColor: colors.blue,
        },
        radioButtonInner: {
            width: 9,
            height: 9,
            borderRadius: 5,
            backgroundColor: colors.BGray,
        },
        radioButtonInnerSelected: {
            backgroundColor: colors.blue,
        },
        loadingContainer: {
            marginLeft: 12,
        },
    })
};

export default LanguageSelector;