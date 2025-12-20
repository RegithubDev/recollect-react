// src/components/WasteGauge.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Path,
  Circle,
  G,
} from 'react-native-svg';

const WasteGauge = ({ value = 18138.34, maxValue = 50000 }) => {
  const size = 260;            // overall size
  const strokeWidth = 34;      // thickness of the arc
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const startAngle = -Math.PI; // left
  const endAngle = 0;          // right

  const clamp = Math.max(0, Math.min(value, maxValue));
  const percent = clamp / maxValue;
  const currentAngle = startAngle + (endAngle - startAngle) * percent;

  const polarToCartesian = (angle, r = radius) => ({
    x: center + r * Math.cos(angle),
    y: center + r * Math.sin(angle),
  });

  const makeArc = (fromAngle, toAngle) => {
    const start = polarToCartesian(fromAngle);
    const end = polarToCartesian(toAngle);
    const largeArcFlag = toAngle - fromAngle <= Math.PI ? 0 : 1;
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
  };

  const backgroundPath = makeArc(startAngle, endAngle);
  const valuePath = makeArc(startAngle, currentAngle);
  const indicatorPoint = polarToCartesian(currentAngle);

  const ticks = Array.from({ length: 11 }).map((_, i) => {
    const ang =
      startAngle + ((endAngle - startAngle) * i) / 10; // 0..10 ticks
    const inner = polarToCartesian(ang, radius - strokeWidth / 2 + 6);
    const outer = polarToCartesian(ang, radius + strokeWidth / 2 - 6);
    return { inner, outer, key: i };
  });

  return (
    <View style={styles.wrapper}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Defs>
          <LinearGradient
            id="gaugeGrad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <Stop offset="0%" stopColor="#323219" />
            <Stop offset="50%" stopColor="#869b52ff" />
            <Stop offset="100%" stopColor="#869b52ff" />
          </LinearGradient>
        </Defs>

        {/* Background arc */}
        <Path
          d={backgroundPath}
          stroke="#c0c0c0ff"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          opacity={0.85}
        />

        {/* Colored value arc */}
        <Path
          d={valuePath}
          stroke="url(#gaugeGrad)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
        />

        {/* Tick marks */}
        <G>
          {ticks.map(({ inner, outer, key }) => (
            <Path
              key={key}
              d={`M ${inner.x} ${inner.y} L ${outer.x} ${outer.y}`}
              stroke="#f1ff4e"
              strokeWidth={key === 0 || key === 10 ? 3 : 2}
              strokeLinecap="round"
              opacity={key === 0 || key === 10 ? 0.7 : 0.9}
            />
          ))}
        </G>

        {/* Circular indicator at end of arc */}
        <G>
          <Circle
            cx={indicatorPoint.x}
            cy={indicatorPoint.y}
            r={18}
            stroke="#f1ff4e"
            strokeWidth={3}
            fill="transparent"
          />
          <Circle
            cx={indicatorPoint.x}
            cy={indicatorPoint.y}
            r={12}
            stroke="#f1ff4e"
            strokeWidth={2}
            fill="transparent"
          />
          <Circle
            cx={indicatorPoint.x}
            cy={indicatorPoint.y}
            r={5}
            fill="#f1ff4e"
          />
        </G>
      </Svg>
    </View>
  );
};

export default WasteGauge;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
