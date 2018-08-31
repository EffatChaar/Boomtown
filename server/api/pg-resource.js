var strs = require('stringstream')

function tagsQueryString(tags, itemid, result) {

  const length = tags.length
  return length === 0
    ? `${result};`
    : tags.shift() &&
        tagsQueryString(
          tags,
          itemid,
          `${result}($${tags.length + 1}, ${itemid})${length === 1 ? '' : ','}`
        )
}

module.exports = function(postgres) {
  return {
    async createUser({ fullname, email, password }) {
      const newUserInsert = {
        text: 'INSERT INTO users (fullname, email, password) VALUES ($1, $2, $3) RETURNING *',
        values: [fullname, email, password]
      }
      try {
        const user = await postgres.query(newUserInsert)
        return user.rows[0]
      } catch (e) {
        switch (true) {
          case /users_fullname_key/.test(e.message):
            throw 'An account with this username already exists.'
          case /users_email_key/.test(e.message):
            throw 'An account with this email already exists.'
          default:
            throw 'There was a problem creating your account.'
        }
      }
    },
    async getUserAndPasswordForVerification(email) {
      const findUserQuery = {
        text: 'SELECT * FROM users WHERE email = $1',
        values: [email]
      }
      try {
        const user = await postgres.query(findUserQuery)
        if (!user) throw 'User was not found.'
        return user.rows[0]
      } catch (e) {
        throw 'User was not found.'
      }
    },
    async getUserById(id) {
      const findUserQuery = {
        text: `SELECT * FROM users WHERE users.id = $1`,
        values: [id]
      }
      try {
        const user = await postgres.query(findUserQuery)
        if (!user) throw 'User was not found'
        return user.rows[0]
      } catch (e) {
        throw 'User was not found'
      }
    },

    async getItems(idToOmit) {
       try { 
        
      const items = await postgres.query({
        text: `Select item.id, item.title, item.description, item.created, item.ownerid, item.borrowerid
                From items item

                  INNER JOIN uploads upload
        ON upload.itemid = item.id
              
            WHERE (ownerid != $1 AND borrowerid IS NULL) OR ($1 IS NULL)`,
        values: [idToOmit]
      })
      if (!items) throw 'No Items 1'
      return items.rows
      } catch (e) {
      throw 'No items 1'
      }
    },

    async getItemsForUser(id) {
      try {
        const items = await postgres.query({
          text: `Select item.id, item.title, item.description, item.created, item.ownerid, item.borrowerid, upload.data as imageurl
                  From items item
                INNER JOIN uploads upload
                ON upload.itemid = item.id
              WHERE ownerid = $1`,
          values: [id]
        })
        if (!items) throw 'Items not found.2'
        return items.rows
      } catch (e) {
        throw 'Items not found.2'
      }
    },

    async getBorrowedItemsForUser(id) {
      try {
        const items = await postgres.query({
        text: `Select item.id, item.title, item.description, item.created, item.ownerid, item.borrowerid, upload.data as imageurl
                From items item
              INNER JOIN uploads upload
              ON upload.itemid = item.id
            WHERE borrowerid = $1`,
        values: [id]
      })
      if (!items) throw 'Items not found.3'
      return items.rows
      } catch (e) {
      throw 'Items not found.3'
      }
    },

    async getTags() {
      try {
        const tags = await postgres.query(`SELECT * FROM tags`)
        if (!tags) throw 'No tags found.'
        return tags.rows
        } catch (e) {
        throw 'No tags found.'
        }
      },

    async getTagsForItem(id) {
      const tagsQuery = {
        text: `SELECT tags.title, tags.id FROM tags
                JOIN itemtags
              ON itemtags.tagid = tags.id
                JOIN items
              ON itemtags.itemid = items.id
            WHERE items.id = $1`,
        values: [id]
      }
      try {
        const tags = await postgres.query(tagsQuery)
        if (!tags) throw 'Tags not found.'
        return tags.rows
        } catch (e) {
        throw 'Tags not found.'
        }
      },
    async saveNewItem({ item, image, user }) {

      return new Promise((resolve, reject) => {
        postgres.connect((err, client, done) => {
          try {
            client.query('BEGIN', err => {
              const imageStream = image.stream.pipe(strs('base64'))
              let base64Str = 'data:image/*;base64,'
              imageStream.on('data', data => {
                base64Str += data
              })

              imageStream.on('end', async () => {
                const { title, description, tags } = item           
                const newItemQuery = {
                  text: `INSERT INTO items (title, description, ownerid) VALUES ($1, $2, $3) RETURNING *`,
                  values: [title, description, user.id]
                }
                const newItem = await client.query(newItemQuery)
                const itemid = newItem.rows[0].id

                const imageUploadQuery = {
                  text:
                    'INSERT INTO uploads (itemid, filename, mimetype, encoding, data) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                  values: [
                    itemid,
                    image.filename,
                    image.mimetype,
                    'base64',
                    base64Str
                  ]
                }
                try {
                  await client.query(imageUploadQuery)
                } catch (e) {
                  throw 'No image uploaded'
                }

                const tagsQuery = {
                  text: `INSERT INTO itemtags (tagid, itemid) VALUES
                  ${tagsQueryString(
                    [...tags],
                    itemid,
                    ''
                  )}`,
                  values: tags.map(tag => tag.id)
                }

                try {
                  await client.query(tagsQuery)
                } catch (e) {
                  throw 'No tags found'
                }

                client.query('COMMIT', err => {
                  if (err) {
                    throw err
                  }
                  done()
                  resolve(newItem.rows[0])
                })
              })
            })
          } catch (e) {
            client.query('ROLLBACK', err => {
              if (err) {
                throw err
              }
              done()
            })
            switch (true) {
              case /uploads_itemid_key/.test(e.message):
                throw 'This item already has an image.'
              default:
                throw e
            }
          }
        })
      })
    }
  }
}