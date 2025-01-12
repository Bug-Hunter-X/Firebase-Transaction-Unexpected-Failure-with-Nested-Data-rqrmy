The following code snippet demonstrates an uncommon error in Firebase when using transactions with nested data structures. The problem occurs when attempting to update a nested field within a document using a transaction, but the transaction unexpectedly fails due to an unhandled exception.

```javascript
// Incorrect implementation
db.runTransaction(transaction => {
  return transaction.get(userRef).then(doc => {
    if (!doc.exists) {
      throw new Error('User document does not exist.');
    }
    const userData = doc.data();
    const nestedValue = userData.nestedField || 0; // Initialize if not exists
    transaction.update(userRef, {
      nestedField: { count: nestedValue + 1 } // Incorrect update path
    });
    return transaction.get(userRef);
  });
}).then(doc => {
  console.log('Transaction successful:', doc.data());
}).catch(error => {
  console.error('Transaction failed:', error);
});
```