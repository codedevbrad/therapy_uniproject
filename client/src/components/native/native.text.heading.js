import { Text } from 'react-native';
import { useEffect , useState } from 'react';


export default function NativeTextHeading ( { size = 'md' , color = 'white' , children , styling } ) {

        const [fontsize, setsize] = useState(0);

        function determineSize ( sizeInput ) {
            switch( sizeInput ) {
                case 'md':
                    setsize(25);
                    return;
                case 'lg':
                    setsize(29);
                    return;
                case 'xl':
                    setsize(32);
                    return;
            }
        }

        useEffect( ( ) => {
            determineSize( size );
        }, [] );

        return (
            <Text style={[ { fontWeight: 'bold' , fontSize: fontsize , color } , styling ]}>
                    { children }
            </Text>
        )
}