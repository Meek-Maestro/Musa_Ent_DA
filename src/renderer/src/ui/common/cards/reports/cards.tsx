import { Box, Divider, Paper, Text, useMantineTheme, Title } from '@mantine/core';
import { IconBaseProps } from 'react-icons';
import React from 'react';

function StatsCard({}: {}) {
    return (
        <Box>
            <Paper />
        </Box>
    );
}

function StatsCardVert({
    label,
    value,
    caption,
    //   Icon,
}: {
    value: string;
    label: string;
    caption?: string;
    //   Icon?: React.FC<IconBaseProps>;
}) {
    const theme = useMantineTheme();
    return (
        <Paper shadow="sm" py={`sm`}>
            <Box p={'md'}>
                {/* <Icon color="light" size={32} /> */}
                <Text size="sm">{label}</Text>
                <Title>{value}</Title>
            </Box>
        </Paper>
    );
}

function FancyStatCard() {
    return <Box></Box>;
}
StatsCard.FancyStatCard = FancyStatCard;

StatsCard.StatsCardVert = StatsCardVert;

export default StatsCard;
