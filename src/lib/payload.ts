'use server'
import config from '~/payload.config'
import { getPayload as _getPayload } from "payload";

export const getPayload = async () => {
  const payloadConfig = await config
  const payload = await _getPayload({ config: payloadConfig })
  return payload
}