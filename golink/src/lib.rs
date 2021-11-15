#![feature(decl_macro)]
#[macro_use]
extern crate diesel;
#[macro_use]
extern crate rocket;
#[macro_use]
extern crate rocket_contrib;

pub mod config;
pub mod models;
pub mod routes;
pub mod schema;

#[database("railway")]
pub struct DBConn(diesel::pg::PgConnection);
