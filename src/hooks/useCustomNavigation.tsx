import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ParamListBase} from '@react-navigation/native';

function useCustomNavigation() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  return navigation;
}

export default useCustomNavigation;
