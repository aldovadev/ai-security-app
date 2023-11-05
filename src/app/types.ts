import type {
  CallbackImage,
} from "@innovatrics/dot-document-auto-capture";


export type OnPhotoTakenEventValue<T> = {
  imageData: CallbackImage<T>;
  content: Uint8Array
};
