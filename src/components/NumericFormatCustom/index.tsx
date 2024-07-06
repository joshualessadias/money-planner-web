import { NumericFormat } from "react-number-format";

export default function NumericFormatCustom(props: any) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      allowNegative={false}
      prefix="R$ "
      decimalScale={2}
      decimalSeparator=","
      thousandSeparator="."
    />
  );
}
