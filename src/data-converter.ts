import { DataConverter } from '@temporalio/common';
import { Base64Codec } from './base64-codec';

let dataConverterPromise: Promise<DataConverter>;

export async function getDataConverter(): Promise<DataConverter> {
  if (!dataConverterPromise) {
    dataConverterPromise = createDataConverter();
  }
  return await dataConverterPromise;
}

async function createDataConverter(): Promise<DataConverter> {
  return {
    payloadCodecs: [await Base64Codec.create()],
  };
}
