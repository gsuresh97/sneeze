import Gallery from 'react-native-photo-gallery';

class Gallery extends React.Component {
    render() {
        const data = [
            {
                id: 'first image',
                image: require('./yourImage.jpg'),
                thumb: require('./yourImageThumb.jpg'),
                overlay: <Overlay />
    },
        {
            id: 'Second image',
                image: require('./yourImage2.jpg'),
            thumb: require('./yourImageThumb2.jpg'),
            overlay: <OtherOverlay />
        }
    ];

        return <Gallery data={data} />;
    }