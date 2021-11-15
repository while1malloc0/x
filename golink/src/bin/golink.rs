extern crate diesel;
#[macro_use]
extern crate rocket;
#[macro_use]
extern crate rocket_contrib;

extern crate golink;

use golink::{config::config, routes};
use rocket_contrib::templates::Template;

#[database("railway")]
pub struct DBConn(diesel::PgConnection);

fn main() {
    let config = config().unwrap();

    rocket::custom(config)
        .mount("/", routes![routes::index, routes::admin, routes::healthz])
        .attach(Template::fairing())
        .attach(DBConn::fairing())
        .launch();
}
