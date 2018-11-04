import faunadb from 'faunadb' /* Import faunaDB sdk */

/* configure faunaDB Client with our secret */
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

/* export our lambda function as named "handler" export */
exports.handler = async (event, context, callback) => {
  /* parse the string body into a useable JS object */
  const user = JSON.parse(event.body)
  user.createdAt = Date.now()
  console.log('user-create invoked', user)

  /* construct the fauna query */
  try {
    const response = await client.query(q.Create(q.Ref('classes/users'), { data: user }))
    return {
      statusCode: 200,
      body: JSON.stringify(response)
    }
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify(error)
    }
  }
}
