//import { pred } from "../types"

import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'modular',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit:0
})

/*export const db : pred[] = [
    {
        id: 1,
        name: "Jhon",
        value1: 0.587997,
        value2: 0.481511,
        value3: 0.453656,
        value4: 0.902031,
        value5: 0.0425968,
        pre: 10,
    },
    {
        id: 2,
        name: "Sera",
        value1: 1.03516,
        value2: 0.804118,
        value3: 0.142831,
        value4: 0.19736,
        value5: 0.531045,
        pre: 10,
    },
    {
        id: 3,
        name: "Jose",
        value1: 0.108748,
        value2: 1.10793,
        value3: 0.474202,
        value4: 0.71438,
        value5: 0.795415,
        pre: 10,
    },
    {
        id: 4,
        name: "Luis",
        value1: 0.616932,
        value2: 0.976474,
        value3: 0.16516,
        value4: 1.24344,
        value5: 0.304024,
        pre: 10,
    },
    {
        id: 5,
        name: "Ramon",
        value1: 0.411238,
        value2: 1.05594,
        value3: 0.581518,
        value4: 1.15382,
        value5: 0.641242,
        pre:10,
    },
]*/

export default pool