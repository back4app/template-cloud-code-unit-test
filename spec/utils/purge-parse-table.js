/**
 * Removes all rows from the Parse Database
 * @param  {string} tablename the name of the parse table to be purged
 * @return {Promise}  promise to destroy each item  in the table
 */
module.exports = function (Parse) {
  return (tablename) => {
    var tableQuery;
    if (tablename === "User")
      tableQuery = new Parse.Query(Parse.User);
    else tableQuery = new Parse.Query(tablename);
    return tableQuery.find({useMasterKey : true}).then((items) => {
      var destroyQueue = [];
      for (var i=0; i<items.length; i++) {
        destroyQueue.push(items[i].destroy({useMasterKey : true}));
      }
      return Promise.all(destroyQueue).catch((e) => {console.log("Error destroying: " + e.message)});
    });
  }
}
