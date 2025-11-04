import { FC } from "react";
import { Appearance } from "react-native";

import Svg, { Path } from "react-native-svg";

type ArrowImageProps = {
  isLeft: boolean;
};

const ArrowImage: FC<ArrowImageProps> = ({ isLeft }) => {
  const colorScheme = Appearance.getColorScheme();
  let color = "#98A2B3";

  if (colorScheme === "light") {
    color = "#344054";
  }

  if (isLeft) {
    return (
      <Svg width="25" height="24" viewBox="0 0 25 24" fill="none">
        <Path
          stroke={color}
          d="M16.0068 6L9.75684 12.25L16.0068 18.5"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }

  return (
    <Svg width="25" height="24" viewBox="0 0 25 24" fill="none">
      <Path
        d="M9.50684 19L15.7568 12.75L9.50684 6.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ArrowImage;
