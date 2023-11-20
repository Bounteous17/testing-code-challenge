import got from 'axios'

// Building a URL instance would help us destructuring properties
export const url: URL = new URL('https://my-webservice.moveecar.com')
// Another way to add the url path name
url.pathname = 'vehicles/total'

/**
 * In case we need to handle the error at this point we would need
 * to wait the Promise to be resolved on this funcion by using "await".
 * @returns An HTTP request Promise that would be resolved on the caller
 */
async function getTotalVehicles() {
  try {
    // Another way to read the response data if it's possible
    return (await got.get(url.toString())).data
  } catch (error: any) {
    const statusError = error?.response?.status

    if (statusError) {
      throw new Error(`Request failed with status ${statusError}`)
    }
    throw new Error('Unknown error perfoming request')
  }
}

export async function getPlurial() {
  const { total } = await getTotalVehicles()

  if (total <= 0) {
    return 'none'
  }

  if (total <= 10) {
    return 'few'
  }

  return 'many'
}
