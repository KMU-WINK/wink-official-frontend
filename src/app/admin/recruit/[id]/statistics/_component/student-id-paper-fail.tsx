import { useMemo } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/ui/chart';

import RecruitForm from '@/api/type/schema/recruit-form';

import { Label, Pie, PieChart } from 'recharts';

interface DataType {
  studentId: string;
  length: number;
  fill: string;
}

interface StudentIdPaperFailProps {
  forms: RecruitForm[];
}

export default function StudentIdPaperFailChart({ forms }: StudentIdPaperFailProps) {
  const data = useMemo(() => {
    return forms
      .filter((x) => !x.paperPass)
      .reduce<DataType[]>((acc, form) => {
        const studentId = form.studentId.substring(2, 4);
        const existing = acc.find((item) => item.studentId === studentId);

        if (existing) {
          existing.length += 1;
        } else {
          acc.push({ studentId, length: 1, fill: `var(--color-${studentId})` });
        }

        return acc;
      }, []);
  }, [forms]);

  const chartConfig = useMemo<ChartConfig>(() => {
    return forms
      .filter((x) => !x.paperPass)
      .reduce<ChartConfig>((acc, form) => {
        const prefix = form.studentId.substring(2, 4);

        if (!acc[prefix]) {
          acc[prefix] = {
            label: `${prefix}학번`,
            color: `hsl(var(--chart-${Object.keys(acc).length + 1}))`,
          };
        }

        return acc;
      }, {} as ChartConfig);
  }, [forms]);

  const length = useMemo(() => forms.filter((x) => !x.paperPass).length, [forms]);

  return (
    <Card className="flex flex-col w-fit">
      <CardHeader>
        <CardTitle>불합격</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px]">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Pie data={data} dataKey="length" nameKey="studentId" innerRadius={60} strokeWidth={5}>
              <Label
                content={({ viewBox }) => {
                  if (!(viewBox && 'cx' in viewBox && 'cy' in viewBox)) {
                    return null;
                  }
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {length.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        명
                      </tspan>
                    </text>
                  );
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
