import { observer } from "mobx-react";
import { Checkbox, Table, ScrollArea, Box, Stack, Text, Group } from "@mantine/core";
import classes from "./table.module.css";

export const StoreOverview =  observer(()=>{
  const data = [
    {
     Name:"Maestro",
     role:"Admin"
    },
  ];

  return (
   <Box mt={`xl`}>
    <Group>
      <Text fw={600} size="xl">Store A Overview</Text>
    </Group>
     <ScrollArea>
      <Table
        striped
        highlightOnHover
        mt="lg"
        className={classes.table}
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>
              <Checkbox />
            </Table.Th>
            {Object.keys(data[0]).map((key) => (
              <Table.Th key={key}>
                {key.replace(/([A-Z])/g, " $1").trim()}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((item, index) => (
            <Table.Tr key={index} className={classes.rowSpacing}>
              <Table.Td>
                <Checkbox />
              </Table.Td>
              {Object.values(item).map((value, i) => (
                <Table.Td key={i} className={classes.cellSpacing}>
                  {value}
                </Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </ScrollArea>
   </Box>
  );
})
