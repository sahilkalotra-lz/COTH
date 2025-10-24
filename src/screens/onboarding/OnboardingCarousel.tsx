import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Image,
    NativeSyntheticEvent,
    NativeScrollEvent,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

import { useTheme } from '../../hooks/useTheme';
import { setOnboardingCompleted } from '../../store/slices/appConfigSlice';
import HeaderComponent from '../../components/common/HeaderComponent';
import { fontFamily, fontSizes } from '../../themes/typography';
import { onboardingData, STRINGS } from '../../utils/constants';
import { OnboardingSlide } from '../../types/onboarding';
import { colors } from '../../themes/colors';
import ButtonComponent from '../../components/common/ButtonComponent';

const { width: screenWidth } = Dimensions.get('window');

const OnboardingCarousel: React.FC = () => {
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const { top, bottom } = useSafeAreaInsets();

    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollViewRef = useRef<ScrollView>(null);

    const handleNext = () => {
        if (currentIndex < onboardingData.length - 1) {
            scrollToIndex(currentIndex + 1);
        } else {
            handleCompleteOnboarding();
        }
    };

    const handleBack = () => {
        if (currentIndex > 0) scrollToIndex(currentIndex - 1);
    };

    const handleCompleteOnboarding = () => {
        dispatch(setOnboardingCompleted(true));
    };

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const newIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
        if (newIndex !== currentIndex) setCurrentIndex(newIndex);
    };

    const scrollToIndex = (index: number) => {
        scrollViewRef.current?.scrollTo({ x: index * screenWidth, animated: true });
        setCurrentIndex(index);
    };

    const renderSlide = (slide: OnboardingSlide) => (
        <View key={slide.id} style={styles.slide}>
            <Image source={slide.image} style={styles.image} resizeMode="contain" />
        </View>
    );

    const renderIndicators = () => (
        <View style={styles.indicators}>
            {onboardingData.map((_, index) => (
                <View key={index}
                    style={[styles.indicator,
                    {
                        backgroundColor: index === currentIndex ? '#8B5CF6' : '#D1D5DB',
                        width: index === currentIndex ? 20 : 4,
                    },
                    ]}
                />
            ))}
        </View>
    );

    const renderRightHeader = () => {
        if (currentIndex === onboardingData.length - 1) return null;
        return (
            <TouchableOpacity onPress={handleCompleteOnboarding} style={styles.skipButton}>
                <Text style={[styles.skipText]}>Skip</Text>
            </TouchableOpacity>
        )
    };

    return (
        <View style={[styles.container, { backgroundColor: '#F5F5F5', paddingTop: top }]}>
            <HeaderComponent showBackButton={currentIndex > 0} onBackPress={handleBack}
                rightComponent={renderRightHeader()} />

            {/* Slides */}
            <ScrollView ref={scrollViewRef} horizontal pagingEnabled
                showsHorizontalScrollIndicator={false} onScroll={handleScroll}
                scrollEventThrottle={16} bounces={false} >
                {onboardingData.map(renderSlide)}
            </ScrollView>

            {/* Bottom Content */}
            <View style={[styles.bottomSheet,
            { backgroundColor: theme.colors.background, paddingBottom: bottom / 2 }]} >
                {renderIndicators()}

                <View style={styles.textContent}>
                    <Text style={[styles.title, { color: theme.colors.text }]}>
                        {onboardingData[currentIndex].title}
                    </Text>
                    <Text style={[styles.description]}>
                        {onboardingData[currentIndex].description}
                    </Text>
                </View>

                <ButtonComponent handleNext={handleNext} label={STRINGS.NEXT} />
            </View>
        </View>
    );
};

export default OnboardingCarousel;

const styles = StyleSheet.create({
    container: { flex: 1 },
    slide: {
        width: screenWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%', height: '100%',
        borderRadius: 12,
    },
    bottomSheet: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 20, paddingHorizontal: 16,
    },
    indicators: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    indicator: {
        height: 4, borderRadius: 100,
        marginHorizontal: 4,
    },
    textContent: {
        alignItems: 'center',
        gap: 8, marginTop: 15
    },
    title: {
        fontSize: fontSizes.xlarge.xxxl,
        fontFamily: fontFamily.medium,
        textAlign: 'center',
    },
    description: {
        color: colors.lightGray,
        fontSize: fontSizes.medium.sm,
        fontFamily: fontFamily.light,
        textAlign: 'center',
    },
    skipButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    skipText: {
        color: colors.blue,
        fontFamily: fontFamily.regular,
        fontSize: fontSizes.medium.md,
    },
});
