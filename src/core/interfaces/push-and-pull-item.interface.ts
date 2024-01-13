export interface PushAndPullItemInterface<T extends { _id: string }> {
  data: T;
  isSelected: boolean;
}
