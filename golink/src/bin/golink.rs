#[macro_use]
extern crate rocket;

use rocket_dyn_templates::Template;

#[get("/")]
fn index() -> Template {
    Template::render("index", ())
}

#[get("/admin")]
fn admin() -> Template {
    Template::render("admin", ())
}

#[launch()]
fn rocket() -> _ {
    rocket::build()
        .mount("/", routes![index, admin])
        .attach(Template::fairing())
}
