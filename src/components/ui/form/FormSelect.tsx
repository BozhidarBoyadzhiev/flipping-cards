import { Props, StylesConfig, GroupBase } from 'react-select';
import Select from 'react-select';
import { createDropdownStyle, createMultiDropdownStyle } from '@/utils/selectStyle';

interface BaseFormSelectProps<Option> {
  label: string;
  optional?: boolean;
}

type FormSelectProps<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> = BaseFormSelectProps<Option> & {
  isMulti?: IsMulti;
  customStyles?: StylesConfig<Option, IsMulti, Group>;
  styles?: StylesConfig<Option, IsMulti, Group>;
} & Omit<Props<Option, IsMulti, Group>, 'className' | 'classNamePrefix'>;

export function FormSelect<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({ 
  label, 
  optional, 
  isMulti, 
  customStyles,
  styles,
  ...props 
}: FormSelectProps<Option, IsMulti, Group>) {
  const defaultStyles = isMulti
    ? createMultiDropdownStyle<Option, Group>()
    : createDropdownStyle<Option, Group>();

  const combinedStyles: StylesConfig<Option, IsMulti, Group> = 
    (styles || customStyles || defaultStyles) as StylesConfig<Option, IsMulti, Group>;

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-300 mb-2">
        {label} {optional && <span className="text-gray-500">(optional)</span>}
      </label>
      <Select<Option, IsMulti, Group>
        {...(props as Props<Option, IsMulti, Group>)}
        isMulti={isMulti as IsMulti}
        className="react-select-container"
        classNamePrefix="react-select"
        styles={combinedStyles}
      />
      {isMulti && props.value && Array.isArray(props.value) && props.value.length > 0 && (
        <p className="text-xs text-gray-400 mt-2">
          {props.value.length} item{props.value.length !== 1 ? 's' : ''} selected
        </p>
      )}
    </div>
  );
}