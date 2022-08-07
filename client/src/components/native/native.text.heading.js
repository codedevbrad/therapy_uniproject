import { Text } from 'react-native';
import { useEffect , useState } from 'react';

export default function NativeTextHeading ( { size = 'md' , color = 'white' , children , styling } ) {

        const [fontsize, setsize] = useState(0);

        function determineSize ( sizeInput ) {
            switch( sizeInput ) {
                case 'sm':
                    setsize(18);
                    return;
                case 'md':
                    setsize(22);
                    return;
                case 'lg':
                    setsize(25);
                    return;
                case 'xl':
                    setsize(29);
                    return;
                default:
                    setsize(32)
            }
        }

        useEffect( ( ) => {
            determineSize( size );
        }, [ size ] );

        return (
            <Text style={[ { fontWeight: 'bold' , fontSize: fontsize , color } , styling ]}>
                    { children }
            </Text>
        )
}