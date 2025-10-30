> ❗️ This is based off the encrpytion sample from the [Temporal Typescript samples](https://github.com/temporalio/samples-typescript/tree/main/encryption)

# Base64 Converter

Create a custom data converter that converts data to Base64. See [encryption docs](https://docs.temporal.io/security/#encryption).

## Code

- `EncryptionCodec`: [encryption-codec.ts](./src/base64-codec.ts)
- Data Converter: [data-converter.ts](./src/data-converter.ts)
- Codec Server: [codec-server.ts](./src/codec-server.ts)

  - Run the Codec Server with `npm run codec-server`, it will listen to port 8888.

  To view the decoded payloads in the web UI:

  - Click the `Configure data encoder` icon on the bottom left, and set `http://localhost:8888` as the `Remote Codec Endpoint`.
  - Or add this environment variable to the web UI server: `TEMPORAL_CODEC_ENDPOINT=http://localhost:8888`.

  To encrypt payloads with `tctl`, pass the following option:

  - `tctl --codec_endpoint 'http://localhost:8888' ...`

The Payload Converter is supplied to the [client.ts](./src/client.ts) and [worker.ts](./src/worker.ts). When the Client sends `'Alice: Private message for Bob.'` to the Workflow, it gets encoded on the Client and decoded in the Worker. [`workflow.ts`](./src/workflow.ts) receives the decoded message and appends another message. When it returns that longer string, the string gets encoded by the Worker and decoded by the Client.

## Running this sample

1. `temporal server start-dev` to start [Temporal Server](https://github.com/temporalio/cli/#installation).
1. `npm install` to install dependencies.
1. `npm run start.watch` to start the Worker.
1. In another shell, `npm run workflow` to run the Workflow Client.
