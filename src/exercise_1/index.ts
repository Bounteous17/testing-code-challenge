import got from 'axios'
import { isNumber } from 'radash'

// Building a URL instance would help us destructuring properties
export const url: URL = new URL(
  'https://my-webservice.moveecar.com/users/count',
)

/**
 * In case we need to handle the error at this point we would need
 * to wait the Promise to be resolved on this funcion by using "await".
 * @returns An HTTP request Promise that would be resolved on the caller
 */
async function getCountUsers() {
  try {
    const response = await got.get(url.toString())
    return response.data
  } catch (error: any) {
    const statusError = error?.response?.status

    if (statusError) {
      throw new Error(`Request failed with status ${statusError}`)
    }
    throw new Error('Unknown error perfoming request')
  }
}

/**
 *
 * @returns adds 20 units to the response in case the answered value is a number
 */
export async function computeResult() {
  const result = await getCountUsers()
  const { total } = result

  if (isNumber(total)) {
    return total + 20
  }

  throw new Error(`Expected value is not a number, we received: ${total}`)
}
