import { FC, ReactNode } from "react";
import { Pressable } from "react-native";

type ButtonComponentProps = {
  onClick: () => void;
  children: ReactNode;
};

const ButtonComponent: FC<ButtonComponentProps> = ({ children, onClick }) => {
  return (
    <Pressable
      onPress={onClick}
      className={
        "flex-auto flex flex-row h-10 w-10 border-gray-200 dark:border-gray-800 border justify-center items-center rounded-lg py-2 px-3"
      }
    >
      {children}
    </Pressable>
  );
};

export default ButtonComponent;
