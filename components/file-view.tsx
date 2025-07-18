"use client";

import File from "@/utils/gpx/File";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";
import { TrackPoint } from "@/utils/gpx/Track";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

const xAxisOptions: {
    [key: string]: {
        formatter: (value: string) => string,
    },
} = {
    time: {
        formatter: (value: string) => {
            const date = new Date(value);
            return date.toLocaleTimeString("fr-FR");
        },
    },
    distance: {
        formatter: (value: string) => `${parseInt(value).toFixed(0)} km`,
    }
};

const yAxisOptions: {
    [key: string]: {
        label: string,
        color: string,
        formatter: (value: string) => string,
    }
} = {
    ele: {
        label: "Altitude",
        color: "var(--primary)",
        formatter: (value: string) => `${value} m`,
    }
};

export const FileView = ({
    file,
}: {
    file: File,
}) => {
    const [xAxis, setXAxis] = useState<string>("time");
    const [yAxes, setYAxes] = useState<string[]>(["ele"]);
    const [points, setPoints] = useState<TrackPoint[]>([]);

    useEffect(() => {
        setPoints(file.trk !== undefined && file.trk.length > 0
            ? file.trk[0].points
            : []
        );
    }, [file]);

    useEffect(() => console.log(yAxes), [yAxes]);

    return <>
        <Select value={xAxis} onValueChange={setXAxis}>
            <SelectTrigger>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="time">Temps</SelectItem>
                <SelectItem value="distance">Distance</SelectItem>
            </SelectContent>
        </Select>
        {Object.entries(yAxisOptions).map(([yAxisKey, yAxisInfo], index) => (
            <Label key={index}>
                <Checkbox
                    checked={yAxes.includes(yAxisKey)}
                    onCheckedChange={(checked) => {
                        if (checked === true) {
                            setYAxes(yAxes.concat([yAxisKey]));
                        }
                        else {
                            const yAxesCopy = yAxes;
                            yAxesCopy.splice(yAxes.indexOf(yAxisKey), 1);
                            console.log(yAxesCopy);
                            setYAxes(yAxesCopy);
                        }
                    }}
                />
                {yAxisInfo.label}
            </Label>
        ))}
        <ChartContainer
            config={yAxisOptions}
            className="aspect-auto h-[250px] w-full"
        >
            <LineChart
                accessibilityLayer
                data={points}
                margin={{
                    left: 12,
                    right: 12,
                }}
            >
                <CartesianGrid vertical={false} />
                <ChartTooltip
                    content={<ChartTooltipContent labelFormatter={xAxisOptions[xAxis]?.formatter} />}
                />
                <XAxis
                    dataKey={xAxis}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={32}
                    tickFormatter={xAxisOptions[xAxis]?.formatter}
                />
                {yAxes.map((yAxisKey, index) => (
                    <YAxis
                        key={index}
                        dataKey={yAxisKey}
                        tickFormatter={yAxisOptions[yAxisKey].formatter}
                    />
                ))}
                {yAxes.map((yAxisKey, index) => (
                    <Line
                        key={index}
                        dataKey={yAxisKey}
                        type="monotone"
                        stroke={yAxisOptions[yAxisKey].color}
                        strokeWidth={2}
                        dot={false}
                    />
                ))}
            </LineChart>
        </ChartContainer>
    </>;
};