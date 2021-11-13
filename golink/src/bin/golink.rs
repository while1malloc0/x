#[macro_use]
extern crate rocket;

use rocket_dyn_templates::Template;

#[get("/")]
fn index() -> Template {
    Template::render("index", ())
}

#[launch()]
fn rocket() -> _ {
    rocket::build()
        .mount("/", routes![index])
        .attach(Template::fairing())
}
