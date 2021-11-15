use diesel::prelude::*;
use diesel::result::Error as DeiselError;
use serde::Serialize;

use crate::schema::users::dsl::*;
use crate::DBConn;

#[derive(Queryable, Serialize)]
pub struct User {
    pub id: i32,
    pub email: String,
}

pub fn all(conn: DBConn) -> Result<Vec<User>, DeiselError> {
    users.load::<User>(&conn.0)
}
