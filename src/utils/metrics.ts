import { Dimensions } from "react-native";

const {width, height} = Dimensions.get('window');

const guidelineBaseWith = 375;
const guidelineBaseHeght = 812;

const horizontalScale = (size: number) => (width / guidelineBaseHeght) * size;

const verticalScale = (size: number) => (height / guidelineBaseWith) * size;

const moderateScale = (size: number, factor = 0.5) => size + (horizontalScale(size) - size) * factor;

export { horizontalScale, verticalScale, moderateScale };