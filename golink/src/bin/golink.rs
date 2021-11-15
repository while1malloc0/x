extern crate diesel;
#[macro_use]
extern crate rocket;
extern crate rocket_contrib;

extern crate golink;

use golink::{config::config, routes, DBConn};
use rocket_contrib::templates::Template;

fn main() {
    let config = config().unwrap();

    rocket::custom(config)
        .mount(
            "/",
            routes![
                routes::index,
                routes::admin,
                routes::healthz,
                routes::admin_list_users
            ],
        )
        .attach(Template::fairing())
        .attach(DBConn::fairing())
        .launch();
}
