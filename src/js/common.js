const obj = {
  obj2: {
    nullValue: null,
  },
  emptyString: "",
  numberValue: 100
}

const value = obj.obj2?.nullValue ?? "renameValue";

console.log(value);