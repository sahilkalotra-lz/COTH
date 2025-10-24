import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
export const useAppNavigation = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return navigation;
};