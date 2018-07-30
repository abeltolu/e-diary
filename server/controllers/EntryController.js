import db from '../config/connect';

class EntryController {
  static async getAllEntries(request, response) {
    const userId = request.userId.id;
    const query = `SELECT * FROM entries WHERE user_id = '${userId}' ORDER BY id ASC`;
    try {
      const result = await db.query(query);
      if (!result) {
        return response.status(404).json({
          status: 'fail',
          message: 'no entries found',
        });
      }
      return response.status(200).json({
        status: 'success',
        message: 'all entries',
        entries: result.rows,
      });
    } catch (error) {
      return response.status(500).json({
        status: 'fail',
        message: error.message,
      });
    }
  }

  static async getSingleEntry(request, response) {
    const userId = request.userId.id;
    const { entryId } = request.params;
    const query = `SELECT FROM entries WHERE id = ${entryId} AND user_id = ${userId}`;
    try {
      const result = await db.query(query);
      if (!result) {
        return response.status(404).json({
          status: 'fail',
          message: 'entry not found',
        });
      }
      return response.status(200).json({
        status: 'success',
        message: 'entry successfully returned',
        entry: result.rows[0],
      });
    } catch (error) {
      return response.status(500).json({
        status: 'fail',
        message: error.message,
      });
    }
  }

  static async createEntry(request, response) {
    const userId = request.userId.id;
    const { title, imageUrl, note } = request.body;
    try {
      const query = `SELECT * FROM entries WHERE title = '${title}'`;
      const checkIfEntryExists = await db.query(query);
      if (checkIfEntryExists.rowCount > 0) {
        return response.status(409).json({
          status: 'fail',
          message: 'entry already exists',
        });
      }
      const insertQuery = `INSERT INTO entries (user_id, title, image_url, note) VALUES ('${userId}', '${title}', '${imageUrl}', '${note}') RETURNING * `;
      const newEntry = await db.query(insertQuery);
      if (!newEntry) {
        return response.status(403).json({
          status: 'fail',
          message: 'entry was not created',
        });
      }
      return response.status(201).json({
        status: 'success',
        message: 'entry created',
        entry: {
          id: newEntry.rows[0].id,
          userId: newEntry.rows[0].user_id,
          title: newEntry.rows[0].title,
          imageUrl: newEntry.rows[0].image_url,
          note: newEntry.rows[0].note,
          createdAt: newEntry.rows[0].created_at,
        },
      });
    } catch (error) {
      return response.status(500).json({
        status: 'fail',
        message: error.message,
      });
    }
  }
}
export default EntryController;
