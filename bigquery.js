// Imports the Google Cloud client library
const { BigQuery } = require('@google-cloud/bigquery');

// Initialize connection to BigQuery 
const bigQueryClient = new BigQuery(project="propark-mobility");

/**
 * Inserts rows into BigQuery table
 *
    * @param rows[Array] - Array of objects with lot data
    * @param datasetId[String] - Name of BigQuery dataset
    * @param tableId[String] - Name of BigQuery table

 */
async function insertRows(rows, datasetId, tableId) {
  try {
    await bigQueryClient.dataset(datasetId).table(tableId).insert(rows)
    console.log(rows)
    return true
  } catch (error) {
    for (var i = 0; i < error.errors.length; i++) {
      console.log(error.errors[i])
    }
    return false
  }
}

module.exports = {
  insertRows
}