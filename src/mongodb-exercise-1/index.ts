import { MongoClient } from 'mongodb'
import { subMonths } from 'date-fns'

export async function searchExactEmailNameAndRecentlyLogged({
  client,
  email,
  name,
}: {
  client: MongoClient
  email: string
  name: string
}) {
  const halfAYearAgo = subMonths(new Date(), 6)
  const rawData = client
    .db('dimatica')
    .collection('users')
    .find({
      email,
      last_connection_date: { $gt: halfAYearAgo },
      $or: [{ first_name: { $regex: name } }, { last_name: { $regex: name } }],
    })
  return rawData.toArray()
}
