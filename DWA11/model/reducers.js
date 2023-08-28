export const reducer = (prev, action) => {
  const count = prev ? prev.count : 0;

  switch (action.type) {
    case "ADD":
      return { count: count + 1 };
    case "SUBTRACT":
      return { count: count - 1 };
    case "RESET":
      return { count: 0 };
  }
};
