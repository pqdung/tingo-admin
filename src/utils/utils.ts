export const onChange = (setValues: any, values: Object, event: any) => {
  const value = event.target.value;
  setValues({ ...values, [event.target.name]: value });
};

export const onChangeDate = (setValues: any, values: Object, fieldName: string, value: any) => {
  setValues({ ...values, [fieldName]: value });
};
