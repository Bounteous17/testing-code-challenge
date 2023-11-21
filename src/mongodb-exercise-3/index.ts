import { MongoClient, ObjectId } from 'mongodb'

export async function updateByField({
  client,
  _id,
  field,
  value,
}: {
  client: MongoClient
  _id: ObjectId
  field: string
  value: any
}) {
  let udpatedValue
  if (field === 'roles') {
    udpatedValue = [value]
  }
  // the Promise would be resolved on the caller scope and errors being handled outside this function
  return client
    .db('dimatica')
    .collection('users')
    .updateOne({ _id }, { $set: { [field]: udpatedValue || value } })
}
