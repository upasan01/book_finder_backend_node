const low = require('lowdb')
const fs = require('fs')
const FileSync = require('lowdb/adapters/FileSync')
const { json } = require('express')

const adapter = new FileSync('database.json')
const db = low(adapter)
db.defaults({ books: [] }).write()

function putEntry(entry) {
// store it locally
    db.get('books').push(entry).write()
}

function getAllEntries() {
    return db.get('books').value()
}

function searchEntry(args){
    var books = db.get('books').value()
    var list = []
    for (i=0; i<books.length; i++){
        if (books[i].tags.includes(args)){
            list.push(books[i])
        }
    }
    return list
}

function getLastID(){
    var database = fs.readFileSync('database.json');
    var data = JSON.parse(database);
    data = Object.values(data.books).length;
    return data;
}

module.exports = {
    putEntry,
    getAllEntries,
    getLastID,
    searchEntry,
}