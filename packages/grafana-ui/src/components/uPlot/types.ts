import React from 'react';
import uPlot, { Options, AlignedData, Series, Hooks } from 'uplot';
import { DataFrame, TimeRange, TimeZone } from '@grafana/data';
import { UPlotConfigBuilder } from './config/UPlotConfigBuilder';

export type PlotSeriesConfig = Pick<Options, 'series' | 'scales' | 'axes'>;
export type PlotPlugin = {
  id: string;
  /** can mutate provided opts as necessary */
  opts?: (self: uPlot, opts: Options) => void;
  hooks: Hooks.ArraysOrFuncs;
};

export interface PlotPluginProps {
  id: string;
}

export interface PlotProps {
  data: AlignedFrameWithGapTest;
  timeRange: TimeRange;
  timeZone: TimeZone;
  width: number;
  height: number;
  config: UPlotConfigBuilder;
  children?: React.ReactElement[];
  /** Callback performed when uPlot data is updated */
  onDataUpdate?: (data: AlignedData) => {};
  /** Callback performed when uPlot is (re)initialized */
  onPlotInit?: () => {};
}

export abstract class PlotConfigBuilder<P, T> {
  constructor(protected props: P) {}
  abstract getConfig(): T;
}

export interface AlignedFrameWithGapTest {
  frame: DataFrame;
  isGap: Series.isGap;
}
