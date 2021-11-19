use crate::DBConn;
use rocket::request::Form;
use rocket::response::Redirect;
use rocket_contrib::templates::Template;
use std::collections::HashMap;

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

#[derive(FromForm, Debug)]
pub struct AuthForm {
    #[allow(dead_code)]
    username: String,
    #[allow(dead_code)]
    password: String,
    return_to: String,
}

#[post("/login", data = "<auth_form>")]
pub fn login_post(conn: DBConn, auth_form: Form<AuthForm>) -> Redirect {
    println!("{:?}", auth_form);
    let mut destination = auth_form.return_to.clone();
    if destination == "" {
        destination = "/".to_string();
    }
    Redirect::found(destination)
}

pub mod probe {
    #[get("/healthz")]
    pub fn healthz() -> &'static str {
        "ok"
    }
}

pub mod admin {
    use crate::models::users;
    use crate::DBConn;
    use diesel::result::Error as DieselError;
    use rocket_contrib::templates::Template;
    use std::collections::HashMap;

    #[get("/admin/users")]
    pub fn list_users(conn: DBConn) -> Result<Template, DieselError> {
        let all_users = users::all(conn)?;
        let mut context = HashMap::new();
        context.insert("users", all_users);

        Ok(Template::render("admin/users", context))
    }
}
