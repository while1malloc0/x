#[feature(proc_macro_hygiene, decl_macro)]
#[macro_use]
extern crate rocket;
#[macro_use]
extern crate rocket_contrib;
extern crate diesel;
extern crate golink;

use golink::routes;
// use rocket_contrib::databases::diesel;
use rocket_contrib::templates::Template;

#[database("golink")]
pub struct DBConn(diesel::PgConnection);

fn main() {
    // let database_url = env::var("DATABASE_URL").expect("DATABASE_URL not set");
    // let conn = PgConnection::establish(&database_url).expect("Error connecting to database");

    rocket::ignite()
        .mount("/", routes![routes::index, routes::admin, routes::healthz])
        .attach(Template::fairing())
        .launch();
}
