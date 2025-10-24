import { ImageSourcePropType } from "react-native";

export interface OnboardingSlide {
    id: string;
    title: string;
    description: string;
    image?: ImageSourcePropType;
}