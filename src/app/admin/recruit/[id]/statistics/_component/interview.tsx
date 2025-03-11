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
  state: 'true' | 'false' | 'null';
  length: number;
  fill: string;
}

interface InterviewProps {
  forms: RecruitForm[];
}

export default function InterviewChart({ forms }: InterviewProps) {
  const data = useMemo(() => {
    return forms
      .filter((x) => x.paperPass)
      .reduce<DataType[]>((acc, form) => {
        const state = String(form.interviewPass) as 'true' | 'false' | 'null';
        const existing = acc.find((item) => item.state === state);

        if (existing) {
          existing.length += 1;
        } else {
          acc.push({ state, length: 1, fill: `var(--color-${state})` });
        }

        return acc;
      }, []);
  }, [forms]);

  const chartConfig = useMemo<ChartConfig>(
    () => ({
      true: {
        label: '합격',
        color: 'hsl(var(--chart-2))',
      },
      false: {
        label: '불합격',
        color: 'hsl(var(--chart-1))',
      },
      null: {
        label: '미정',
        color: 'hsl(var(--chart-3))',
      },
    }),
    [],
  );

  const length = useMemo(() => forms.filter((x) => x.paperPass).length, [forms]);

  return (
    <Card className="flex flex-col w-fit">
      <CardHeader>
        <CardTitle>면접 결과</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px]">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Pie data={data} dataKey="length" nameKey="state" innerRadius={60} strokeWidth={5}>
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
