/*global AWS, FB*/
import * as constant from '../common/constants'
import Rx from 'rxjs/Rx'
import 'rxjs/add/observable/dom/ajax'

export function loadCategories() {
  console.log('load cat from thunk')
  return function (dispatch) {
    return getCategories('facebook').then(
      items => dispatch({ type: constant.CATEGORIES_LOADED, payload: items }),
      err => console.error("Unable to query. Error:", JSON.stringify(err, null, 2))
    );
  };
}

export function loadKeywords() {
  console.log('load cat from thunk')
  return function (dispatch) {
    return getKeywords('trends').then(
      items => dispatch({ type: constant.KEYWORDS_LOADED, payload: items }),
      err => console.error("Unable to query. Error:", JSON.stringify(err, null, 2))
    );
  };
}

export function addKeyword(category) {
  return function (dispatch) {
    return addKeywordApi(category,'trends').then(
      item => dispatch({ type: constant.KEYWORD_ADDED, payload: item }),
      err => console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2))
    );
  };
}

export function addCategory(category) {
  return function (dispatch) {
    return addCategoryApi(category, 'facebook').then(
      item => dispatch({ type: constant.CATEGORY_ADDED, payload: item }),
      err => console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2))
    );
  };
}



export function deleteRepo(objectId, index) {
  return function (dispatch) {
    return deleteRepoApi(objectId)
      .then(data => {
        dispatch({ type: constant.REPO_DELETED, objectId })
        console.log('deletd', data)
      })
  }

}


function getKeywords(subtype) {

  var identityId = AWS.config.credentials.identityId
    console.log('getKeywords',identityId)
  var docClient = new AWS.DynamoDB.DocumentClient();
  var params = {
    TableName: "UserData2",
    IndexName: "userId-type-index",
    FilterExpression: '#subtype = :subtype',
    // ProjectionExpression: "#yr, title, info.genres, info.actors[0]",
    KeyConditionExpression: "#userId = :userId and #type = :type",
    ExpressionAttributeNames: {
      "#userId": "userId",
      "#type": "type",
       "#subtype": "subtype"
      
    },
    ExpressionAttributeValues: {
      ":userId": identityId,
      ":type":  'keyword',
       ":subtype": subtype,
       
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



function addKeywordApi(name, subtype) {


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
      subtype     

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

  // return new Promise(function (resolve, reject) {
  //   docClient.put(params, (err, data, y) => {
  //     if (err) {
  //       revoke(err)
  //     } else {

  //       resolve(params.Item)
  //     }
  //   });

  // })


}



function getCategories(subtype) {
  console.log('getCategories')
  var identityId = AWS.config.credentials.identityId
  var docClient = new AWS.DynamoDB.DocumentClient();
  var params = {
    TableName: "UserData2",
    IndexName: "userId-type-index",
    FilterExpression: '#subtype = :subtype',
    // ProjectionExpression: "#yr, title, info.genres, info.actors[0]",
    KeyConditionExpression: "#userId = :userId and #type = :type",
    ExpressionAttributeNames: {
      "#userId": "userId",
      "#type": "type",
       "#subtype": "subtype"
    },
    ExpressionAttributeValues: {
      ":userId": identityId,
      ":type": "category",
       ":subtype": subtype,
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

function addCategoryApi(category, subtype) {


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
      subtype

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