export const debounce = (funct: CallableFunction, time: number) => {
  let timer: number;
  return function (event: unknown) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => funct(), time, event);
  };
};
