extern crate diesel;
#[macro_use]
extern crate diesel_migrations;
#[macro_use]
extern crate rocket;
extern crate rocket_contrib;

extern crate golink;

use diesel::pg::PgConnection;
use diesel::prelude::*;
use golink::{config::config, routes, DBConn};
use rocket_contrib::templates::Template;
use std::env;

embed_migrations!("./migrations");

fn establish_db_connection() -> diesel::result::ConnectionResult<PgConnection> {
    let db_url = env::var("DATABASE_URL")
        .or_else(|e| {
            return Err(ConnectionError::InvalidConnectionUrl(e.to_string()));
        })
        .unwrap();
    PgConnection::establish(&db_url)
}

fn main() {
    let conn = establish_db_connection().expect("could not establish db connection");
    embedded_migrations::run_with_output(&conn, &mut std::io::stdout())
        .expect("error running migrations");

    let config = config().unwrap();

    rocket::custom(config)
        .mount(
            "/",
            routes![
                routes::index,
                routes::probe::healthz,
                routes::admin::list_users,
            ],
        )
        .attach(Template::fairing())
        .attach(DBConn::fairing())
        .launch();
}
