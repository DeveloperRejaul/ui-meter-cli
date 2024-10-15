import { FlatList, Image, View, useWindowDimensions, NativeSyntheticEvent, NativeScrollEvent, ViewStyle } from 'react-native';
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';

interface IData {
    id?: string;
    imgUrl: string
}

interface ICardCarousal {
    data: IData[];
    loop?: boolean;
    duration?: number;
    play?: boolean;
    onStart?: (value: boolean) => void;
    onEnd?: (value: boolean) => void;
    onChange?: (index: number) => void;
    height?: number;
    width?: number;
    nextBtn?: React.ReactNode;
    prevuesBtn?: React.ReactNode
    dotActiveColor?: string;
    dotInactiveColor?: string;
    containerStyle?: ViewStyle
    dotStyle?: ViewStyle
    dotActiveStyle?: ViewStyle,
    dotInactiveStyle?: ViewStyle,
}

let interval: NodeJS.Timeout;
export default forwardRef((props: ICardCarousal, ref) => {
    const { width: WIDTH } = useWindowDimensions();
    const {
        data = [],
        loop = true,
        play = true,
        height = 200,
        width = WIDTH,
        onEnd,
        onStart,
        duration = 2000,
        onChange,
        nextBtn,
        prevuesBtn,
        dotActiveColor = 'green',
        dotInactiveColor = 'red',
        containerStyle,
        dotStyle,
        dotActiveStyle,
        dotInactiveStyle,
    } = props;
    const [activeIndex, setActiveIndex] = useState(0);
    const [start, setStart] = useState(play);
    const slider = useRef<FlatList>(null);

    useImperativeHandle(ref, () => ({
        scrollToIndex: (index: number) => {
            if (slider.current) {
                slider.current.scrollToIndex({ index, animated: true });
            }
        },
        next: () => {
            if (slider.current) {
                if (activeIndex === data.length - 1) {
                    slider.current.scrollToIndex({ index: 0, animated: true });
                } else {
                    slider.current.scrollToIndex({ index: activeIndex + 1, animated: true });
                }
            }
        },
        prevues: () => {
            if (slider.current) {
                if (activeIndex === 0) {
                    slider.current.scrollToIndex({ index: data.length - 1, animated: true });
                } else {
                    slider.current.scrollToIndex({ index: activeIndex - 1, animated: true });
                }
            }
        },
    }));

    useEffect(() => {
        if (play) {
            setStart(true);
        } else {
            setStart(false);
        }
    }, [play]);

    // off on control slider
    useEffect(() => {
        if (loop && start && data.length > 0) {
            interval = setInterval(() => {
                if (slider.current && activeIndex === data.length - 1) {
                    onEnd?.(true);
                    onChange?.(0);
                    slider.current.scrollToIndex({
                        index: 0,
                        animated: true,
                    });
                } else if (slider.current) {
                    if (activeIndex === 0) onStart?.(true);
                    onChange?.(activeIndex + 1);
                    slider.current.scrollToIndex({
                        index: activeIndex + 1,
                        animated: true,
                    });
                }
            }, duration);
        } else clearInterval(interval);
        return () => clearInterval(interval);
    });

    // for scrollToIndex
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getItemLayout = (_data: any, index: number) => ({
        length: width,
        offset: width * index,
        index,
    });

    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const currentIndex = Math.ceil(Number(scrollPosition / width));
        setActiveIndex(currentIndex);
    };

    //  dot indicator view
    const dotIndicator = () => data.map((_e, i) => <View key={Math.random()} style={[{ height: 10, width: 10, borderRadius: 100, backgroundColor: activeIndex === i ? dotActiveColor : dotInactiveColor, ...dotStyle }, activeIndex === i ? dotActiveStyle : dotInactiveStyle]} />);

    // handle key
    const keyExtractor = (item: IData, index: number) => item?.id || index.toString();

    const renderItem = ({ index, item }: { index: number, item: IData }) => (
        <Image key={index} style={{ width, height }} source={{ uri: item.imgUrl }} />
    );

    return (
        <View style={{ borderRadius: 10, overflow: 'hidden', ...containerStyle }}>
            <FlatList
                ref={slider}
                data={data}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                horizontal
                pagingEnabled
                onScroll={onScroll}
                getItemLayout={getItemLayout}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            />
            {nextBtn}
            {prevuesBtn}
            <View style={{ flexDirection: 'row', justifyContent: 'center', columnGap: 10, position: 'absolute', left: 0, right: 0, bottom: 10 }}>{dotIndicator()}</View>
        </View>
    );
});

