import { Text } from 'react-native';
import { useEffect , useState } from 'react';


export default function NativeTextParagraph ( { size = 'sm' , color = 'white' , children , styling } ) {

        const [fontsize, setsize] = useState(0);

        function determineSize ( sizeInput ) {
            switch( sizeInput ) {
                case 'sm':
                    setsize(18);
                    return;
                case 'md':
                    setsize(20);
                    return;
                case 'lg':
                    setsize(23);
                    return;
            }
        }

        useEffect( ( ) => {
            determineSize( size );
        }, [] );

        return (
            <Text style={ { fontWeight: '400', fontSize: fontsize , color , ...styling }}>
                    { children }
            </Text>
        )
}