export const formatSearchQuery = (val: string) =>
  val ? val.replace(/[\s\n\t]/g, '_') : undefined;
