use rocket_contrib::templates::Template;
use std::collections::HashMap;

use crate::models::users;
use crate::DBConn;
use diesel::result::Error as DieselError;

#[get("/healthz")]
pub fn healthz() -> &'static str {
    "ok"
}

#[get("/")]
pub fn index() -> Template {
    let context: HashMap<String, String> = HashMap::new();
    Template::render("index", context)
}

#[get("/login")]
pub fn login() -> Template {
    let context: HashMap<String, String> = HashMap::new();
    Template::render("login", context)
}

#[get("/admin")]
pub fn admin() -> Template {
    Template::render("admin", ())
}

#[get("/admin/users")]
pub fn admin_list_users(conn: DBConn) -> Result<Template, DieselError> {
    let all_users = users::all(conn)?;
    let mut context = HashMap::new();
    context.insert("users", all_users);

    Ok(Template::render("admin.users", context))
}
