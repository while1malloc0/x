#![feature(decl_macro)]
#[macro_use]
extern crate diesel;
#[macro_use]
extern crate rocket;

pub mod config;
pub mod models;
pub mod routes;
pub mod schema;
