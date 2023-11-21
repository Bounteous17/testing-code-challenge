import { MongoClient } from 'mongodb'

export async function searchByRoleAndEmailsMatch({
  client,
  role,
  emails,
}: {
  client: MongoClient
  role: string
  emails: string[]
}) {
  const rawData = client
    .db('dimatica')
    .collection('users')
    .aggregate([
      {
        $match: {
          roles: role,
          email: { $in: emails },
        },
      },
    ])
  return rawData.toArray()
}
