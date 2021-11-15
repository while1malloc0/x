extern crate rocket;

use rocket::config::{Config, ConfigError, Environment, Value};
use std::collections::HashMap;
use std::env;

pub fn config() -> Result<Config, ConfigError> {
    let database_url = env::var("DATABASE_URL")
        .or_else(|e| {
            return Err(ConfigError::BadEnvVal(
                "DATABASE_URL".to_string(),
                "".to_string(),
                e.to_string(),
            ));
        })
        .unwrap();

    let mut database_config = HashMap::new();
    database_config.insert("url", Value::from(database_url));

    let mut databases_config: HashMap<&str, Value> = HashMap::new();
    databases_config.insert("railway", Value::from(database_config));

    let port: u16 = env::var("PORT")
        .unwrap_or("8000".to_string())
        .parse()
        .unwrap();

    let environment = Environment::active()?;
    Config::build(environment)
        .address("0.0.0.0")
        .port(port)
        .extra("databases", databases_config)
        .extra("template_dir", "src/templates")
        .finalize()
}
