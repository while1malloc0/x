use rocket_contrib::templates::Template;
use std::collections::HashMap;

#[get("/healthz")]
pub fn healthz() -> &'static str {
    "ok"
}

#[get("/")]
pub fn index() -> Template {
    let context: HashMap<String, String> = HashMap::new();
    Template::render("index", context)
}

#[get("/admin")]
pub fn admin() -> Template {
    Template::render("admin", ())
}
