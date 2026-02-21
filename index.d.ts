declare module "vue-tinder" {
  import type {
    ComponentPublicInstance,
    ComponentOptionsMixin,
    DefineComponent,
    PublicProps,
  } from "vue";

  export type VueTinderDecision = "like" | "nope" | "super" | "down";

  export type VueTinderItem = object;

  export interface VueTinderSubmitPayload<
    TItem extends VueTinderItem = VueTinderItem,
  > {
    type: string;
    key: unknown;
    item: TItem;
  }

  export interface VueTinderProps {
    allowSuper?: boolean;
    allowDown?: boolean;
    queue?: VueTinderItem[];
    keyName?: string;
    pointerThreshold?: number;
    superThreshold?: number;
    downThreshold?: number;
    sync?: boolean;
    max?: number;
    scaleStep?: number;
    offsetY?: number;
    offsetUnit?: string;
    disableTouch?: boolean;
  }

  type VueTinderEmits = {
    "update:queue": (queue: VueTinderItem[]) => void;
    submit: (payload: VueTinderSubmitPayload) => void;
  };

  interface VueTinderMethods {
    decide(type: string): void;
    rewind(list: VueTinderItem[]): void;
    getSize(): void;
    resetStatus(): void;
  }

  type VueTinderComponent = DefineComponent<
    VueTinderProps,
    object,
    object,
    object,
    VueTinderMethods,
    ComponentOptionsMixin,
    ComponentOptionsMixin,
    VueTinderEmits,
    string,
    PublicProps,
    Readonly<VueTinderProps>,
    object
  > & {
    new (): ComponentPublicInstance & VueTinderMethods;
  };

  const VueTinder: VueTinderComponent;

  export default VueTinder;
}
