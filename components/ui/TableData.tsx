import { FC } from "react";
import { Text } from "react-native";

type TableHeadProps = {
  label: string;
};

const TableData: FC<TableHeadProps> = ({ label }) => {
  return (
    <Text
      className={
        "px-4 py-3 font-outfit-medium text-gray-800 text-start text-sm dark:text-white/90 w-1/3"
      }
    >
      {label}
    </Text>
  );
};

export default TableData;
