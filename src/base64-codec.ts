import { METADATA_ENCODING_KEY, Payload, PayloadCodec, ValueError } from '@temporalio/common';
import { temporal } from '@temporalio/proto';
import { decode, encode } from '@temporalio/common/lib/encoding';

const ENCODING = 'base64';

export class Base64Codec implements PayloadCodec {
  constructor() {}

  static async create(): Promise<Base64Codec> {
    return new this();
  }

  async encode(payloads: Payload[]): Promise<Payload[]> {
    return Promise.all(
      payloads.map(async (payload) => ({
        metadata: {
          [METADATA_ENCODING_KEY]: encode(ENCODING),
        },
        
        data: Buffer.from(temporal.api.common.v1.Payload.encode(payload).finish()),
      })),
    );
  }

  async decode(payloads: Payload[]): Promise<Payload[]> {
    return Promise.all(
      payloads.map(async (payload) => {
        if (!payload.metadata || decode(payload.metadata[METADATA_ENCODING_KEY]) !== ENCODING) {
          return payload;
        }
        if (!payload.data) {
          throw new ValueError('Payload data is missing');
        }

        return temporal.api.common.v1.Payload.decode(payload.data);
      }),
    );
  }
}