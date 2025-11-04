import { FC, ReactNode } from "react";
import { Modal, Pressable, Text, View } from "react-native";

type RNModalProps = {
  children: ReactNode;
  visible: boolean;
  onClose?: () => void;
  onAccept?: () => void;
};

const RNModal: FC<RNModalProps> = ({
  children,
  visible,
  onClose,
  onAccept,
}) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View
        className={
          "fixed inset-0 flex items-center justify-center h-screen z-50"
        }
      >
        <Pressable
          className={
            "fixed inset-0 h-full w-full bg-gray-400/50 backdrop-blur-[32px]"
          }
          onPress={onClose}
        />
        <View className={"p-4 absolute w-full"}>
          <View
            className={
              "rounded-3xl bg-white  dark:bg-gray-900  max-w-[507px] p-6"
            }
          >
            <View>
              {children}
              <View className="flex flex-row items-center justify-center w-full gap-3 mt-8">
                <Pressable
                  onPress={onClose}
                  className="inline-flex items-center justify-center rounded-lg px-4 py-3 bg-white dark:bg-gray-800"
                >
                  <Text className=" dark:text-gray-400 text-gray-700 text-sm font-outfit">
                    Zamknij
                  </Text>
                </Pressable>
                <Pressable
                  onPress={onAccept}
                  className="inline-flex items-center justify-center rounded-lg px-4 py-3 bg-blue-600"
                >
                  <Text className="text-white text-sm font-outfit">
                    Zapisz zmiany
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RNModal;
