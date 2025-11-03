import { FC } from "react";
import { Text } from "react-native";

type TableHeadProps = {
  label: string;
};

const TableHead: FC<TableHeadProps> = ({ label }) => {
  return (
    <Text
      className={
        "px-4 py-3 font-outfit-medium text-gray-500 text-start text-xs dark:text-gray-400 w-1/3"
      }
    >
      {label}
    </Text>
  );
};

export default TableHead;
