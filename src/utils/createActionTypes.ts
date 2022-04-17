export default function createActionTypes(type: string) {
  return [`${type}`, `${type}/success`, `${type}/failure`];
}
