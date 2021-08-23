/**
 * @export
 * @class MyQueries
 */
class MyQueries {
  /**
     *
     * @static
     * @param {object} table table
     * @param {object} queryObject pass object
     * @memberof MyQueries
     * @returns {object} either an error or data
     */
  static async findOne(table, queryObject) {
    const result = await table.findOne(queryObject);
    return result;
  }

  /**
   *
   * @static
   * @param {object} table table
   * @param {object} queryObject pass object
   * @memberof MyQueries
   * @returns {object} either an error or data
   */
  static async create(table, queryObject) {
    const result = await table.create(queryObject);
    return result;
  }

  /**
     * Find all
     * @static
     * @param {object} table table
     * @param {object} queryObject pass object
     * @memberof MyQueries
     * @returns {object} either an error or data
     */
  static async findAll(table, queryObject) {
    const result = await table.findAll(queryObject);
    return result;
  }

  /**
     * Update table
     * @static
     * @param {object} table table
     * @param {object} queryObject pass object
     * @memberof MyQueries
     * @returns {object} either an error or data
     */
  static async update(table, queryObject) {
    const result = await table.update(...queryObject);
    return result;
  }

  /**
   * get number of specific rows
   * @static
   * @param {object} table table
   * @param {object} queryObject pass object
   * @memberof MyQueries
   * @returns {object} either an error or data
   */
  static count(table, queryObject) {
    return table.count(queryObject);
  }

  /**
   * delete row
   * @static
   * @param {object} table table
   * @param {object} queryObject pass object
   * @memberof MyQueries
   * @returns {object} either an error or data
   */
  static destroy(table, queryObject) {
    return table.destroy(queryObject);
  }
}

export default MyQueries;
