import React, { useState } from "react";
import { Flex, Grid, Switch, Table, Tag, Transfer } from "antd";
import type {
  GetProp,
  TableColumnsType,
  TableProps,
  TransferProps,
} from "antd";
import {
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Modal,
  ModalDialog,
  Sheet,
} from "@mui/joy";
import { Button } from "@mui/joy";
import { Button as MuiButton } from "@mui/material";
import { WarningRounded } from "@mui/icons-material";

type TransferItem = GetProp<TransferProps, "dataSource">[number];
type TableRowSelection<T extends object> = TableProps<T>["rowSelection"];

interface DataType {
  key: string;
  title: string;
  description: string;
  tag: string;
}

interface TableTransferProps extends TransferProps<TransferItem> {
  dataSource: DataType[];
  leftColumns: TableColumnsType<DataType>;
  rightColumns: TableColumnsType<DataType>;
}

// Customize Table Transfer
const TableTransfer: React.FC<TableTransferProps> = (props) => {
  const { leftColumns, rightColumns, ...restProps } = props;

  return (
    <Transfer style={{ width: "100%" }} {...restProps}>
      {({
        direction,
        filteredItems,
        onItemSelect,
        onItemSelectAll,
        selectedKeys: listSelectedKeys,
        disabled: listDisabled,
      }) => {
        const columns = direction === "left" ? leftColumns : rightColumns;
        const rowSelection: TableRowSelection<TransferItem> = {
          getCheckboxProps: () => ({ disabled: listDisabled }),
          onChange(selectedRowKeys) {
            onItemSelectAll(selectedRowKeys, "replace");
          },
          selectedRowKeys: listSelectedKeys,
          selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
          ],
        };

        return (
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filteredItems}
            size="small"
            style={{ pointerEvents: listDisabled ? "none" : undefined }}
            onRow={({ key, disabled: itemDisabled }) => ({
              onClick: () => {
                if (itemDisabled || listDisabled) {
                  return;
                }
                onItemSelect(key, !listSelectedKeys.includes(key));
              },
            })}
          />
        );
      }}
    </Transfer>
  );
};

const mockData = [
  {
    key: "app001",
    title: "IT Program Application Form",
    description: "Collects personal details and academic history.",
    tag: "application",
  },
  {
    key: "ltr002",
    title: "Admission Offer Letter",
    description: "Official notice of your acceptance and start date.",
    tag: "offer",
  },
  {
    key: "fee003",
    title: "Fee Structure Breakdown",
    description: "Itemizes all tuition and related charges.",
    tag: "financial",
  },
  {
    key: "sch004",
    title: "Entrance Exam Schedule",
    description: "Dates and formats for your assessment.",
    tag: "assessment",
  },
  {
    key: "req005",
    title: "Transcript & Recommendation Request",
    description: "Requests academic records and endorsements.",
    tag: "documentation",
  },
  {
    key: "hlth006",
    title: "Health & Immunization Declaration",
    description: "Declares medical history and required shots.",
    tag: "health",
  },
  {
    key: "agr007",
    title: "Student Agreement & Code of Conduct",
    description: "Outlines campus rules and integrity policy.",
    tag: "agreement",
  },
  {
    key: "ori008",
    title: "Orientation Checklist",
    description: "Steps to onboard: setup, sessions, and resources.",
    tag: "onboarding",
  },
];

const columns: TableColumnsType<DataType> = [
  {
    dataIndex: "title",
    title: "Name",
  },
  {
    dataIndex: "tag",
    title: "Tag",
    render: (tag: string) => (
      <Tag style={{ marginInlineEnd: 0 }} color="cyan">
        {tag.toUpperCase()}
      </Tag>
    ),
  },
  {
    dataIndex: "description",
    title: "Description",
  },
];

const filterOption = (input: string, item: DataType) =>
  item.title?.includes(input) || item.tag?.includes(input);

export default function AdmissionForms() {
  const [targetKeys, setTargetKeys] = useState<TransferProps["targetKeys"]>([]);
  const [disabled, setDisabled] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const onChange: TableTransferProps["onChange"] = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  const toggleDisabled = (checked: boolean) => {
    setDisabled(checked);
  };

  const handleDownloadButton = () => {
    if (targetKeys?.length === 0) {
      setOpen(true);
    }
  };

  const downRowSelection: TableRowSelection<TransferItem> = {
    getCheckboxProps: () => ({ disabled }),
    // onChange(selectedRowKeys) {
    // onItemSelectAll(selectedRowKeys, "replace");
    // },
    // selectedRowKeys: listSelectedKeys,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };
  return (
    <Flex align="start" gap="middle" vertical>
      <Box
        display={{
          md: "flex",
          sm: "none",
          xs: "none",
        }}
      >
        <TableTransfer
          dataSource={mockData}
          targetKeys={targetKeys}
          disabled={disabled}
          showSearch
          showSelectAll={false}
          onChange={onChange}
          filterOption={filterOption}
          leftColumns={columns}
          rightColumns={columns}
        />
      </Box>
      <Box
        width={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        display={{
          md: "none",
          sm: "flex",
          xs: "flex",
        }}
      >
        <Table
          rowSelection={downRowSelection}
          columns={columns}
          dataSource={mockData}
          size="small"
          // style={{ pointerEvents: listDisabled ? "none" : undefined }}
          // onRow={({ key, disabled: itemDisabled }) => ({
          // onClick: () => {
          // if (itemDisabled || listDisabled) {
          // return;
          // }
          // onItemSelect(key, !listSelectedKeys.includes(key));
          // },
          // })}
        />
      </Box>

      <Box
        width={"100%"}
        mt={"20px"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Switch
          unCheckedChildren="transfer disabled"
          checkedChildren="transfer disabled"
          checked={disabled}
          onChange={toggleDisabled}
        />
        <MuiButton
          onClick={handleDownloadButton}
          disabled={disabled}
          variant="contained"
          color="primary"
        >
          Download Selected
        </MuiButton>
      </Box>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRounded />
            Error Downloading
          </DialogTitle>
          <Divider />
          <DialogContent>
            Unable to download from empty right list. please select atleast one
            form before downloading.
          </DialogContent>
          <DialogActions>
            <Button
              variant="solid"
              color="danger"
              onClick={() => setOpen(false)}
            >
              Cancel and Reselct
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </Flex>
  );
}
