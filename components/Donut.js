import { View, Text, Animated, TextInput, StyleSheet } from 'react-native';
import Svg, {G, Circle} from 'react-native-svg';
import { useRef, useEffect, useState } from 'react';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedInput = Animated.createAnimatedComponent(TextInput);
const Donut = ({
    percentage = 50,
    radius = 40,
    strokeWidth = 20,
    duration = 500,
    color = 'tomato',
    delay = 500,
    textColor,
    max = 100,
}) => {

    const animatedValue = useRef(new Animated.Value(0)).current;
    const circleRef = useRef(null);
    const inputRef = useRef(null);
    const halfCircle = strokeWidth + radius;
    const circleCircumference = 2 * Math.PI * radius;

    const animation = (toValue) => {
        return Animated.timing(animatedValue, {
            toValue,
            duration,
            delay,
            useNativeDriver: true,
        })//.start();
        .start(() => {
            animation(toValue === 0 ? percentage : 0);
        });
    }

    useEffect( () => {
        animation(percentage);

        animatedValue.addListener(v => {
            if(circleRef?.current) {
                const maxPercentage = (100 * v.value) / max;
                const strokeDashoffset = circleCircumference - (circleCircumference * maxPercentage) / 100;
                circleRef.current.setNativeProps({
                    strokeDashoffset,
                })
            }

            if(inputRef?.current) {
                inputRef.current.setNativeProps({
                    text: `${Math.round(v.value)}`
                })
            }
        });

        return () => {
            animatedValue.removeAllListeners();
        }
    }, [max, percentage])

    return (
        <View>
            <Svg 
                width={ radius * 2}
                height={ radius * 2}
                viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
            >
                <G rotation='-90' origin={`${halfCircle}, ${halfCircle}`}>
                    <Circle 
                        cx='50%'
                        cy='50%'
                        stroke={color}
                        strokeWidth={strokeWidth}
                        fill='transparent'
                        r={radius}
                        strokeOpacity={0.2}
                    />
                    <AnimatedCircle
                        ref={circleRef}
                        cx='50%'
                        cy='50%'
                        stroke={color}
                        strokeWidth={strokeWidth}
                        fill='transparent'
                        r={radius}
                        strokeDasharray={circleCircumference}
                        strokeDashoffset={circleCircumference}
                        strokeLinecap="round"
                    />
                </G>
            </Svg>
            <AnimatedInput
                ref={inputRef}
                defaultValue="0"
                underlineColorAndroid="transparent"
                editable={false}
                style={[
                    StyleSheet.absoluteFillObject,
                    { fontSize: radius / 2, color: textColor ?? color},
                    { fontWeight: 'bold', textAlign: 'center'}
                ]}
            />
        </View>
    )
}

export default Donut;