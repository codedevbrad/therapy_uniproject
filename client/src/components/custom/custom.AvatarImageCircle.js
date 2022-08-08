import { Image , View } from "react-native";

export default function NativeCustomAvatarImageCircle  ( { uri } ) {
    return (
    <View>
        <Image style={{ borderRadius: 25 , width: 50 , height: 50 } } source={{ uri }} />
     </View>   
    )
}