#[macro_use]
extern crate rocket;

use rocket_dyn_templates::Template;
use std::collections::HashMap;

#[get("/")]
fn index() -> Template {
    let context: HashMap<String, String> = HashMap::new();
    Template::render("index", context)
}

#[get("/admin")]
fn admin() -> Template {
    Template::render("admin", ())
}

#[get("/healthz")]
fn healthz() -> &'static str {
    "ok"
}

#[launch()]
fn rocket() -> _ {
    rocket::build()
        .mount("/", routes![index, admin, healthz])
        .attach(Template::fairing())
}
