import { Box, Container, Group, Title, Divider, Text } from "@mantine/core";
import { observer } from "mobx-react";
import React, { ReactNode } from "react";

interface props{
    title:string;
    caption?:string;
    middle?:ReactNode
    right?:ReactNode
    children:ReactNode;
    tabs?:React.ReactNode
}


const AppPageWrapper:React.FC<props> = observer(({title, caption, right, children, middle})=>{
    return(
        <Box>
        <Container size={'100%'} py={'sm'}>
          <Box>
            <Group justify="space-between">
              <Title order={3}>{title}</Title>
              {middle}
              {right}
            </Group>
            {caption == undefined ? null : <Text c={'dimmed'}>{caption}</Text>}
          </Box>
        </Container>
        <Box py={'lg'} p={`md`}>{children}</Box>
      </Box>
    )
})

export default AppPageWrapper