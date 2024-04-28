import type {
	CascaderProps,
	DatePickerProps,
	InputProps,
	RadioGroupProps,
	SelectProps,
} from 'antd';
import type { CheckboxGroupProps, CheckboxOptionType } from 'antd/lib/checkbox';
import type { RangePickerProps } from 'antd/lib/date-picker';
import type { FormItemProps } from 'antd/lib/form';
import type React from 'react';

type CommonType = FormItemProps;

type FiledCascaderType = {
	itemType: 'cascader';
	options: any;
	fieldProps?: CascaderProps;
	placeholder?: string;
} & CommonType;

type FiledSelectType = {
	itemType: 'select';
	options: any;
	fieldProps?: SelectProps;
	placeholder?: string;
} & CommonType;

type FiledInputType = {
	itemType: 'input';
	fieldProps?: InputProps;
	placeholder?: string;
} & CommonType;

type FiledRadioType = {
	itemType: 'radio';
	options: CheckboxOptionType[];
	fieldProps?: RadioGroupProps;
} & CommonType;

type FiledCheckBoxType = {
	itemType: 'checkbox';
	options: CheckboxOptionType[];
	fieldProps?: CheckboxGroupProps;
} & CommonType;

type FiledDatePickerType = {
	itemType: 'datePicker';
	fieldProps?: DatePickerProps;
	placeholder?: string;
} & CommonType;

type FiledRangePickerType = {
	itemType: 'rangePicker';
	fieldProps?: RangePickerProps;
} & CommonType;

type FiledCustomType = {
	itemType: 'custom';
	render?: React.ReactNode;
	fieldProps?: any;
} & CommonType;

type FiledHiddenType = {
	itemType: 'hidden';
	noStyle: boolean;
	fieldProps?: InputProps;
} & CommonType;

export type SearchOption =
	| FiledCascaderType
	| FiledSelectType
	| FiledInputType
	| FiledRadioType
	| FiledCheckBoxType
	| FiledDatePickerType
	| FiledRangePickerType
	| FiledHiddenType
	| FiledCustomType;
