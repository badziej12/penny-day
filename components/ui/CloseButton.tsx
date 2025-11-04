import { FC } from "react";
import { Appearance, Pressable } from "react-native";
import Svg, { Path } from "react-native-svg";

type CloseButtonProps = {
  onClose: () => void;
};

const CloseButton: FC<CloseButtonProps> = ({ onClose }) => {
  const colorScheme = Appearance.getColorScheme();
  let color = "#98A2B3";

  if (colorScheme === "light") {
    color = "#344054";
  }

  return (
    <Pressable
      className={
        "absolute right-0 top-0 z-999 flex flex-row h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-400"
      }
      onPress={onClose}
    >
      <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.04289 16.5413C5.65237 16.9318 5.65237 17.565 6.04289 17.9555C6.43342 18.346 7.06658 18.346 7.45711 17.9555L11.9987 13.4139L16.5408 17.956C16.9313 18.3466 17.5645 18.3466 17.955 17.956C18.3455 17.5655 18.3455 16.9323 17.955 16.5418L13.4129 11.9997L17.955 7.4576C18.3455 7.06707 18.3455 6.43391 17.955 6.04338C17.5645 5.65286 16.9313 5.65286 16.5408 6.04338L11.9987 10.5855L7.45711 6.0439C7.06658 5.65338 6.43342 5.65338 6.04289 6.0439C5.65237 6.43442 5.65237 7.06759 6.04289 7.45811L10.5845 11.9997L6.04289 16.5413Z"
          fill={color}
        ></Path>
      </Svg>
    </Pressable>
  );
};

export default CloseButton;
