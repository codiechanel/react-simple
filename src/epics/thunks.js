/*global AWS, FB*/
import * as constant from '../common/constants'
// import Rx from 'rxjs/Rx'
// import 'rxjs/add/observable/dom/ajax'

export function loadCategories() {
 
  return function (dispatch) {
    return getCategories('trends').then(
      items => dispatch({ type: constant.CATEGORIES_LOADED, payload: items }),
      err => console.error("Unable to query. Error:", JSON.stringify(err, null, 2))
    );
  };
}

export function loadKeywords() {

  return function (dispatch) {
    return getKeywords('trends').then(
      items => dispatch({ type: constant.KEYWORDS_LOADED, payload: items }),
      err => console.error("Unable to query. Error:", JSON.stringify(err, null, 2))
    );
  };
}

export function updateKeyword(item) {
  return function (dispatch) {
    return updateKeywordApi(item).then(
      item => dispatch({ type: constant.KEYWORD_UPDATED, payload: item }),
      err => console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2))
    );
  };
}

export function addKeyword(keyword) {
  return function (dispatch) {
    return addKeywordApi(keyword,'trends').then(
      item => dispatch({ type: constant.KEYWORD_ADDED, payload: item }),
      err => console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2))
    );
  };
}

export function addCategory(category) {
  return function (dispatch) {
    return addCategoryApi(category, 'trends').then(
      item => dispatch({ type: constant.CATEGORY_ADDED, payload: item }),
      err => console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2))
    );
  };
}

export function deleteKeyword(objectId, index) {
  return function (dispatch) {
    return deleteKeywordApi(objectId)
      .then(data => {
        dispatch({ type: constant.KEYWORD_DELETED, objectId })
    
      })
  }

}


export function deleteRepo(objectId, index) {
  return function (dispatch) {
    return deleteRepoApi(objectId)
      .then(data => {
        dispatch({ type: constant.REPO_DELETED, objectId })

      })
  }

}


function getKeywords(project) {
  var identityId = AWS.config.credentials.identityId
 
  var docClient = new AWS.DynamoDB.DocumentClient();
  var params = {
    TableName: "UserData2",
    IndexName: "userId-type-index",
    FilterExpression: '#project = :project',
    KeyConditionExpression: "#userId = :userId and #type = :type",
    ExpressionAttributeNames: {
      "#userId": "userId",
      "#type": "type",
       "#project": "project"
      
    },
    ExpressionAttributeValues: {
      ":userId": identityId,
      ":type":  'keyword',
       ":project": project,
       
    }
  };

  return new Promise(function (resolve, reject) {
   
    docClient.query(params, (err, data) => {
      if (err) {
        reject(err)
      }
      else {
        resolve(data.Items)
      }
    })



  });

  

}


function deleteKeywordApi(objectId) {
  var identityId = AWS.config.credentials.identityId;

  var docClient = new AWS.DynamoDB.DocumentClient();

  var table = "UserData2";
  var params = {
    TableName: table,
    Key: {
      "userId": identityId,
      "objectId": objectId,
    },
    ReturnConsumedCapacity: "TOTAL"
  };

  return docClient.delete(params).promise()
}


function updateKeywordApi(item) {
  var identityId = AWS.config.credentials.identityId;

  var docClient = new AWS.DynamoDB.DocumentClient();

  var table = "UserData2";

  var params = {
    TableName: table,
    Item: item,
    ReturnConsumedCapacity: "TOTAL"
  };

  return new Promise(function (resolve, reject) {
    docClient.put(params, (err, data, y) => {
      if (err) {
        // console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        reject(err)
      } else {
 
        resolve(params.Item)
      }
    });

  })


}

function addKeywordApi(name, project) {


  var identityId = AWS.config.credentials.identityId;

  var docClient = new AWS.DynamoDB.DocumentClient();

  var table = "UserData2";

  if (!Date.now) {
    Date.now = function () { return new Date().getTime(); }
  }

  var objectId = Date.now().toString()

  var params = {
    TableName: table,
    Item: {
      "userId": identityId,
      "objectId": objectId,
      "type": 'keyword',
      name,
      project     

    },
    ReturnConsumedCapacity: "TOTAL"
  };

  return new Promise(function (resolve, reject) {
    docClient.put(params, (err, data, y) => {
      if (err) {
        // console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        reject(err)
      } else {
 
        resolve(params.Item)
      }
    });

  })


}






function deleteRepoApi(objectId) {
  var identityId = AWS.config.credentials.identityId;

  var docClient = new AWS.DynamoDB.DocumentClient();

  var table = "UserData2";
  var params = {
    TableName: table,
    Key: {
      "userId": identityId,
      "objectId": objectId,
    },
    ReturnConsumedCapacity: "TOTAL"
  };

  return docClient.delete(params).promise()
}



function getCategories(project) {

  var identityId = AWS.config.credentials.identityId
  var docClient = new AWS.DynamoDB.DocumentClient();
  var params = {
    TableName: "UserData2",
    IndexName: "userId-type-index",
    FilterExpression: '#project = :project',
    // ProjectionExpression: "#yr, title, info.genres, info.actors[0]",
    KeyConditionExpression: "#userId = :userId and #type = :type",
    ExpressionAttributeNames: {
      "#userId": "userId",
      "#type": "type",
       "#project": "project"
    },
    ExpressionAttributeValues: {
      ":userId": identityId,
      ":type": "category",
       ":project": project,
    }
  };

  return new Promise(function (resolve, reject) {
    docClient.query(params, (err, data) => {
      if (err) {
        reject(err)
      }
      else {
        resolve(data.Items)
      }
    })



  });

}

function addCategoryApi(category, project) {


  var identityId = AWS.config.credentials.identityId;

  var docClient = new AWS.DynamoDB.DocumentClient();

  var table = "UserData2";

  if (!Date.now) {
    Date.now = function () { return new Date().getTime(); }
  }

  var objectId = Date.now().toString()

  var params = {
    TableName: table,
    Item: {
      "userId": identityId,
      "objectId": objectId,
      "type": 'category',
      "name": category,
      project

    },
    ReturnConsumedCapacity: "TOTAL"
  };

  return new Promise(function (resolve, reject) {
    docClient.put(params, (err, data, y) => {
      if (err) {
        // console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        reject(err)
      } else {
        // this.props.dispatch({ type: constant.CATEGORY_ADDED, payload: params.Item })
        resolve(params.Item)
      }
    });

  })


}