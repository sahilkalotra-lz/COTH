import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native'
import React from 'react'
import BackButton from '../ui/BackButton'
import { useTheme } from '../../hooks/useTheme'
import { useNavigation } from '@react-navigation/native'
import { fontSizes } from '../../themes'

interface HeaderComponentProps {
    leftComponent?: React.ReactNode
    middleComponent?: React.ReactNode
    rightComponent?: React.ReactNode
    title?: string
    showBackButton?: boolean
    onBackPress?: () => void
    style?: ViewStyle
    titleStyle?: TextStyle
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({
    leftComponent,
    middleComponent,
    rightComponent,
    title,
    showBackButton = true,
    style,
    titleStyle,
    onBackPress
}) => {
    const { theme } = useTheme()
    const navigation = useNavigation()
    
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.sm,
            minHeight: 56,
        },
        leftSection: {
            flex: 1, 
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
        },
        middleSection: {
            flex: 3, 
            alignItems: 'center',
            justifyContent: 'center',
        },
        rightSection: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
        },
        title: {
            fontSize: fontSizes.medium.md,
            color: theme.colors.text,
            textAlign: 'center',
        },
    })
    const defaultBackPress = () => navigation.goBack()

    const renderLeftSection = () => {
        if (leftComponent) return leftComponent
        if (showBackButton) return <BackButton onPress={onBackPress || defaultBackPress} />
        return null
    }

    const renderMiddleSection = () => {
        if (middleComponent) return middleComponent
        if (title) return <Text style={[styles.title, titleStyle]}>{title}</Text>
        return null
    }

    return (
        <View style={[styles.container, style]}>
            <View style={styles.leftSection}>
                {renderLeftSection()}
            </View>

            <View style={styles.middleSection}>
                {renderMiddleSection()}
            </View>

            <View style={styles.rightSection}>
                {rightComponent}
            </View>
        </View>
    )
}

export default HeaderComponent